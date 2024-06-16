import React from "react";
import { router } from "expo-router";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View, Image, StyleSheet } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>SIPTATIF</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>Let's Organize Easily</Text>
            <Image
              source={images.path}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={styles.description}>
              Sistem Informasi Pendaftaran Tugas Akhir
            </Text>
            <Text style={styles.subdescription}>
              Teknik Informatika - UIN Suska Riau
            </Text>
          </View>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles={styles.button}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    color: "#00BFFF",
    fontFamily: "Poppins-Bold",
  },
  subtitleContainer: {
    position: "relative",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 28,
    color: "#1E293B",
    fontFamily: "Poppins-SemiBold",
  },
  image: {
    width: 136,
    height: 15,
    position: "absolute",
    bottom: -16,
    right: -32,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#64748B",
    fontFamily: "Poppins-Regular",
    marginTop: 28,
  },
  subdescription: {
    fontSize: 14,
    textAlign: "center",
    color: "#64748B",
    fontFamily: "Poppins-Regular",
  },
  button: {
    width: "100%",
    marginTop: 28,
  },
});
