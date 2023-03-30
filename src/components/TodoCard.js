// Import Libraries
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { CheckBox } from "react-native-elements";
import { Entypo as EntypoIcon } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
// Import Custom Hook
import { useTodos } from "../contexts/AppContext";
import { useNavigation } from "@react-navigation/native";

export default function TodoCard({ item }) {
  const { deleteTodo, todos, setTodoCompleted } = useTodos();
  const { navigate } = useNavigation();

  if (!item.is_completed) {
    return (
      <TouchableOpacity
        style={listStyles.todoCardWrapper}
        onPress={() => {
          navigate("TodoEditScreen", { todo: item });
        }}
      >
        <View style={listStyles.todoCardTitleIconWrapper}>
          <CheckBox
            containerStyle={listStyles.todoCardCheckBox}
            onPress={() => {
              setTodoCompleted(item);
              Toast.show({
                type: "success",
                text1: `Completed ${item.title} task`,
                position: "bottom",
                visibilityTime: 1500,
              });
            }}
          />
          <Text.Regular style={listStyles.cardTitle}>{item.title}</Text.Regular>
          <TouchableOpacity
            style={listStyles.todoCardDeleteIcon}
            onPress={() => {
              deleteTodo(item);
            }}
          >
            <EntypoIcon name="cross" size={28} color="red" />
          </TouchableOpacity>
        </View>
        <Text.Regular style={listStyles.todoCardTextCreatedOn}>
          Created on :
          {` ${new Date(item.date_created).getDate()}-${new Date(
            item.date_created
          ).toLocaleString("default", { month: "long" })}`}
        </Text.Regular>
      </TouchableOpacity>
    );
  }
  return null;
}

const listStyles = StyleSheet.create({
  todoCardWrapper: {
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
  todoCardTitleIconWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  todoCardCheckBox: {
    display: "flex",
    alignSelf: "center",
    paddingLeft: 4,
    paddingRight: 0,
    paddingVertical: 6,
  },
  cardTitle: {
    color: "black",
    fontSize: 20,
    flex: 0.9,
    display: "flex",
    alignSelf: "center",
  },
  todoCardDeleteIcon: {
    display: "flex",
    alignSelf: "center",
    flex: 0.1,
  },
  todoCardTextCreatedOn: {
    fontSize: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    color: "#abafb3",
  },
});
