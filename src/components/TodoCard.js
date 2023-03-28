// Import Libraries
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import { AntDesign as AntDesignIcon } from "@expo/vector-icons";
// Import Custom Hook
import { useTodos } from "../contexts/AppContext";

const { height } = Dimensions.get("window");

export default function TodoCard({ item }) {
  const { setTodoCompleted, deleteTodo } = useTodos();

  return (
    <View style={listStyles.listWrapper}>
      <View style={listStyles.topContainer}>
        <Text.Regular style={listStyles.listText}>{item.title}</Text.Regular>
        <TouchableOpacity
          style={listStyles.checkIcon}
          onPress={() => {
            setTodoCompleted(item);
          }}
        >
          <AntDesignIcon name="checkcircleo" size={21} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          style={listStyles.deleteIcon}
          onPress={() => {
            deleteTodo(item);
          }}
        >
          <AntDesignIcon name="delete" size={20} color="red" />
        </TouchableOpacity>
      </View>
      <Text.Regular style={listStyles.textCreatedOn}>
        Created on :
        {` ${new Date(item.todo_created).getDate()}-${new Date(
          item.todo_created
        ).toLocaleString("default", { month: "long" })}`}
      </Text.Regular>
    </View>
  );
}

const listStyles = StyleSheet.create({
  listWrapper: {
    display: "flex",
    // flexDirection: "row",
    padding: height / 64,
    backgroundColor: "white",
    marginBottom: height / 40,
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
  topContainer: {
    display: "flex",
    flexDirection: "row",
  },
  listText: {
    color: "black",
    fontSize: 20,
    flex: 0.8,
  },
  checkIcon: {
    flex: 0.1,
    marginHorizontal: height / 80,
  },
  deleteIcon: {
    flex: 0.1,
  },
  textCreatedOn: {
    fontSize: 16,
    marginTop: 8,
    color: "#abafb3",
  },
});
