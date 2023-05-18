import {
  FETCH_ORDER_BOOK_STARTED,
  FETCH_ORDER_BOOK_SUCCEEDED,
  FETCH_ORDER_BOOK_FAILED,
  UPDATE_ORDER_BOOK_ITEM,
} from "@/store/types/orderbook";
import { api } from "@/services/api";
import { convertArrayToObject } from "@/utils/helpers";

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

export const updateOrderbookItem = (key, value) => ({
  type: UPDATE_ORDER_BOOK_ITEM,
  key,
  value,
});

export const fetchOrderbook = () => {
  return async (dispatch) => {
    dispatch(fetchOrderbookStarted());
    try {
      const data = await api.getOrderBook();
      dispatch(fetchOrderbookSucceeded(convertArrayToObject(data)));
    } catch (err) {
      dispatch(fetchOrderbookFailed(err));
    }
  };
};
