import { useQuery } from "react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useFetchData = (queryKey, url, token) => {

  const { data, isLoading, isError, refetch, isFetched } = useQuery(
    queryKey,
    async () => {
      const response = await axios.get(url, {
        headers: {
          Authorization: token
        }
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        if ( !isFetched) {
          toast.success(data.message, {
            position: "bottom-right",
          });
        }
      },
    }
  );

  return { data, isLoading, isError, refetch };
};

export default useFetchData;
