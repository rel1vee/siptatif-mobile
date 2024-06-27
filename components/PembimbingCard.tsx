import { Text, View, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface PembimbingCardProps {
  nama: string;
  status: string;
  nip: string;
  keahlian: string;
  statusColor: string;
}

const PembimbingCard: React.FC<PembimbingCardProps> = ({
  nama,
  status,
  nip,
  keahlian,
  statusColor,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Nama</Text>
        <Text style={styles.value}>:   {nama}</Text>
      </View>
      <View style={[styles.row, styles.marginTop]}>
        <Text style={styles.label}>NIP</Text>
        <Text style={styles.value}>:   {nip}</Text>
      </View>
      <View style={[styles.row, styles.marginTop]}>
        <Text style={styles.label}>Keahlian</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.value}>
          :   {keahlian}
        </Text>
      </View>
      <View style={[styles.row, styles.marginTop, styles.justifyEnd]}>
        <Text style={[styles.status, { backgroundColor: statusColor }]}>
          {status}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 16,
    marginTop: 4,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: "#D1D5DB",
  } as ViewStyle,
  row: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  label: {
    width: 84,
    fontSize: 14,
    fontFamily: "Poppins-Bold",
  } as TextStyle,
  value: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  } as TextStyle,
  marginTop: {
    marginTop: 16,
  } as ViewStyle,
  justifyEnd: {
    justifyContent: "flex-end",
  } as ViewStyle,
  status: {
    fontSize: 12,
    color: "white",
    fontFamily: "Poppins-Medium",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  } as TextStyle,
});

export default PembimbingCard;
