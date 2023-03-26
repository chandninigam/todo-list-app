import { Text } from "react-native";

function TextRegular(props) {
  const { style = {}, children } = props;
  return (
    <Text {...props} style={{ fontFamily: "SourceSansRegular", ...style }}>
      {children}
    </Text>
  );
}

function TextMedium(props) {
  const { style = {}, children } = props;
  return (
    <Text {...props} style={{ fontFamily: "SourceSansMedium", ...style }}>
      {children}
    </Text>
  );
}

function TextBold(props) {
  const { style = {}, children } = props;
  return (
    <Text {...props} style={{ fontFamily: "SourceSansBold", ...style }}>
      {children}
    </Text>
  );
}

Text.Regular = TextRegular;
Text.Medium = TextMedium;
Text.Bold = TextBold;
