import {
  FETCH_ORDER_BOOK_STARTED,
  FETCH_ORDER_BOOK_SUCCEEDED,
  FETCH_ORDER_BOOK_FAILED,
} from "@/store/types/orderbook";
import { api } from "@/services/api";

export const fetchOrderbookStarted = () => ({
  type: FETCH_ORDER_BOOK_STARTED,
});

export const fetchOrderbookSucceeded = (items) => ({
  type: FETCH_ORDER_BOOK_SUCCEEDED,
  items,
});

export const fetchOrderbookFailed = (error) => ({
  type: FETCH_ORDER_BOOK_FAILED,
  error,
});

export const fetchOrderbook = () => {
  return async (dispatch) => {
    dispatch(fetchOrderbookStarted());
    try {
      const data = await api.getOrderBook();
      dispatch(fetchOrderbookSucceeded(data));
    } catch (err) {
      dispatch(fetchOrderbookFailed(err));
    }
  };
};
