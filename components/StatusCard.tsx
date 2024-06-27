import { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Linking,
  Alert,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Animated } from "react-native";

interface StatusCardProps {
  date: string;
  status: string;
  title: string;
  category: string;
  statusColor: string;
  bgColor: string;
  data: {
    kode: string;
    nama: string;
    nim: string;
    judul: string;
    kategori: string;
    pembimbing_1: string;
    pembimbing_2: string;
    file: string;
    penguji_1?: string;
    penguji_2?: string;
    keterangan?: string;
  };
  onDelete: (kode: string) => void;
}

const StatusCard: React.FC<StatusCardProps> = ({
  date,
  status,
  title,
  category,
  statusColor,
  bgColor,
  data,
  onDelete,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleViewPress = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePress = () => {
    Linking.openURL(data.file);
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <RectButton style={styles.deleteButton} onPress={handleDelete}>
        <Animated.Text
          style={[
            styles.deleteButtonText,
            { transform: [{ translateX: trans }] },
          ]}
        >
          Delete
        </Animated.Text>
      </RectButton>
    );
  };

  const handleDelete = () => {
    Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => onDelete(data.kode),
      },
    ]);
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={[styles.card, { backgroundColor: bgColor }]}>
        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <Text style={[styles.statusText, { backgroundColor: statusColor }]}>
              {status}
            </Text>
          </View>
          <TouchableOpacity onPress={handleViewPress}>
            <View style={styles.viewButton}>
              <Text style={styles.viewButtonText}>👁‍🗨 View</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.row, styles.marginTop]}>
          <Text style={styles.label}>◽ Tanggal</Text>
          <Text style={styles.sign}> : </Text>
          <Text style={styles.value}>{date}</Text>
        </View>
        <View style={[styles.row, styles.marginTop]}>
          <Text style={styles.label}>◽ Judul TA</Text>
          <Text style={styles.sign}> : </Text>
          <Text numberOfLines={3} ellipsizeMode="tail" style={styles.title}>
            {title}
          </Text>
        </View>
        <View style={[styles.row, styles.marginTop]}>
          <Text style={styles.label}>◽ Kategori</Text>
          <Text style={styles.sign}> : </Text>
          <Text style={styles.value}>{category}</Text>
        </View>

        <Modal
          visible={showModal}
          animationType="slide"
          onRequestClose={handleCloseModal}
        >
          <ScrollView>
            <View style={styles.modalContent}>
              {status === "Disetujui" ? (
                <View>
                  <View style={styles.approvedContainer}>
                    <Text style={styles.approvedText}>
                      Pendaftaran Anda Diterima
                    </Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Nama</Text>
                    <Text style={styles.infoValue}>{data.nama}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>NIM</Text>
                    <Text style={styles.infoValue}>{data.nim}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Judul Tugas Akhir</Text>
                    <Text style={styles.infoValue}>{data.judul}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Kategori</Text>
                    <Text style={styles.infoValue}>{data.kategori}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Pembimbing 1</Text>
                    <Text style={styles.infoValue}>{data.pembimbing_1}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Pembimbing 2</Text>
                    <Text style={styles.infoValue}>{data.pembimbing_2}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Berkas</Text>
                    <TouchableOpacity onPress={handlePress}>
                      <Text style={styles.infoValueFile}>{data.file}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Penguji 1</Text>
                    <Text style={styles.infoValue}>{data.penguji_1}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Penguji 2</Text>
                    <Text style={styles.infoValue}>{data.penguji_2}</Text>
                  </View>
                </View>
              ) : status === "Ditolak" ? (
                <View>
                  <View style={styles.rejectedContainer}>
                    <Text style={styles.rejectedText}>
                      Pendaftaran Anda Ditolak
                    </Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Nama</Text>
                    <Text style={styles.infoValue}>{data.nama}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>NIM</Text>
                    <Text style={styles.infoValue}>{data.nim}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Judul Tugas Akhir</Text>
                    <Text style={styles.infoValue}>{data.judul}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Kategori</Text>
                    <Text style={styles.infoValue}>{data.kategori}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Pembimbing 1</Text>
                    <Text style={styles.infoValue}>{data.pembimbing_1}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Pembimbing 2</Text>
                    <Text style={styles.infoValue}>{data.pembimbing_2}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Berkas</Text>
                    <TouchableOpacity onPress={handlePress}>
                      <Text style={styles.infoValueFile}>{data.file}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.noteContainer}>
                    <Text style={styles.noteLabel}>Catatan</Text>
                    <Text style={styles.noteValue}>{data.keterangan}</Text>
                  </View>
                  <Text style={styles.rejectionMessage}>
                    Maaf, Pendaftaran Anda tidak memenuhi syarat. Silakan
                    mengajukan pendaftaran kembali.
                  </Text>
                </View>
              ) : (
                <View>
                  <View style={styles.processingContainer}>
                    <Text style={styles.processingText}>
                      Pendaftaran Sedang Diproses
                    </Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Nama</Text>
                    <Text style={styles.infoValue}>{data.nama}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>NIM</Text>
                    <Text style={styles.infoValue}>{data.nim}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Judul Tugas Akhir</Text>
                    <Text style={styles.infoValue}>{data.judul}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Kategori</Text>
                    <Text style={styles.infoValue}>{data.kategori}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Pembimbing 1</Text>
                    <Text style={styles.infoValue}>{data.pembimbing_1}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Pembimbing 2</Text>
                    <Text style={styles.infoValue}>{data.pembimbing_2}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Berkas</Text>
                    <TouchableOpacity onPress={handlePress}>
                      <Text style={styles.infoValueFile}>{data.file}</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.processingMessage}>
                    Berkas Pendaftaran Anda sedang diverifikasi oleh Koordinator
                    TA.
                  </Text>
                </View>
              )}
              <TouchableOpacity
                onPress={handleCloseModal}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  } as ViewStyle,
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  } as ViewStyle,
  row: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  statusText: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  } as TextStyle,
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: "#000",
  } as ViewStyle,
  viewButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  } as TextStyle,
  marginTop: {
    marginTop: 16,
  } as ViewStyle,
  label: {
    fontSize: 12,
    fontWeight: "600",
    width: 74,
  } as TextStyle,
  sign: {
    fontSize: 12,
    fontWeight: "600",
  } as TextStyle,
  value: {
    fontSize: 12,
    fontWeight: "300",
    marginLeft: 8,
  } as TextStyle,
  title: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12,
    fontWeight: "300",
  } as TextStyle,
  modalContent: {
    flex: 1,
    padding: 24,
    backgroundColor: "white",
  } as ViewStyle,
  approvedContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    backgroundColor: "rgb(187 247 208)",
    borderRadius: 10,
  } as ViewStyle,
  approvedText: {
    fontSize: 18,
    color: "green",
    fontWeight: "700",
  } as TextStyle,
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#fff",
  } as ViewStyle,
  infoLabel: {
    width: "100%",
    padding: 4,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
    backgroundColor: "#F1F5F9",
  } as TextStyle,
  infoValue: {
    padding: 4,
    marginTop: 4,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "300",
  } as TextStyle,
  infoValueFile: {
    padding: 4,
    marginTop: 4,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "300",
    color: "blue",
    textDecorationLine: "underline",
  } as TextStyle,
  rejectedContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    backgroundColor: "rgb(254 202 202)",
    borderRadius: 8,
  } as ViewStyle,
  rejectedText: {
    fontSize: 18,
    color: "#red",
    fontWeight: "700",
  } as TextStyle,
  noteContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgb(254 202 202)",
  } as ViewStyle,
  noteLabel: {
    width: "100%",
    padding: 4,
    fontSize: 16,
    textAlign: "center",
    color: "red",
    backgroundColor: "rgb(254 202 202)",
    fontWeight: "500",
  } as TextStyle,
  noteValue: {
    padding: 4,
    marginTop: 4,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "300",
  } as TextStyle,
  rejectionMessage: {
    marginTop: 24,
    marginBottom: 16,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "300",
  } as TextStyle,
  processingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    backgroundColor: "#FFffaa",
    borderRadius: 8,
  } as ViewStyle,
  processingText: {
    fontSize: 18,
    color: "orange",
    fontWeight: "700",
  } as TextStyle,
  processingMessage: {
    marginTop: 24,
    marginBottom: 16,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "300",
  } as TextStyle,
  closeButton: {
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#000",
  } as ViewStyle,
  closeButtonText: {
    color: "white",
    fontWeight: "600",
  } as TextStyle,
  deleteButton: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: "88%",
  } as ViewStyle,
  deleteButtonText: {
    color: "red",
    fontWeight: "bold",
    paddingRight: 16,
  } as TextStyle,
});

export default StatusCard;
