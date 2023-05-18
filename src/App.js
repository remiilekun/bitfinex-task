import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import OrderBookScreen from "@/screens/OrderBookScreen";
import store from "@/store";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <OrderBookScreen />
      </Provider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#102331",
  },
});
