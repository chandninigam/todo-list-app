// Import Libraries
import { View, Text, StyleSheet } from "react-native";
import { AntDesign as AntDesignIcon } from "@expo/vector-icons";

export default function CompletedTodoCard({ item }) {
  if (item.is_completed) {
    return (
      <View key={item.date_completed} style={completedTodoCard.cardWrapper}>
        <View style={completedTodoCard.cardTitleIconWrapper}>
          <Text.Regular style={completedTodoCard.cardTitle}>
            {item.title}
          </Text.Regular>
          <AntDesignIcon name="checkcircle" size={24} color="green" />
        </View>
        <Text.Regular style={completedTodoCard.cardCompletedText}>
          Completed on:
          {` ${new Date(item.date_completed).getDate()}-${new Date(
            item.date_completed
          ).toLocaleString("default", {
            month: "long",
          })}`}
        </Text.Regular>
      </View>
    );
  }
  return null;
}

const completedTodoCard = StyleSheet.create({
  cardWrapper: {
    display: "flex",
    backgroundColor: "white",
    marginBottom: 24,
    shadowColor: "#000",
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3.84,
    elevation: 2,
  },
  cardTitleIconWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  cardTitle: {
    display: "flex",
    flex: 1,
    alignSelf: "flex-start",
    fontSize: 20,
    fontWeight: "700",
  },
  cardCompletedText: {
    fontSize: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    color: "#abafb3",
  },
});
