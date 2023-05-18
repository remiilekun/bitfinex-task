import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectOrderBookItems } from "@/store/selectors/orderbook";
import { fetchOrderbook } from "@/store/actions/orderbook";
import { useSocket } from "@/hooks";

const OrderBookScreen = () => {
  useSocket();
  const dispatch = useDispatch();
  const items = useSelector(selectOrderBookItems);

  useEffect(() => {
    dispatch(fetchOrderbook());
  }, [dispatch]);

  return (
    <View>
      <Text>Hello world</Text>
    </View>
  );
};

export default OrderBookScreen;