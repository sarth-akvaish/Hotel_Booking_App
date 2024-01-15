import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  hotel: HotelType;
};

const SearchResultCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-between">Details Column</div>
    </div>
  );
};

export default SearchResultCard;
