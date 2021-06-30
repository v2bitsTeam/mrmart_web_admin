import NavBar from "../../components/NavBar/NavBar";
import { Redirect } from "react-router";
import { useAdmin } from "../../contexts/AdminContext";
import { TransactionsProvider } from "../../contexts/TransactionsContext";
import Transactions from "../../components/Transactions/Transactions";

const TransactionsPage = () => {
  const admin = useAdmin();
  if (!admin.admin) {
    return <Redirect to="/" />;
  }

  return (
    <TransactionsProvider>
      <NavBar active="transactions" />
      <Transactions />
    </TransactionsProvider>
  );
};

export default TransactionsPage;
