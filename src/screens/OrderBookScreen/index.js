import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderbook } from "@/store/actions/orderbook";
import { useOrderbookSocket } from "@/hooks";
import OrderBookTable from "@/components/OrderBookTable";
import PrecisionSwitcher from "@/components/PrecisionSwitcher";
import styles from "./styles";

const OrderBookScreen = () => {
  useOrderbookSocket();
  const dispatch = useDispatch();

  const { loading, items, precision } = useSelector((state) => ({
    loading: state.orderbook.loading,
    items: state.orderbook.items,
    precision: state.orderbook.precision,
  }));

  useEffect(() => {
    dispatch(
      fetchOrderbook({
        pair: "tBTCUSD",
        precision: "P0",
        precision: `P${precision}`,
      })
    );
  }, [dispatch, precision]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ORDER BOOK</Text>
        <PrecisionSwitcher />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <OrderBookTable items={Object.values(items)} />
      )}
    </View>
  );
};

export default OrderBookScreen;
