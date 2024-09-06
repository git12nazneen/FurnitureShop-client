
  const { data: cards = [], isLoading, error } = useQuery({
    queryKey: ["cards", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/cards/${user.email}`);
      console.log(res.data); // Log the response to check if data is received correctly
      return res.data;
    },
  });

