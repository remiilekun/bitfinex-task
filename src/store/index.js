import { configureStore } from "@reduxjs/toolkit";
import orderbook from "./reducers/orderbook";

const store = configureStore({
  reducer: {
    orderbook: orderbook,
  },
});

export default store;
