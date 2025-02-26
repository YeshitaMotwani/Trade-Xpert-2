import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./SellActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  // Use useContext to get closeSellWindow
  const { closeSellWindow } = useContext(GeneralContext);

  // Fetch the available stock quantity
  useEffect(() => {
    const fetchStockQuantity = async () => {
      try {
        const response = await axios.get(`https://trade-xpert-backend.onrender.com/getHoldings/${uid}`);
        setAvailableQuantity(response.data.quantity || 0);
      } catch (error) {
        console.error("Error fetching stock holdings:", error);
        setAvailableQuantity(0);
      }
    };

    fetchStockQuantity();
  }, [uid]);

  const handleSellClick = async () => {
    if (stockQuantity > availableQuantity) {
      setErrorMessage("You don't have enough stocks to sell.");
      return;
    }
    
    try {
      await axios.post("http://localhost:3002/newOrders", { // Corrected route
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "SELL",
      });
      closeSellWindow(); // Close the window after a successful request
    } catch (error) {
      console.error("Error placing sell order:", error);
    }
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(Number(e.target.value))}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(Number(e.target.value))}
              value={stockPrice}
            />
          </fieldset>
        </div>
        <p>Available: {availableQuantity} stocks</p>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link className="btn btn-red" onClick={handleSellClick}>
            Sell
          </Link>
          <Link to="" className="btn btn-grey" onClick={closeSellWindow}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
