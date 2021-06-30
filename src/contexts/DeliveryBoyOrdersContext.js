import React, { useState, useContext, createContext } from "react";

const DeliveryBoyOrdersContext = createContext();
const UpdateDeliveryBoyOrdersContext = createContext();

export function useDeliveryBoyOrders() {
  return useContext(DeliveryBoyOrdersContext);
}

export function useDeliveryBoyOrdersUpdate() {
  return useContext(UpdateDeliveryBoyOrdersContext);
}

export const DeliveryBoyOrdersProvider = ({ children }) => {
  const [deliveryBoyOrders, setDeliveryBoyOrders] = useState(null);

  function updateDeliveryBoyOrders(deliveryBoyOrders) {
    setDeliveryBoyOrders(deliveryBoyOrders);
  }

  return (
    <DeliveryBoyOrdersContext.Provider value={deliveryBoyOrders}>
      <UpdateDeliveryBoyOrdersContext.Provider value={updateDeliveryBoyOrders}>
        {children}
      </UpdateDeliveryBoyOrdersContext.Provider>
    </DeliveryBoyOrdersContext.Provider>
  );
};
