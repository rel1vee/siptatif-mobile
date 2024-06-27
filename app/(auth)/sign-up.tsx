import axios from "axios";
import { useState } from "react";
import { Link, router } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, ToastAndroid, StyleSheet } from "react-native";

const SignUp = () => {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const handleRegister = async () => {
    if (!form.nama || !form.email || !form.password) {
      ToastAndroid.show("Pastikan setiap form diisi ❕", ToastAndroid.LONG);
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@students\.uin-suska\.ac\.id$/;
    if (!emailPattern.test(form.email)) {
      ToastAndroid.show(
        "Required @students.uin-suska.ac.id ❗",
        ToastAndroid.LONG
      );
      return;
    }

    try {
      setSubmitting(true);
      await axios.post(
        "https://siptatif-backend.vercel.app/api/auth/register",
        form
      );

      ToastAndroid.show("Akun berhasil dibuat ✅", ToastAndroid.LONG);

      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);
    } catch (error) {
      ToastAndroid.show("Maaf, email telah terdaftar ❗", ToastAndroid.LONG);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>SIPTATIF</Text>
          <Text style={styles.subtitle}>Sign Up</Text>
          <FormField
            title="Nama"
            value={form.nama}
            handleChangeText={(e: any) => setForm({ ...form, nama: e })}
            otherStyles={styles.formField}
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            otherStyles={styles.formField}
            keyboardType="email-address"
            placeholder="example@students.uin-suska.ac.id"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyles={styles.formField}
          />
          <CustomButton
            title="Sign Up"
            handlePress={handleRegister}
            containerStyles={styles.button}
            isLoading={isSubmitting}
          />
          <View style={styles.linkContainer}>
            <Text style={styles.link}>Have an account already?</Text>
            <Link
              href="/sign-in"
              style={styles.sublink}
              accessibilityLabel="Sign In Link"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 24,
    marginTop: 36,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    color: "#00BFFF",
    fontFamily: "Poppins-Bold",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 14,
    fontFamily: "Poppins-SemiBold",
  },
  formField: {
    marginTop: 20,
  },
  button: {
    marginTop: 20,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingTop: 20,
  },
  link: {
    fontSize: 16,
    color: "#b6b6b6",
    fontFamily: "Poppins-Regular",
  },
  sublink: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#00BFFF",
    fontFamily: "Poppins-SemiBold",
  },
});

export default SignUp;
