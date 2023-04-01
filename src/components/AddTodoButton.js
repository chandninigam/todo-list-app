// Import Libraries
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign as AntDesignIcon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Context, useTodos } from "../contexts/AppContext";

export function AddTodoButton() {
  const navigate = useNavigation();
  const { setShowTodoEditModal } = useTodos();

  return (
    <View style={styles.addTodoBtnWrapper}>
      <TouchableOpacity
        style={styles.addTodoBtn}
        onPress={() => {
          // navigate.navigate("TodoEditScreen");
          setShowTodoEditModal(true);
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
  addTodoBtnWrapper: {
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
    borderRadius: 32,
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
