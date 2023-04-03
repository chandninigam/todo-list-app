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

export function TodoEditModal() {
  const {
    showTodoEditModal,
    setShowTodoEditModal,
    selectedEditTodo,
    addTodo,
    updateTodo,
  } = useTodos();
  const [todoTitle, setTodoTitle] = useState(selectedEditTodo?.title || "");
  const [todoDescription, setTodoDescription] = useState(
    selectedEditTodo?.description || ""
  );

  return (
    <Modal isVisible={showTodoEditModal}>
      <View style={modalStyles.wrapper}>
        <TextInput
          // value={selectedEditTodo?.title}
          value={todoTitle}
          placeholder="Title"
          style={modalStyles.title}
          onChangeText={(value) => {
            setTodoTitle(value);
          }}
        />
        <View style={modalStyles.descriptionWrapper}>
          <TextInput
            editable
            multiline
            numberOfLines={4}
            // value={selectedEditTodo?.description}
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
            style={modalStyles.primaryBtn}
            onPress={() => {
              setShowTodoEditModal(false);
              if (selectedEditTodo) {
                // upadte existing todo
                updateTodo(selectedEditTodo, {
                  title: "updating",
                  description: "updating description",
                });
              } else {
                // save new todo
                addTodo({ title: "test12", description: "test12" });
              }
            }}
          >
            <Text.Bold style={modalStyles.primaryBtnText}>
              {selectedEditTodo ? "Update" : "Add"}
            </Text.Bold>
          </TouchableOpacity>
          <TouchableOpacity
            style={modalStyles.secondaryBtn}
            onPress={() => {
              setShowTodoEditModal(false);
            }}
          >
            <Text.Bold style={modalStyles.secondaryBtnText}>Cancel</Text.Bold>
          </TouchableOpacity>
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
    backgroundColor: "#548af0",
    borderRadius: 6,
  },
  secondaryBtnText: {
    fontSize: 20,
    color: "white",
  },
});
