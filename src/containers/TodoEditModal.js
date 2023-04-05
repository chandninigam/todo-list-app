import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import { useTodos } from "../contexts/AppContext";

export function TodoEditModal({ editable }) {
  const {
    showTodoEditModal,
    setShowTodoEditModal,
    selectedEditTodo,
    addTodo,
    updateTodo,
  } = useTodos();

  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  function PrimaryButton() {
    return (
      <TouchableOpacity
        style={modalStyles.primaryBtn}
        onPress={() => {
          setShowTodoEditModal(false);
          if (selectedEditTodo) {
            // upadte existing todo
            updateTodo(selectedEditTodo, {
              title: todoTitle,
              description: todoDescription,
            });
          } else {
            // save new todo
            addTodo({ title: todoTitle, description: todoDescription });
          }
        }}
      >
        <Text.Bold style={modalStyles.primaryBtnText}>
          {selectedEditTodo ? "Update" : "Add"}
        </Text.Bold>
      </TouchableOpacity>
    );
  }

  return (
    <Modal
      isVisible={showTodoEditModal}
      // on modal show on the screen
      onModalWillShow={() => {
        setTodoTitle(selectedEditTodo?.title || "");
        setTodoDescription(selectedEditTodo?.description || "");
      }}
    >
      <View style={modalStyles.wrapper}>
        <TextInput
          value={todoTitle}
          editable={editable}
          placeholder="Title"
          style={modalStyles.title}
          numberOfLines={1}
          onChangeText={(value) => {
            setTodoTitle(value);
          }}
        />
        <View style={modalStyles.descriptionWrapper}>
          <TextInput
            editable={editable}
            multiline
            value={todoDescription}
            placeholder="Add Description"
            style={modalStyles.descriptionText}
            onChangeText={(value) => {
              setTodoDescription(value);
            }}
          />
        </View>
        <View style={modalStyles.actionsWrapper}>
          <TouchableOpacity
            style={modalStyles.secondaryBtn}
            onPress={() => {
              setShowTodoEditModal(false);
            }}
          >
            <Text.Bold style={modalStyles.secondaryBtnText}>Cancel</Text.Bold>
          </TouchableOpacity>
          {editable ? <PrimaryButton /> : null}
        </View>
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  wrapper: {
    display: "flex",
    backgroundColor: "white",
    padding: 24,
    marginBottom: 32,
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
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  descriptionWrapper: {
    marginTop: 16,
    height: 500,
  },
  descriptionText: {
    fontSize: 20,
  },
  actionsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  primaryBtn: {
    display: "flex",
    alignSelf: "flex-end",
    padding: 12,
    marginTop: 8,
    backgroundColor: "#548af0",
    borderRadius: 6,
    marginHorizontal: 12,
  },
  primaryBtnText: {
    fontSize: 20,
    color: "white",
  },
  secondaryBtn: {
    display: "flex",
    alignSelf: "flex-end",
    padding: 12,
    marginTop: 8,
    backgroundColor: "#edf1f7",
    borderRadius: 6,
    borderColor: "#c4c2c2",
    borderWidth: 1,
  },
  secondaryBtnText: {
    fontSize: 20,
    color: "black",
  },
});
