import axios from "axios";
import base64 from "base-64";
import { useState } from "react";
import { Link, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, ToastAndroid, StyleSheet } from "react-native";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      ToastAndroid.show("Isi email dan password ❕", ToastAndroid.LONG);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        "https://siptatif-backend.vercel.app/api/auth/login",
        form
      );

      if (response.status === 200) {
        const data = response.data;
        const accessToken = data.data.accessToken;

        // Ekstrak nama pengguna dari payload token JWT
        const payloadBase64 = accessToken.split(".")[1];
        const payload = JSON.parse(base64.decode(payloadBase64));
        const nama = payload._doc.nama;
        const email = payload._doc.email;
        const nim = email.split("@")[0];

        // Save token, payload, nama, and NIM to SecureStore
        await SecureStore.setItemAsync("token", accessToken);
        await SecureStore.setItemAsync("nama", nama);
        await SecureStore.setItemAsync("nim", nim);

        // Tampilkan notifikasi berhasil
        ToastAndroid.show("Login berhasil ✅", ToastAndroid.LONG);

        setTimeout(() => {
          router.push("/beranda");
        }, 2000);
      }
    } catch (error) {
      ToastAndroid.show("Invalid email or password ❌", ToastAndroid.LONG);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>SIPTATIF</Text>
          <Text style={styles.subtitle}>Sign In</Text>
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
            title="Sign In"
            handlePress={handleLogin}
            containerStyles={styles.button}
            isLoading={isSubmitting}
          />
          <View style={styles.linkContainer}>
            <Text style={styles.link}>Don&apos;t have an account?</Text>
            <Link
              href="/sign-up"
              style={styles.sublink}
              accessibilityLabel="Sign Up Link"
            >
              Sign Up
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

export default SignIn;
