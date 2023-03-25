import { useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Context } from "../contexts/AppContext";

const { height } = Dimensions.get("window");

export function CompletedTodoScreen() {
  return (
    <View style={completeTabStyle.wrapper}>
      <View style={completeTabStyle.header}>
        <Text style={completeTabStyle.headingText}>Completed</Text>
      </View>
    </View>
  );
}

const completeTabStyle = StyleSheet.create({
  header: {
    display: "flex",
    padding: height / 80,
  },
  headingText: {
    display: "flex",
    alignSelf: "flex-start",
    fontSize: height / 32,
    fontWeight: "700",
  },
});
