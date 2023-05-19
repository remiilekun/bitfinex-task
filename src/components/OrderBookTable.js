import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const OrderBookTable = ({ items }) => {
  return (
    <ScrollView>
      <View style={styles.row}>
        <Text style={styles.col}>Price</Text>
        <Text style={styles.col}>Count</Text>
        <Text style={styles.col}>Amount</Text>
      </View>

      {items.map(([price, count, amount]) => (
        <View style={styles.row} key={price}>
          <Text style={styles.col}>{price}</Text>
          <Text style={styles.col}>{count}</Text>
          <Text style={styles.col}>{amount}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default OrderBookTable;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  col: {
    width: "33.333333%",
    color: "white",
  },
});
