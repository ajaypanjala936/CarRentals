import React, { useState } from 'react';

import "./Special.css";

const Special = () => {
  const [copiedCode, setCopiedCode] = useState('');

  const offers = [
    { id: 1, title: "Flat 20% Off on festive mood", code: "FESTIVE20", description: "Use this code to get 20% off on all cars ON ABOVE 7000." },
    { id: 2, title: "Flat 10% off on -Car Bookings", code: "SAVE10", description: "Use this code to get 10%. Limited time offer! & above 1000" },
    { id: 3, title: "Flat 15% off on weekend ", code: "WEEKEND15", description: "book for only once on freshers cashback instantly 15% off." },
  ];

  // Function to copy promo code
  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000); // Reset copied state after 2 seconds
  };

  return (
    <div>
     
      <div className="offers-container">
        <h2>🎉 Exclusive Offers & Promo Codes</h2>
        <img 
          src="https://www.innovacarhiredelhi.co.in/assets/images/backgrounds/slider-1-1.webp" 
          alt="car" 
          className="offer-image" 
        />
        <div className="offers-list">
          {offers.map((offer) => (
            <div key={offer.id} className="offer-card">
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <div className="promo-code-section">
                <p className="promo-code">Promo Code: <strong>{offer.code}</strong></p>
                <button 
                  className="copy-btn1" 
                  onClick={() => copyCode(offer.code)}
                >
                  {copiedCode === offer.code ? "✔ Copied!" : "📋 Copy"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bottom-navbar">
       
      </div>
    </div>
  );
};

export default Special;


