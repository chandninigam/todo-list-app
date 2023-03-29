// Import Libraries
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { Entypo as EntypoIcon } from "@expo/vector-icons";
// Import Custom Hook
import { useTodos } from "../contexts/AppContext";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

export default function TodoCard({ item }) {
  const { deleteTodo, todos, setTodoCompleted } = useTodos();
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      style={listStyles.listWrapper}
      onPress={() => {
        navigate("TodoEditScreen", { todo: item });
      }}
    >
      <View style={listStyles.topContainer}>
        <CheckBox
          containerStyle={listStyles.checkbox}
          onPress={() => {
            setTodoCompleted(item);
          }}
        />
        <Text.Regular style={listStyles.listText}>{item.title}</Text.Regular>
        <TouchableOpacity
          style={listStyles.deleteIcon}
          onPress={() => {
            deleteTodo(item);
          }}
        >
          <EntypoIcon name="cross" size={28} color="red" />
        </TouchableOpacity>
      </View>
      <Text.Regular style={listStyles.textCreatedOn}>
        Created on :
        {` ${new Date(item.todo_date_created).getDate()}-${new Date(
          item.todo_date_created
        ).toLocaleString("default", { month: "long" })}`}
      </Text.Regular>
    </TouchableOpacity>
  );
}

const listStyles = StyleSheet.create({
  listWrapper: {
    display: "flex",
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
  checkbox: {
    display: "flex",
    alignSelf: "center",
    paddingLeft: 4,
    paddingRight: 0,
    paddingVertical: 6,
  },
  listText: {
    color: "black",
    fontSize: 20,
    flex: 0.9,
    display: "flex",
    alignSelf: "center",
  },
  deleteIcon: {
    display: "flex",
    alignSelf: "center",
    flex: 0.1,
  },
  textCreatedOn: {
    fontSize: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    color: "#abafb3",
  },
});
