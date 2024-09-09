import { useState, useEffect } from "react";

import { calculateSubtotalPrice, calculateTotalDiscount, calculateTotalPrice } from "../utilis/calculate";
import { useQuery } from "@tanstack/react-query";

const useCardsData = (user) => {
  // const [cards, setCards] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(false);

  // Fetch data from the server
 

  const { isLoading, error, data: cards ,refetch} = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const res = await fetch("https://server-zeta-nine-87.vercel.app/cards");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });

  // Filter user-specific cards and manage checkout button state
  useEffect(() => {
    if (user) {
      const filteredCards = cards.filter(
        (card) => card.email?.toLowerCase().trim() === user.email?.toLowerCase().trim()
      );
      setUserCards(filteredCards);
      setIsCheckoutDisabled(filteredCards.length === 0);
    }
  }, [cards, user]);

  // Calculate prices
  const subtotalPrice = calculateSubtotalPrice(userCards);
  const totalDiscount = calculateTotalDiscount(userCards);
  const totalPrice = calculateTotalPrice(subtotalPrice, totalDiscount);

  return {
    userCards,
    isCheckoutDisabled,
    subtotalPrice,
    totalDiscount,
    totalPrice,
    setIsCheckoutDisabled,
    setUserCards,
    refetch,
    isLoading,
     error

  };
};

export default useCardsData;
