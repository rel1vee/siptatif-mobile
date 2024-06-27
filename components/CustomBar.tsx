import { useState } from "react";
import { router } from "expo-router";
import { images } from "../constants";
import * as SecureStore from "expo-secure-store";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";

const CustomBar: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const toggleModal = () => {
    setVisible(!visible);
  };

  const handleLogout = async () => {
    try {
      // Hapus semua item dari SecureStore
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("nama");
      await SecureStore.deleteItemAsync("nim");
    } catch (error) {
      console.error("Error deleting secure store items:", error);
    } finally {
      // Alihkan pengguna ke halaman sign-in
      router.push("/sign-in");
    }
  };

  const handleCancel = () => {
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIPTATIF</Text>

      <TouchableOpacity onPress={toggleModal}>
        <Image source={images.profile} style={styles.avatar} />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        onRequestClose={toggleModal}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.logoutText}>Keluar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
  } as ViewStyle,
  title: {
    fontSize: 24,
    color: "#00BFFF",
    fontFamily: "Poppins-Bold",
  } as TextStyle,
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  } as ImageStyle,
  modalOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  } as ViewStyle,
  modalContent: {
    width: "80%",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 10,
  } as ViewStyle,
  logoutText: {
    paddingVertical: 8,
    fontSize: 16,
    textAlign: "center",
    color: "#EF4444",
  } as TextStyle,
  cancelText: {
    paddingVertical: 8,
    fontSize: 16,
    textAlign: "center",
  } as TextStyle,
});

export default CustomBar;
