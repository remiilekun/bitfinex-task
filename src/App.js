import React from "react";
import { SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import OrderBook from "@/screens/OrderBook";
import store from "@/store";

const App = () => {
  return (
    <SafeAreaView>
      <Provider store={store}>
        <OrderBook />
      </Provider>
    </SafeAreaView>
  );
};

export default App;
