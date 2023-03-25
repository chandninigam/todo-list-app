import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import { AntDesign as Icon } from "@expo/vector-icons";
import { useTodos } from "../contexts/AppContext";

const { height } = Dimensions.get("window");

export default function TodoCard({ item }) {
  const { setTodoCompleted, deleteTodo } = useTodos();

  return (
    <View style={listStyles.container}>
      <Text.Regular style={listStyles.listText}>{item}</Text.Regular>
      <TouchableOpacity
        style={listStyles.checkIcon}
        onPress={() => {
          setTodoCompleted(item);
        }}
      >
        <Icon name="checkcircleo" size={21} color="green" />
      </TouchableOpacity>
      <TouchableOpacity
        style={listStyles.deleteIcon}
        onPress={() => {
          deleteTodo(item);
        }}
      >
        <Icon name="delete" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
}

const listStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: height / 64,
    backgroundColor: "white",
    marginBottom: height / 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
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
});
