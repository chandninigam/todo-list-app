// Import Libraries
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

function Description() {
  return (
    <View style={desStyles.desContainer}>
      <Text.Bold style={desStyles.desTitle}>Title</Text.Bold>
      <View style={desStyles.desWrapper}>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          placeholder="Add Description"
          style={desStyles.desText}
        />
      </View>
      <TouchableOpacity style={desStyles.desAddBtnTouchableOp}>
        <Text.Bold style={desStyles.desAddBtnText}>Add</Text.Bold>
      </TouchableOpacity>
    </View>
  );
}

const desStyles = StyleSheet.create({
  desContainer: {
    display: "flex",
    backgroundColor: "white",
    padding: 24,
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
  desTitle: {
    fontSize: 32,
  },
  desWrapper: {
    marginTop: 16,
    height: 500,
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
