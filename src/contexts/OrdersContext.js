import React, { useState, useContext, createContext } from "react";

const OrdersContext = createContext();
const UpdateOrdersContext = createContext();

export function useOrders() {
  return useContext(OrdersContext);
}

export function useOrdersUpdate() {
  return useContext(UpdateOrdersContext);
}

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(null);

  function updateOrders(orders) {
    setOrders(orders);
  }

  return (
    <OrdersContext.Provider value={orders}>
      <UpdateOrdersContext.Provider value={updateOrders}>
        {children}
      </UpdateOrdersContext.Provider>
    </OrdersContext.Provider>
  );
};
