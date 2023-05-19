import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementPrecision,
  incrementPrecision,
} from "@/store/actions/orderbook";
import { selectPrecision } from "@/store/selectors/orderbook";

const PrecisionSwitcher = () => {
  const dispatch = useDispatch();
  const precision = useSelector(selectPrecision);

  const handleDecrease = () => {
    dispatch(decrementPrecision());
  };

  const handleIncrease = () => {
    dispatch(incrementPrecision());
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={precision === 0}
        onPress={handleDecrease}
        style={styles.button}
      >
        <Text style={[styles.text, precision === 0 && styles.disabledText]}>
          -
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={precision === 4}
        onPress={handleIncrease}
        style={styles.button}
      >
        <Text style={[styles.text, precision === 4 && styles.disabledText]}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PrecisionSwitcher;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    padding: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  disabledText: {
    color: "grey",
  },
});
