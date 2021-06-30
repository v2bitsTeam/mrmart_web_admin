import React, { useState, useContext, createContext } from "react";

const TransactionsContext = createContext();
const UpdateTransactionsContext = createContext();

export function useTransactions() {
  return useContext(TransactionsContext);
}

export function useTransactionsUpdate() {
  return useContext(UpdateTransactionsContext);
}

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(null);

  function updateTransactions(transactions) {
    setTransactions(transactions);
  }

  return (
    <TransactionsContext.Provider value={transactions}>
      <UpdateTransactionsContext.Provider value={updateTransactions}>
        {children}
      </UpdateTransactionsContext.Provider>
    </TransactionsContext.Provider>
  );
};
