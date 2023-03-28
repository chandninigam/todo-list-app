import { Text, View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export default function EmptyList({ path, title }) {
  return (
    <View style={styles.emptyWrapper}>
      <LottieView autoPlay style={styles.emptyLottieAnimation} source={path} />
      <Text.Bold style={styles.emptyText}>{title}</Text.Bold>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyWrapper: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 64,
  },
  emptyLottieAnimation: {
    height: 350,
    width: 350,
  },
  emptyText: {
    flex: 0.4,
    fontSize: 32,
    color: "#a8a7a5",
  },
});
