// Function to calculate subtotal price
export const calculateSubtotalPrice = (userCards) => {
    return userCards.reduce(
      (total, item) => total + (parseFloat(item.price) || 0),
      0
    );
  };
  
  // Function to calculate total discount
  export const calculateTotalDiscount = (userCards) => {
    return userCards.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const discountPercentage = parseFloat(item.discount) || 0;
      const discountAmount = price * (discountPercentage / 100);
      return total + discountAmount;
    }, 0);
  };
  
  // Function to calculate total price after discount
  export const calculateTotalPrice = (subtotalPrice, totalDiscount) => {
    return subtotalPrice - totalDiscount;
  };
  