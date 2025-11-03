// Lokasi: app/login.tsx (SUDAH BERSIH & DIPERBAIKI)
import { Link } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
// --- 1. IMPORT SafeAreaView DARI LIBRARY YANG BENAR ---
import { SafeAreaView } from 'react-native-safe-area-context';

import Animated, { FadeIn } from 'react-native-reanimated';

// --- 2. IMPORT KOMPONEN HEADER KITA ---
import AuthHeader, {
  HEADER_HEIGHT_EXPANDED, // Komponen (Tampilan)
  useAnimatedAuthHeader, // Hook (Logika)
} from '@/components/AuthHeader'; // '@/' adalah shortcut ke root

// --- 3. KONSTANTA LOKAL (YANG MASIH DIPERLUKAN) ---
const COLORS = {
  primary: '#053F5C',
  secondary: '#429EBD',
  white: '#FFFFFF',
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // --- 4. PANGGIL HOOK ANIMASI KITA ---
  const { scrollHandler, headerAnimatedStyle, logoAnimatedStyle } = useAnimatedAuthHeader();
  
  const onLoginPress = () => {
    console.log('Login Ditekan!', { email, username, password });
    // Nanti di Fase 2 kita akan tambahkan:
    // setUserLoggedIn(true);
    // router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* --- 5. TAMBAHKAN KEYBOARD AVOIDING VIEW --- */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        style={{ flex: 1 }}
      >
        {/* --- 6. PANGGIL KOMPONEN HEADER KITA --- */}
        <AuthHeader 
          headerAnimatedStyle={headerAnimatedStyle}
          logoAnimatedStyle={logoAnimatedStyle}
        />

        {/* --- 7. HUBUNGKAN SCROLLVIEW KE 'SENSOR' --- */}
        <Animated.ScrollView
          contentContainerStyle={styles.scrollContainer}
          onScroll={scrollHandler} 
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled" 
        >
          <View style={styles.formContainer}>
            <Animated.View entering={FadeIn.duration(1000)}>
              <Text style={styles.title}>Login</Text>
              <Text style={styles.subtitle}>Silahkan masuk untuk melanjutkan</Text>

              <View style={styles.form}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput style={styles.input} placeholder="Masukkan Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput style={styles.input} placeholder="Masukkan Username" value={username} onChangeText={setUsername} autoCapitalize="none"/>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput style={styles.input} placeholder="Masukkan Password" value={password} onChangeText={setPassword} secureTextEntry/>
              </View>

              <View style={styles.forgotContainer}>
                <Link href="/password-lupa" asChild>
                  <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Lupa Password?</Text>
                  </TouchableOpacity>
                </Link>
                {/* --- 8. LINK "UBAH PASSWORD" DIPERBAIKI --- */}
                <Link href="/password-lupa" asChild> 
                  <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Ubah Password</Text>
                  </TouchableOpacity>
                </Link>
              </View>

              <TouchableOpacity style={styles.button} onPress={onLoginPress}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Belum punya akun? </Text>
                <Link href="/register" asChild>
                  <TouchableOpacity>
                    <Text style={styles.registerLink}>Daftar</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </Animated.View>
          </View>
        </Animated.ScrollView>
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- STYLESHEET (HEADER & LOGO HILANG, INPUT DIPERBAIKI) ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    paddingTop: HEADER_HEIGHT_EXPANDED, // <-- Menggunakan konstanta import
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingBottom: 48,
  },
  title: {
    color: COLORS.primary,
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 24,
  },
  subtitle: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 32,
  },
  form: {},
  inputLabel: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  // --- 9. PERBAIKAN STYLE INPUT (TIDAK KEPOTONG) ---
  input: {
    height: 50, // <-- Diperbesar dari 40
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
    fontSize: 16,
    marginBottom: 24,
    paddingHorizontal: 2, 
    paddingVertical: 10,  // <-- Padding vertikal agar teks tidak kepotong
  },
  forgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  forgotPassword: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: '600',
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 53,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  registerLink: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
});