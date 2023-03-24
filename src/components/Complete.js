import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  useContext,
} from "react-native";
import { Context } from "../context/main";

const { height } = Dimensions.get("window");

export function Completed() {
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
