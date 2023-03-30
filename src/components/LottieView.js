// Import Libraries
import { Text, View, StyleSheet } from "react-native";
import Lottie from "lottie-react-native";

export default function LottieView({ path, title }) {
  return (
    <View style={styles.lottieViewWrapper}>
      <Lottie autoPlay style={styles.lottieViewAnimation} source={path} />
      <Text.Bold style={styles.lottieViewTitle}>{title}</Text.Bold>
    </View>
  );
}

const styles = StyleSheet.create({
  lottieViewWrapper: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 64,
  },
  lottieViewAnimation: {
    height: 350,
    width: 350,
  },
  lottieViewTitle: {
    flex: 0.4,
    fontSize: 32,
    color: "#a8a7a5",
  },
});
