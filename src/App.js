import React from "react";
import { SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import OrderBookScreen from "@/screens/OrderBookScreen";
import store from "@/store";

const App = () => {
  return (
    <SafeAreaView>
      <Provider store={store}>
        <OrderBookScreen />
      </Provider>
    </SafeAreaView>
  );
};

export default App;
