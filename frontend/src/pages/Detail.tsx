import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-clients";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const Detail = () => {
  const { hotelId } = useParams();
  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotel) return <></>;
  return (
    <div className="space-y-6">
      <div>
        <span className="flex flex-row gap-2">
          {Array.from({ length: hotel.starRating }).map(() => (
            <AiFillStar className="fill-yellow-300" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
        {hotel.imageUrls.map((img) => (
          <div className="h-[300px]">
            <img
              src={img}
              alt={hotel.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid  grid-cols-4 gap-2">
        {hotel.facilities.map((facility) => (
          <div className="border border-slate-300 text-[12px] sm:text-[16px] rounded-sm p-1 md:p-2">
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{hotel.description}</div>
        <div className="h-fit flex items-center justify-center">
          <GuestInfoForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
