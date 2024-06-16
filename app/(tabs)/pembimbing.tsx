import axios from "axios";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import CustomBar from "../../components/CustomBar";
import PembimbingCard from "../../components/PembimbingCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList, TextInput, ActivityIndicator, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface PembimbingData {
  nama: string;
  nip: string;
  keahlian: string;
  kuota: number;
}

const Pembimbing: React.FC = () => {
  const [pembimbing, setPembimbing] = useState<PembimbingData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchPembimbing = async () => {
    try {
      // Ambil token dari SecureStore
      const token = await SecureStore.getItemAsync("token");

      const response = await axios.get(
        "https://siptatif-backend.vercel.app/api/dosen",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPembimbing(response.data.data);
    } catch (error) {
      console.error("Error fetching pembimbing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPembimbing();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomBar />
      <TextInput
        placeholder="🔍 Cari pembimbing..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <FlatList
          data={pembimbing.filter(
            (pembimbing) =>
              pembimbing.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
              pembimbing.keahlian.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          renderItem={({ item }) => (
            <PembimbingCard
              nama={item.nama}
              nip={item.nip}
              keahlian={item.keahlian}
              status={`✔ Tersedia untuk ${item.kuota} mahasiswa`}
              statusColor="green"
            />
          )}
          keyExtractor={(item) => item.nip}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  } as ViewStyle,
  searchInput: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 16,
    marginHorizontal: 24,
    backgroundColor: 'white',
    borderColor: '#64748B',
    borderWidth: 1,
    borderRadius: 10,
  } as TextStyle,
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
});

export default Pembimbing;