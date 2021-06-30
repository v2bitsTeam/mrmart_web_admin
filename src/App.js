import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AdminProvider } from "./contexts/AdminContext";
import AuthenticationPage from "./pages/Authentication/AuthenticationPage";
import UsersPage from "./pages/Users/UsersPage";
import UserProfilePage from "./pages/Users/UserProfilePage";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import ProductsPage from "./pages/Products/ProductsPage";
import OrdersPage from "./pages/Orders/OrdersPage";
import TransactionsPage from "./pages/Transactions/TransactionsPage";
import DeliveryBoysPage from "./pages/DeliveryBoys/DeliveryBoysPage";
import DeliveryBoyProfilePage from "./pages/DeliveryBoys/DeliveryBoyProfilePage";
import NotFoundPage from "./pages/NotFound/NotFound";
import PincodesPage from "./pages/Pincodes/PincodesPage";

function App() {
  return (
    <AdminProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={AuthenticationPage} />
            <Route exact path="/users" component={UsersPage} />
            <Route exact path="/user:id" component={UserProfilePage} />
            <Route exact path="/categories" component={CategoriesPage} />
            <Route exact path="/products:id" component={ProductsPage} />
            <Route exact path="/orders" component={OrdersPage} />
            <Route exact path="/transactions" component={TransactionsPage} />
            <Route exact path="/deliveryBoys" component={DeliveryBoysPage} />
            <Route exact path="/pincodes" component={PincodesPage} />
            <Route
              exact
              path="/deliveryBoy:id"
              component={DeliveryBoyProfilePage}
            />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    </AdminProvider>
  );
}

export default App;
