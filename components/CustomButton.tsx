import {
  Text,
  TextStyle,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

interface CustomButtonProps {
  title: string;
  isLoading?: boolean;
  handlePress: () => void;
  textStyles?: TextStyle | TextStyle[];
  containerStyles?: ViewStyle | ViewStyle[];
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  isLoading = false,
  handlePress,
  textStyles,
  containerStyles,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.button,
        containerStyles,
        isLoading && styles.buttonDisabled,
      ]}
      disabled={isLoading}
    >
      <Text style={[styles.text, textStyles]}>{title}</Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          style={styles.indicator}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#00BFFF",
    borderRadius: 10,
    minHeight: 56,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    color: "white",
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
  },
  indicator: {
    marginLeft: 8,
  },
});

export default CustomButton;
