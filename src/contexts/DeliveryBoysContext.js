import React, { useState, useContext, createContext } from "react";

const DeliveryBoysContext = createContext();
const UpdateDeliveryBoysContext = createContext();

export function useDeliveryBoys() {
  return useContext(DeliveryBoysContext);
}

export function useDeliveryBoysUpdate() {
  return useContext(UpdateDeliveryBoysContext);
}

export const DeliveryBoysProvider = ({ children }) => {
  const [deliveryBoys, setDeliveryBoys] = useState(null);

  function updateDeliveryBoys(deliveryBoys) {
    setDeliveryBoys(deliveryBoys);
  }

  return (
    <DeliveryBoysContext.Provider value={deliveryBoys}>
      <UpdateDeliveryBoysContext.Provider value={updateDeliveryBoys}>
        {children}
      </UpdateDeliveryBoysContext.Provider>
    </DeliveryBoysContext.Provider>
  );
};
