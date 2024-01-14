import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-clients";
import ManageHotelForm from "../forms/manageHotelForm/ManageHotelFor";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { data: hotel } = useQuery(
    "fetchMyHotelsById",
    () => apiClient.fetchMyHotelsById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updatemyHotelById, {
    onSuccess: () => {},
    onError: () => {},
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
  );
};

export default EditHotel;
