import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageSourcePropType,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";

interface CustomSectionProps {
  icon: ImageSourcePropType;
  title: string;
  detail: string;
  handlePress: (event: GestureResponderEvent) => void;
}

const CustomSection: React.FC<CustomSectionProps> = ({
  icon,
  title,
  detail,
  handlePress,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.touchable}
    >
      <View style={styles.container}>
        <View style={styles.iconTitleContainer}>
          <Image source={icon} style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.detail}>
          {detail}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    marginHorizontal: 24,
    marginVertical: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: '#D1D5DB',
  } as ViewStyle,
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,
  iconTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  } as ImageStyle,
  title: {
    fontSize: 16,
    fontWeight: '600',
  } as TextStyle,
  detail: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    color: '#00AFFF',
    backgroundColor: '#ECFEFF',
    fontWeight: '700',
  } as TextStyle,
});

export default CustomSection;