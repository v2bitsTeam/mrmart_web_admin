import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import NoTransactionsFound from "../../assets/images/no-transactions.webp";
import getTransactions from "./getTransactions";
import TransactionsTable from "./TransactionsTable";
import {
  useTransactions,
  useTransactionsUpdate,
} from "../../contexts/TransactionsContext";

const Transactions = () => {
  const transactions = useTransactions();
  const updateTransactions = useTransactionsUpdate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTransactions();
    setTimeout(() => {
      setLoading(false);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getAllTransactions() {
    const transactions = await getTransactions();
    updateTransactions(transactions);
  }

  return (
    <div style={transactionsPage}>
      {loading ? (
        <div style={loadingContainer}>
          <CircularProgress />
        </div>
      ) : transactions ? (
        <TransactionsTable />
      ) : (
        <div style={noTransactionsFoundContainer}>
          <img src={NoTransactionsFound} alt={"no transactions found"} />
          <Typography variant="h6" component="h6">
            No transactions found
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Transactions;

const transactionsPage = {
  marginTop: "4rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const loadingContainer = {
  height: "80vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const noTransactionsFoundContainer = {
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
