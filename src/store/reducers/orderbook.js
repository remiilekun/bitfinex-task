import {
  FETCH_ORDER_BOOK_STARTED,
  FETCH_ORDER_BOOK_SUCCEEDED,
  FETCH_ORDER_BOOK_FAILED,
  UPDATE_ORDER_BOOK_ITEM,
  INCREMENT_PRECISION,
  DECREMENT_PRECISION,
} from "@/store/types/orderbook";

const initialState = {
  error: null,
  items: {},
  loading: false,
  precision: 0,
};

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_PRECISION: {
      const { precision } = state;
      return {
        ...state,
        precision: precision < 4 ? precision + 1 : precision,
      };
    }

    case DECREMENT_PRECISION: {
      const { precision } = state;
      return {
        ...state,
        precision: precision > 0 ? precision - 1 : precision,
      };
    }

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
