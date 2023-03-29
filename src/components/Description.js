// Import Libraries
import { useContext, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Context, useTodos } from "../contexts/AppContext";

export function TodoDescription(props) {
  const todoObject = JSON.parse(JSON.stringify(props.route.params.todo));

  const { setShowClearTodosBtn } = useContext(Context);
  const { setTodoDescription, todos } = useTodos();
  const [desc, setDesc] = useState(todoObject.description);
  const navigation = useNavigation();
  // console.log(todoObject.description);

  useEffect(() => {
    const unSubscribe = navigation.addListener("focus", () => {
      setShowClearTodosBtn(false);
    });
    return unSubscribe;
  }, [navigation]);
  // console.log(JSON.stringify(props.route.params.todo));
  return (
    <View style={desStyles.desContainer}>
      <Text.Bold style={desStyles.desTitle}>{todoObject.title}</Text.Bold>
      <View style={desStyles.desWrapper}>
        <TextInput
          value={desc}
          editable
          multiline
          numberOfLines={4}
          placeholder="Add Description"
          style={desStyles.desText}
          onChangeText={(value) => {
            setDesc(value);
          }}
        />
      </View>
      <TouchableOpacity
        style={desStyles.desAddBtnTouchableOp}
        onPress={() => {
          setTodoDescription(todoObject, desc);
        }}
      >
        <Text.Bold style={desStyles.desAddBtnText}>Add</Text.Bold>
      </TouchableOpacity>
    </View>
  );
}

const desStyles = StyleSheet.create({
  desContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
    padding: 12,
    margin: 12,
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
  desTitle: {
    fontSize: 32,
  },
  desWrapper: {
    marginTop: 16,
    height: 590,
  },
  desText: {
    fontSize: 20,
  },
  desAddBtnTouchableOp: {
    display: "flex",
    alignSelf: "flex-end",
    padding: 12,
    marginTop: 8,
    backgroundColor: "#548af0",
    borderRadius: 12,
  },
  desAddBtnText: {
    fontSize: 20,
    color: "white",
  },
});
