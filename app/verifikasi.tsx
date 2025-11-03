// Lokasi: app/verifikasi.tsx (SUDAH BERSIH)
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// --- 1. IMPORT SafeAreaView DARI LIBRARY YANG BENAR ---
import { SafeAreaView } from 'react-native-safe-area-context';

// --- 2. IMPORT ANIMASI (hanya yang diperlukan) ---
import Animated, {
  FadeIn,
} from 'react-native-reanimated';

// --- 3. IMPORT KOMPONEN HEADER KITA ---
import AuthHeader, {
  HEADER_HEIGHT_EXPANDED, // Konstanta (Untuk padding)
  useAnimatedAuthHeader, // Hook (Logika)
} from '@/components/AuthHeader'; // '@/' adalah shortcut ke root

// --- Warna (Sama) ---
const COLORS = {
  primary: '#053F5C',
  secondary: '#429EBD',
  white: '#FFFFFF',
};

// --- Ukuran Header (DIHAPUS, karena sudah di-import) ---
// const HEADER_HEIGHT_EXPANDED = 160; 
// ... (dan konstanta lainnya dihapus) ...

export default function VerifikasiScreen() {
  
  const [kode, setKode] = useState('');
  const { mode } = useLocalSearchParams();

  // --- 4. HAPUS SEMUA LOGIKA ANIMASI (WET) ---
  // const scrollY = useSharedValue(0);
  // const scrollHandler = ...
  // const headerAnimatedStyle = ...
  // const logoAnimatedStyle = ...
  
  // --- 5. PANGGIL HOOK ANIMASI KITA (DRY) ---
  const { scrollHandler, headerAnimatedStyle, logoAnimatedStyle } = useAnimatedAuthHeader();


  // --- Fungsi onVerifyPress (Tidak berubah) ---
  const onVerifyPress = () => {
    if (kode.length !== 6) {
      Alert.alert('Gagal 😥', 'Kode verifikasi harus 6 digit!');
      return;
    }
    console.log('Pura-pura verifikasi kode:', kode, 'untuk mode:', mode);
    
    if (mode === 'register') {
      Alert.alert('Berhasil! 🎉', 'Akun Anda telah terverifikasi. Silakan login.');
      router.replace('/login');
    } else if (mode === 'reset') {
      Alert.alert('Kode Benar!', 'Sekarang, silakan buat password baru Anda.');
      router.push('/password-reset'); // Arahkan ke halaman reset
    } else {
      Alert.alert('Error', 'Mode verifikasi tidak diketahui.');
      router.back();
    }
  };

  const onResendPress = () => {
    console.log('Pura-pura kirim ulang kode...');
    Alert.alert('Kode Terkirim', 'Kami telah mengirim ulang kode verifikasi.');
  };


  return (
    <SafeAreaView style={styles.safeArea}>
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
          onScroll={scrollHandler} // <-- Ini penting!
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled" 
        >
          <View style={styles.formContainer}>
            <Animated.View entering={FadeIn.duration(1000)}>
              
              <Text style={styles.title}>Verifikasi Akun Anda</Text>
              <Text style={styles.subtitle}>
                Kami telah mengirimkan 6 digit kode verifikasi ke Email/Nomor HP Anda.
              </Text>

              <TextInput 
                style={styles.inputKode} 
                placeholder="------"
                value={kode}
                onChangeText={setKode}
                keyboardType="number-pad"
                maxLength={6}
              />
              
              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Tidak menerima kode? </Text>
                <TouchableOpacity onPress={onResendPress}>
                  <Text style={styles.resendLink}>Kirim Ulang</Text>
                </TouchableOpacity>
              </View>


              <TouchableOpacity style={styles.button} onPress={onVerifyPress}>
                <Text style={styles.buttonText}>Verifikasi</Text>
              </TouchableOpacity>

            </Animated.View>
          </View>
        </Animated.ScrollView>
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- STYLESHEET (HEADER & LOGO HILANG) ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  // 'headerContainer' dan 'logo' DIHAPUS
  scrollContainer: {
    paddingTop: HEADER_HEIGHT_EXPANDED, // <-- Menggunakan konstanta import
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingBottom: 48, 
    flexGrow: 1,
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
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 48,
    lineHeight: 20,
  },
  inputKode: {
    height: 60,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.primary,
    letterSpacing: 10, 
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  resendText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  resendLink: {
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: '700',
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 53,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
  },
});