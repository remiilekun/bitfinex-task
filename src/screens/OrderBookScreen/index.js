import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectOrderBookItems } from "@/store/selectors/orderbook";
import { fetchOrderbook } from "@/store/actions/orderbook";
import { useSocket } from "@/hooks";
import styles from "./styles";
import OrderBookTable from "@/components/OrderBookTable";

const OrderBookScreen = () => {
  useSocket();
  const dispatch = useDispatch();
  const items = useSelector(selectOrderBookItems);

  useEffect(() => {
    dispatch(fetchOrderbook());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ORDER BOOK</Text>

      <OrderBookTable items={Object.values(items)} />
    </View>
  );
};

export default OrderBookScreen;
