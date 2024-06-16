import { router } from "expo-router";
import { images } from "../../constants";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import CustomBar from "../../components/CustomBar";
import { View, Text, StyleSheet } from "react-native";
import CustomSection from "../../components/CustomSection";
import { SafeAreaView } from "react-native-safe-area-context";

const Beranda: React.FC = () => {
  const [nama, setNama] = useState("");

  useEffect(() => {
    const fetchNama = async () => {
      const storedNama = await SecureStore.getItemAsync("nama");
      setNama(storedNama ?? "");
    };

    fetchNama();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomBar />

      <View style={styles.greetingContainer}>
        <View style={styles.greetingRow}>
          <Text style={styles.greetingText}>Halo, </Text>
          <Text style={styles.greetingName}>{nama}</Text>
        </View>
        <Text style={styles.questionText}>Ingin melakukan apa hari ini?</Text>
      </View>

      <CustomSection
        icon={images.add}
        title="Pendaftaran TA"
        detail="Detail"
        handlePress={() => router.push("/pendaftaran")}
      />
      <CustomSection
        icon={images.user}
        title="Kuota Pembimbing"
        detail="Detail"
        handlePress={() => router.push("/pembimbing")}
      />
      <CustomSection
        icon={images.status}
        title="Status Pendaftaran"
        detail="Detail"
        handlePress={() => router.push("/status")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  greetingContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 8,
  },
  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  greetingText: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
  },
  greetingName: {
    fontSize: 18,
    color: "#00BFFF",
    fontFamily: "Poppins-SemiBold",
  },
  questionText: {
    fontSize: 18,
    color: "#CBD5E1",
    fontFamily: "Poppins-SemiBold",
  },
});

export default Beranda;
