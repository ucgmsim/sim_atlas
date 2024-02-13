// DisclaimerPopup.js

import React, { useState, useEffect } from 'react';

function DisclaimerPopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if the cookie exists
    if (document.cookie.indexOf('disclaimer_accepted=true') === -1) {
      // If the cookie does not exist, show the popup
      setShowPopup(true);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    // Set the cookie when the user clicks OK
    document.cookie = 'disclaimer_accepted=true; expires=Fri, 31 Dec 9999 23:59:59 GMT';
  };

  return (
    showPopup && (
      <div className="popup">
        <div className="popup-content">
          <h2>Disclaimer</h2>
          <p>The ground motion simulation animation considers only one potential rupture out of many possibilities that could occur on the fault.<br /> The animation is intended to be used only for general science commmunicatiohn, not for rigorous quantitative analysis.</p>
          <button onClick={handleClose}>OK</button>
        </div>
      </div>
    )
  );
}

export default DisclaimerPopup;
