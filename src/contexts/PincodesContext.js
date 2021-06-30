import React, { useState, useContext, createContext } from "react";

const PincodesContext = createContext();
const UpdatePincodesContext = createContext();

export function usePincodes() {
  return useContext(PincodesContext);
}

export function usePincodesUpdate() {
  return useContext(UpdatePincodesContext);
}

export const PincodesProvider = ({ children }) => {
  const [pincodes, setPincodes] = useState(null);

  function updatePincodes(pincodes) {
    setPincodes(pincodes);
  }

  return (
    <PincodesContext.Provider value={pincodes}>
      <UpdatePincodesContext.Provider value={updatePincodes}>
        {children}
      </UpdatePincodesContext.Provider>
    </PincodesContext.Provider>
  );
};
