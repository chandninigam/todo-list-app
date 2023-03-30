// Import Libraries
import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { AntDesign as AntDesignIcon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// Import Custom Hook
import { useTodos } from "../contexts/AppContext";

const { height } = Dimensions.get("window");

export function AddTodoInputBtn() {
  const navigate = useNavigation();

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.addTodoBtn}
        onPress={() => {
          navigate.navigate("TodoEditScreen");
        }}
      >
        <AntDesignIcon
          name="plus"
          size={32}
          style={styles.addIcon}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 12,
    marginBottom: 16,
    justifyContent: "flex-end",
  },
  addTodoBtn: {
    flex: 0.1,
    backgroundColor: "#548af0",
    marginHorizontal: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: height / 24,
    shadowColor: "#548af",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
});
