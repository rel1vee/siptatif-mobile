import axios from "axios";
import { images } from "../../constants";
import { useState, useEffect } from "react";
import CustomBar from "../../components/CustomBar";
import CustomDropdown from "../../components/CustomDropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import PembimbingDropdown from "../../components/PembimbingDropdown";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  ToastAndroid,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ScrollView,
} from "react-native";
import * as SecureStore from "expo-secure-store";

interface PembimbingData {
  nama: string;
  nip: string;
  keahlian: string;
  kuota: number;
}

interface FormData {
  nama: string;
  nim: string;
  judul: string;
  kategori: string;
  pembimbing1: string;
  pembimbing2: string;
  file: string;
}

const Pendaftaran: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [pembimbing, setPembimbing] = useState<PembimbingData[]>([]);
  const [formData, setFormData] = useState<FormData>({
    nama: "",
    nim: "",
    judul: "",
    kategori: "",
    pembimbing1: "",
    pembimbing2: "",
    file: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const nim = await SecureStore.getItemAsync("nim");
      const nama = await SecureStore.getItemAsync("nama");
      setFormData((prevFormData) => ({
        ...prevFormData,
        nim: nim ?? "",
        nama: nama ?? "",
      }));
    };

    const fetchPembimbings = async () => {
      const token = await SecureStore.getItemAsync("token");
  
      try {
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
        console.error("Error fetching pembimbings:", error);
      }
    };

    fetchUserData();
    fetchPembimbings();
  }, []);

  const handleCreateModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async () => {
    if (
      !formData.nim ||
      !formData.nama ||
      !formData.judul ||
      !formData.kategori ||
      !formData.file ||
      !formData.pembimbing1
    ) {
      ToastAndroid.show("Pastikan setiap form diisi ❕", ToastAndroid.LONG);
      return;
    }

    const token = await SecureStore.getItemAsync("token");
    const nim = await SecureStore.getItemAsync("nim");
    const nama = await SecureStore.getItemAsync("nama");

    try {
      const formattedData = {
        nama: formData.nama,
        nim: formData.nim,
        judul: formData.judul,
        kategori: formData.kategori,
        pembimbing_1: formData.pembimbing1,
        pembimbing_2: formData.pembimbing2,
        file: formData.file,
      };

      await axios.post(
        "https://siptatif-backend.vercel.app/api/ta",
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Tampilkan notifikasi berhasil
      ToastAndroid.show("Pendaftaran berhasil ✅", ToastAndroid.LONG);

      // Reset form state after successful submission
      setFormData({
        nama: nama ?? "",
        nim: nim ?? "",
        judul: "",
        kategori: "",
        pembimbing1: "",
        pembimbing2: "",
        file: "",
      });

      setTimeout(() => {
        handleCloseModal();
      }, 1200);
    } catch (error) {
      ToastAndroid.show("Pendaftaran gagal ❌", ToastAndroid.LONG);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomBar />

      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={handleCreateModal} style={styles.addButton}>
          <Image source={images.add} style={styles.addButtonImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.centeredContainer}>
        <Text style={styles.instructionText}>
          Silakan ajukan pendaftaran TA dengan mengklik tombol + di pojok kanan
          bawah berikut.
        </Text>
      </View>

      {showModal && (
        <Modal
          visible={showModal}
          animationType="slide"
          onRequestClose={handleCloseModal}
        >
          <ScrollView>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Formulir Pendaftaran TA</Text>
              <Text style={styles.label}>NIM</Text>
              <TextInput
                value={formData.nim}
                onChangeText={(text) => handleInputChange("nim", text)}
                style={styles.input}
              />
              <Text style={styles.label}>Nama Mahasiswa</Text>
              <TextInput
                value={formData.nama}
                onChangeText={(text) => handleInputChange("nama", text)}
                style={styles.input}
              />
              <Text style={styles.label}>Judul Tugas Akhir</Text>
              <TextInput
                value={formData.judul}
                onChangeText={(text) => handleInputChange("judul", text)}
                style={styles.input}
              />
              <Text style={styles.label}>Kategori</Text>
              <View style={styles.dropdownContainer}>
                <CustomDropdown
                  items={[
                    { label: "Laporan", value: "Laporan" },
                    { label: "Paper Based", value: "Paper Based" },
                  ]}
                  selectedValue={formData.kategori}
                  onValueChange={(itemValue: string) =>
                    handleInputChange("kategori", itemValue)
                  }
                  placeholder="- Pilih Kategori -"
                />
              </View>
              <Text style={styles.label}>Pembimbing 1</Text>
              <View style={styles.dropdownContainer}>
                <PembimbingDropdown
                  pembimbings={pembimbing}
                  selectedValue={formData.pembimbing1}
                  onValueChange={(value: string) =>
                    handleInputChange("pembimbing1", value)
                  }
                  placeholder="- Pilih Pembimbing 1 -"
                />
              </View>
              <Text style={styles.label}>Pembimbing 2</Text>
              <View style={styles.dropdownContainer}>
                <PembimbingDropdown
                  pembimbings={pembimbing}
                  selectedValue={formData.pembimbing2}
                  onValueChange={(value: string) =>
                    handleInputChange("pembimbing2", value)
                  }
                  placeholder="- Pilih Pembimbing 2 -"
                />
              </View>
              <Text style={styles.label}>
                Link File (Google Drive, Dropbox, etc.)
              </Text>
              <TextInput
                value={formData.file}
                onChangeText={(text) => handleInputChange("file", text)}
                style={styles.input}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handleCloseModal}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.submitButton}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  } as ViewStyle,
  addButtonContainer: {
    position: "absolute",
    bottom: 32,
    right: 32,
  } as ViewStyle,
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    height: 64,
    backgroundColor: "#00BFFF",
    borderRadius: 16,
  } as ViewStyle,
  addButtonImage: {
    width: 32,
    height: 32,
    tintColor: "white",
  } as ImageStyle,
  centeredContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  instructionText: {
    paddingHorizontal: 24,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
  } as TextStyle,
  modalContainer: {
    flex: 1,
    padding: 20,
    marginTop: 4,
    backgroundColor: "white",
  } as ViewStyle,
  modalTitle: {
    marginBottom: 16,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Poppins-Bold",
  } as TextStyle,
  label: {
    color: "#6B7280",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  } as TextStyle,
  input: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 10,
  } as TextStyle,
  dropdownContainer: {
    marginBottom: 16,
  } as ViewStyle,
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  } as ViewStyle,
  cancelButton: {
    padding: 12,
    marginVertical: 16,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
  } as ViewStyle,
  cancelButtonText: {
    fontFamily: "Poppins-SemiBold",
  } as TextStyle,
  submitButton: {
    padding: 12,
    marginLeft: 12,
    borderRadius: 10,
    backgroundColor: "#00BFFF",
  } as ViewStyle,
  submitButtonText: {
    color: "white",
    fontFamily: "Poppins-SemiBold",
  } as TextStyle,
});

export default Pendaftaran;
