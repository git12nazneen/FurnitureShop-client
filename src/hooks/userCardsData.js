import { useState, useEffect } from "react";
import axios from "axios";
import { calculateSubtotalPrice, calculateTotalDiscount, calculateTotalPrice } from "../utilis/calculate";

const useCardsData = (user) => {
  const [cards, setCards] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(false);

  // Fetch data from the server
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get("https://server-zeta-nine-87.vercel.app/cards");
        setCards(response.data);
        console.log("Fetched cards:", response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

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
  };
};

export default useCardsData;
