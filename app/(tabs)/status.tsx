import axios from "axios";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import CustomBar from "../../components/CustomBar";
import StatusCard from "../../components/StatusCard";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  View,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface StatusData {
  kode: string;
  createdAt: string;
  status: string;
  judul: string;
  nama: string;
  nim: string;
  kategori: string;
  pembimbing_1: string;
  pembimbing_2: string;
  file: string;
  penguji_1?: string;
  penguji_2?: string;
  keterangan?: string;
}

const Status: React.FC = () => {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<StatusData[]>([]);

  const fetchStatus = async () => {
    try {
      // Ambil token dan nim dari SecureStore
      const token = await SecureStore.getItemAsync("token");
      const nim = await SecureStore.getItemAsync("nim");

      if (nim) {
        // Menggunakan NIM untuk mengambil data dari REST API
        const response = await axios.get(
          `https://siptatif-backend.vercel.app/api/ta/${nim}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStatus(response.data.data);
      } else {
        console.error("NIM tidak ditemukan di SecureStore");
      }
    } catch (error) {
      console.error("Error fetching status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [isFocused]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomBar />

      <ScrollView>
        <View style={styles.spacer} />
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          status.map((item) => (
            <StatusCard
              key={item.kode}
              date={formatDate(item.createdAt)}
              status={item.status}
              statusColor={
                item.status === "Disetujui"
                  ? "green"
                  : item.status === "Ditolak"
                  ? "red"
                  : "orange"
              } // Ubah warna berdasarkan status
              title={item.judul}
              bgColor={
                item.status === "Disetujui"
                  ? "rgb(187 247 208)"
                  : item.status === "Ditolak"
                  ? "rgb(254 202 202)"
                  : "#FFffaa"
              } // Ubah warna latar belakang berdasarkan status
              data={item} // Passing seluruh data item ke StatusCard
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  } as ViewStyle,
  spacer: {
    height: 20,
  } as ViewStyle,
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
});

export default Status;
