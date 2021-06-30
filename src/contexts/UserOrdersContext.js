import React, { useState, useContext, createContext } from "react";

const UserOrdersContext = createContext();
const UpdateUserOrdersContext = createContext();

export function useUserOrders() {
  return useContext(UserOrdersContext);
}

export function useUserOrdersUpdate() {
  return useContext(UpdateUserOrdersContext);
}

export const UserOrdersProvider = ({ children }) => {
  const [userOrders, setUserOrders] = useState(null);

  function updateUserOrders(userOrders) {
    setUserOrders(userOrders);
  }

  return (
    <UserOrdersContext.Provider value={userOrders}>
      <UpdateUserOrdersContext.Provider value={updateUserOrders}>
        {children}
      </UpdateUserOrdersContext.Provider>
    </UserOrdersContext.Provider>
  );
};
