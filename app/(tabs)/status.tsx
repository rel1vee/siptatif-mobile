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
  Alert,
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

  useEffect(() => {
    const fetchStatus = async () => {
      const nim = await SecureStore.getItemAsync("nim");
      const token = await SecureStore.getItemAsync("token");

      try {
        if (nim) {
          const response = await axios.get(
            `https://siptatif-backend.vercel.app/api/ta/${nim}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setStatus(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, [isFocused]);

  const handleDelete = async (kode: string) => {
    const token = await SecureStore.getItemAsync("token");
    
    try {
      await axios.delete(`https://siptatif-backend.vercel.app/api/ta/${kode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // After successful deletion, update the local state
      setStatus((prevStatus) =>
        prevStatus.filter((item) => item.kode !== kode)
      );
    } catch (error) {
      Alert.alert("Error ‼", "Failed to delete item. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
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
              }
              title={item.judul}
              category={item.kategori}
              bgColor={
                item.status === "Disetujui"
                  ? "rgb(187 247 208)"
                  : item.status === "Ditolak"
                  ? "rgb(254 202 202)"
                  : "#FFffaa"
              }
              data={item}
              onDelete={handleDelete}
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
