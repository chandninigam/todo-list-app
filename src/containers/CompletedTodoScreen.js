import { View, Text, StyleSheet, Dimensions } from "react-native";

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
    marginTop: height / 16,
    padding: height / 80,
  },
  headingText: {
    display: "flex",
    alignSelf: "flex-start",
    fontSize: height / 32,
    fontWeight: "700",
  },
});