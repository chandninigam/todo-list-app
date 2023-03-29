import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AntDesign as AntDesignIcon } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

export default function CompletedTodoCard({ item }) {
  if (item.is_completed) {
    return (
      <View
        // key={todo.todo_date_completed}
        style={completedTodoCard.listWrapper}
      >
        <View style={completedTodoCard.listTitleIcon}>
          <Text.Regular style={completedTodoCard.headingText}>
            {item.title}
          </Text.Regular>
          <AntDesignIcon name="checkcircle" size={24} color="green" />
        </View>
        <Text.Regular style={completedTodoCard.textCompletedOn}>
          Completed on:
          {` ${new Date().getDate()} - ${new Date().toLocaleString("default", {
            month: "long",
          })}`}
        </Text.Regular>
      </View>
    );
  }
  return null;
}

const completedTodoCard = StyleSheet.create({
  listWrapper: {
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
  listTitleIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: height / 80,
  },
  headingText: {
    display: "flex",
    flex: 1,
    alignSelf: "flex-start",
    fontSize: 20,
    fontWeight: "700",
  },
  textCompletedOn: {
    fontSize: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    color: "#abafb3",
  },
});
