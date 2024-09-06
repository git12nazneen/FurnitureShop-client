// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";
// import useAuth from "./useAuth";

// const useCard = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();

//   const { refetch, data: cards = [] } = useQuery({
//     queryKey: ['cards', user?.email],
//     queryFn: async () => {
//       if (user?.email) {
//         const res = await axiosSecure.get(`/cards?email=${user.email}`);
//         return res.data;
//       }
//       return [];
//     },
//     enabled: !!user?.email, // Only run the query if user email exists
//   });

//   return [cards, refetch];
// };

// export default useCard;
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
console.log('name', user)
  const { refetch, data: cards = [] } = useQuery({
    queryKey: ['cards', user?.email],
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/cards?email=${user.email}`);
        return res.data;
      }
      return [];
    },
    enabled: !!user?.email, // Only run the query if user email exists
  });

  return [cards, refetch];
};

export default useCard;
