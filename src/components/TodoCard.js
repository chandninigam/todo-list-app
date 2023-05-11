// Import Libraries
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { CheckBox } from "react-native-elements";
import { Entypo as EntypoIcon } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
// Import Custom Hook
import { useTodos } from "../contexts/AppContext";

export default function TodoCard({ item }) {
  const {
    deleteTodo,
    todos,
    setTodoCompleted,
    setShowTodoEditModal,
    setSelectedEditTodo,
  } = useTodos();

  if (!item.isCompleted) {
    return (
      <TouchableOpacity
        style={listStyles.todoCardWrapper}
        onPress={() => {
          setShowTodoEditModal(true);
          setSelectedEditTodo(item);
        }}
      >
        <View style={listStyles.todoCardTitleIconWrapper}>
          <CheckBox
            containerStyle={listStyles.todoCardCheckBox}
            onPress={() => {
              setTodoCompleted(item);
              Toast.show({
                visibilityTime: 1500,
                type: "tomatoToast",
                props: { text: `Completed ${item.title} task` },
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
        <Text.Regular
          style={listStyles.todoCardTextCreatedOn}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.description}
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
