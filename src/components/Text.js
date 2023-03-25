import { Text } from "react-native";

function TextRegular(props) {
  const { style = {}, children } = props;
  return (
    <Text {...props} style={{ fontFamily: "sans", ...style }}>
      {children}
    </Text>
  );
}

function TextBold() {
  return <Text></Text>;
}

Text.Regular = TextRegular;
