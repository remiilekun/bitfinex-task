import {
  FETCH_ORDER_BOOK_STARTED,
  FETCH_ORDER_BOOK_SUCCEEDED,
  FETCH_ORDER_BOOK_FAILED,
  UPDATE_ORDER_BOOK_ITEM,
} from "@/store/types/orderbook";

const initialState = {
  error: null,
  items: {},
  loading: false,
};

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDER_BOOK_STARTED: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case FETCH_ORDER_BOOK_SUCCEEDED: {
      return {
        ...state,
        items: action.items,
        loading: false,
      };
    }
    case FETCH_ORDER_BOOK_FAILED: {
      return {
        ...state,
        todos: [],
        loading: false,
        error: action.error,
      };
    }

    case UPDATE_ORDER_BOOK_ITEM: {
      const { key, value } = action;

      return {
        ...state,
        items: {
          ...state.items,
          [key]: value,
        },
      };
    }
    default:
      return state;
  }
}
