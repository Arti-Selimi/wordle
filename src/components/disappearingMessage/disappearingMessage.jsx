import React, { useEffect, useState, useContext } from "react";

const DisappearingMessage = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return isVisible ? <div className="disappearingMessage">{message}</div> : null;
};

export default DisappearingMessage;
