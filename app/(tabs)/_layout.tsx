import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";

interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[styles.icon, { tintColor: color }]}
      />
      <Text
        style={[
          styles.iconText,
          { color: color },
          focused ? styles.iconTextFocused : styles.iconTextRegular,
        ]}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout: React.FC = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#00BFFF",
        tabBarInactiveTintColor: "#DDDDDD",
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="beranda"
        options={{
          title: "Beranda",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="Beranda"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pendaftaran"
        options={{
          title: "Pendaftaran",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.plus}
              color={color}
              name="Pendaftaran"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pembimbing"
        options={{
          title: "Pembimbing",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              name="Pembimbing"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="status"
        options={{
          title: "Status",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.bookmark}
              color={color}
              name="Status"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  } as ViewStyle,
  icon: {
    width: 24,
    height: 24,
  } as ImageStyle,
  iconText: {
    fontSize: 12,
  } as TextStyle,
  iconTextFocused: {
    fontFamily: "Poppins-SemiBold",
  } as TextStyle,
  iconTextRegular: {
    fontFamily: "Poppins-Regular",
  } as TextStyle,
  tabBar: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "rgb(209 213 219)",
    height: 84,
  } as ViewStyle,
});

export default TabsLayout;
