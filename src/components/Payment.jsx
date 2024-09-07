import  { useState } from 'react';
import { Link } from 'react-router-dom';

const Payment = ({ onPaymentSelect }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    if (typeof onPaymentSelect === 'function') {
      onPaymentSelect(e.target.value);
    } else {
      console.error('onPaymentSelect is not a function');
    }
  };

  return (
    <div>
      <h2>Payment Options</h2>
      <Link to='/dashboard/checkoutform'>
        <input
          type="radio"
          value="cod"
          to='/dashboard/checkoutform'
          checked={selectedOption === 'cod'}
          onChange={handleOptionChange}
        />
        Cash on Delivery
      </Link>
      {/* Add more payment options here if needed */}
    </div>
  );
};

export default Payment;
