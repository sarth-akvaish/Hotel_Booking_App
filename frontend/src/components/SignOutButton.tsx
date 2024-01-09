import { useMutation } from "react-query";
import * as apiClient from "../api-clients";
import { useAppContext } from "../contexts/Appcontext";

const SignOutButton = () => {
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: () => {
      showToast({ message: "Signed Out!!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleclick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleclick}
      className="text-blue-600 px-3 font-bold hover:bg-gray-100 bg-white"
    >
      Signout
    </button>
  );
};

export default SignOutButton;
