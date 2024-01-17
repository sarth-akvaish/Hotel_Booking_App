import express, { Request, Response } from 'express'
import Hotel from '../models/hotel';
import { BookingType, HotelSearchResponse } from '../shared/types';
import { param, validationResult } from 'express-validator';
import Stripe from 'stripe'
import verifyToken from '../middlewares/auth';

const stripe = new Stripe(process.env.STRIPE_API_KEY as string)

const router = express.Router();


router.get('/search', async (req: Request, res: Response) => {
    try {
        const query = constructSearchQuery(req.query)

        let sortoptions = {};
        switch (req.query.sortoption) {
            case "starRating":
                sortoptions = { starRating: -1 };
                break;
            case "pricePerNightAsc":
                sortoptions = { pricePerNight: 1 };
                break;
            case "pricePerNightDesc":
                sortoptions = { pricePerNight: -1 };
                break;

        }

        const pageSize = 5;
        const pageNumber = parseInt(
            req.query.page ? req.query.page.toString() : '1'
        )
        const skip = (pageNumber - 1) * pageSize;
        const hotels = await Hotel.find(query).sort(sortoptions).skip(skip).limit(pageSize);
        const total = await Hotel.countDocuments();
        const response: HotelSearchResponse = {
            data: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize)
            },
        }
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
})

router.get('/:id', [
    param("id").notEmpty().withMessage('Hotel ID is required')
], async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const id = req.params.id.toString();
    try {
        const hotel = await Hotel.findById(id);
        res.json(hotel);
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: errors.array() });
    }
})

router.post('/:hotelId/bookings/payment-intent', verifyToken, async (req: Request, res: Response) => {

    const { noofNights } = req.body;
    const hotelId = req.params.hotelId;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
        return res.status(400).json({ message: 'Hotel not found ' })
    }

    const totalCost = hotel.pricePerNight * noofNights;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalCost * 100,
        currency: "inr",
        description
            : 'Software development services',
        shipping
            : {
            name
                : 'Jenny Rosen',
            address
                : {
                line1
                    : '510 Townsend St',
                postal_code
                    : '98140',
                city
                    : 'San Francisco',
                state
                    : 'CA',
                country
                    : 'US',
            },
        },
        metadata: {
            hotelId,
            userId: req.userId,
        }
    })

    if (!paymentIntent.client_secret) {
        return res.status(500).json({ message: 'Error creating payment intent' })
    }

    const response = {
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret.toString(),
        totalCost
    }

    res.send(response);
})

router.post('/:hotelId/bookings', verifyToken, async (req: Request, res: Response) => {

    try {
        const paymentIntentId = req.body.paymentIntentId;

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId as string);

        if (!paymentIntent) return res.status(400).json({ message: 'Payment Intent not found ' })

        if (paymentIntent.metadata.hotelId !== req.params.hotelId || paymentIntent.metadata.userId !== req.userId) {
            return res.status(400).json({ message: 'Payment intent mismatch' })
        }

        if (paymentIntent.status !== "succeeded") {
            return res.status(400).json({ message: `payment intent not succeeded, Status : ${paymentIntent.status}` })
        }

        const newBooking: BookingType = {
            ...req.body,
            userId: req.userId
        }

        const hotel = await Hotel.findOneAndUpdate({ _id: req.params.hotelId }, {
            $push: { bookings: newBooking },
        })

        if (!hotel) return res.status(400).json({ message: 'Hotel not found' })

        await hotel.save();
        res.status(200).send();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' })
    }
})

const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {};

    if (queryParams.destination) {
        constructedQuery.$or = [
            { city: new RegExp(queryParams.destination, "i") },
            { country: new RegExp(queryParams.destination, "i") }
        ];
    }

    if (queryParams.adultCount) {
        constructedQuery.adultCount = {
            $gte: parseInt(queryParams.adultCount)
        }
    }

    if (queryParams.childCount) {
        constructedQuery.childCount = {
            $gte: parseInt(queryParams.childCount)
        }
    }

    if (queryParams.facilities) {
        constructedQuery.facilities = {
            $all: Array.isArray(queryParams.facilities) ? queryParams.facilities : [queryParams.facilities],
        }
    }

    if (queryParams.types) {
        constructedQuery.type = {
            $in: Array.isArray(queryParams.types) ? queryParams.types : [queryParams.types],
        }
    }

    if (queryParams.stars) {
        const starRating = Array.isArray(queryParams.stars) ?
            queryParams.stars.map((star: string) => parseInt(star)) :
            parseInt(queryParams.stars);


        constructedQuery.starRating = {
            $in: starRating
        }
    }

    if (queryParams.maxPrice) {
        constructedQuery.pricePerNight = {
            $lte: parseInt(queryParams.maxPrice).toString()
        }
    }
    return constructedQuery;

}

export default router;

