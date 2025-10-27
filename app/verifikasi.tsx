// Lokasi: app/verifikasi.tsx
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
// --- Impor Animasi (Sama persis seperti login/register) ---
import Animated, {
    FadeIn,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

// --- Warna (Sama) ---
const COLORS = {
  primary: '#053F5C',
  secondary: '#429EBD',
  white: '#FFFFFF',
};

// --- Ukuran Header (Sama) ---
// (Pastikan ini angka final dari file register.tsx kamu)
const HEADER_HEIGHT_EXPANDED = 160; 
const HEADER_HEIGHT_COLLAPSED = 80;
const LOGO_HEIGHT_EXPANDED = 150; 
const LOGO_HEIGHT_COLLAPSED = 75;

// --- INI KITA GANTI JADI VerifikasiScreen ---
export default function VerifikasiScreen() {
  
  // --- 1. STATE KITA GANTI (HANYA BUTUH KODE) ---
  const [kode, setKode] = useState('');
  const { mode } = useLocalSearchParams();

  // --- Animasi (Sama persis) ---
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(scrollY.value, [0, HEADER_HEIGHT_EXPANDED - HEADER_HEIGHT_COLLAPSED], [HEADER_HEIGHT_EXPANDED, HEADER_HEIGHT_COLLAPSED], 'clamp');
    return { height };
  });
  const logoAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(scrollY.value, [0, HEADER_HEIGHT_EXPANDED - HEADER_HEIGHT_COLLAPSED], [LOGO_HEIGHT_EXPANDED, LOGO_HEIGHT_COLLAPSED], 'clamp');
    const width = interpolate(scrollY.value, [0, HEADER_HEIGHT_EXPANDED - HEADER_HEIGHT_COLLAPSED], [LOGO_HEIGHT_EXPANDED, LOGO_HEIGHT_COLLAPSED], 'clamp');
    return { height, width };
  });
  // --- Akhir dari kode animasi ---


  // --- 2. KITA BUAT FUNGSI BARU 'onVerifyPress' ---
  const onVerifyPress = () => {
    // Validasi Sederhana (UI-Only)
    if (kode.length !== 6) {
      Alert.alert('Gagal 😥', 'Kode verifikasi harus 6 digit!');
      return;
    }

    console.log('Pura-pura verifikasi kode:', kode, 'untuk mode:', mode);
    
    // --- INI LOGIKA BARUNYA ---
    if (mode === 'register') {
      // Alur dari Register
      Alert.alert('Berhasil! 🎉', 'Akun Anda telah terverifikasi. Silakan login.');
      router.replace('/login');
    } else if (mode === 'reset') {
      // Alur dari Lupa Password (yang akan kita buat)
      Alert.alert('Kode Benar!', 'Sekarang, silakan buat password baru Anda.');
      router.push('/password-reset'); // Arahkan ke halaman reset
    } else {
      // Fallback jika mode-nya aneh
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
        {/* --- Header (Sama) --- */}
        <Animated.View style={[styles.headerContainer, headerAnimatedStyle]}>
          <Animated.Image
            source={require('../assets/images/logosiladan.png')}
            style={[styles.logo, logoAnimatedStyle]}
          />
        </Animated.View>

        {/* --- ScrollView (Sama) --- */}
        <Animated.ScrollView
          contentContainerStyle={styles.scrollContainer}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled" 
        >
          {/* --- 3. INI BAGIAN YANG KITA MODIFIKASI TOTAL --- */}
          <View style={styles.formContainer}>
            <Animated.View entering={FadeIn.duration(1000)}>
              
              {/* JUDUL (diganti) */}
              <Text style={styles.title}>Verifikasi Akun Anda</Text>
              <Text style={styles.subtitle}>
                Kami telah mengirimkan 6 digit kode verifikasi ke Email/Nomor HP Anda.
              </Text>

              {/* FORM INPUTS (diganti) */}
              {/* User request: 6 kotak.
                Ini adalah cara 'simple' membuatnya. Kita pakai 1 input
                tapi kita style agar terlihat seperti 6 kotak.
              */}
              <TextInput 
                style={styles.inputKode} 
                placeholder="------"
                value={kode}
                onChangeText={setKode}
                keyboardType="number-pad"
                maxLength={6}
              />
              
              {/* LINK KIRIM ULANG KODE */}
              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Tidak menerima kode? </Text>
                <TouchableOpacity onPress={onResendPress}>
                  <Text style={styles.resendLink}>Kirim Ulang</Text>
                </TouchableOpacity>
              </View>


              {/* TOMBOL (diganti) */}
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

// --- STYLESHEET (Banyak yang baru) ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  logo: {
    resizeMode: 'contain',
    marginTop: 30, // Margin statis dari kamu
  },
  scrollContainer: {
    paddingTop: HEADER_HEIGHT_EXPANDED,
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingBottom: 48, 
    flexGrow: 1, // Bikin form-nya 'penuh' ke bawah
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
    fontSize: 14, // Sedikit lebih besar dari subtitle lain
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 48, // Jarak lebih besar ke input
    lineHeight: 20, // Biar enak dibaca
  },

  // --- 4. STYLE BARU UNTUK INPUT KODE ---
  inputKode: {
    height: 60,
    backgroundColor: '#F0F0F0', // Latar abu-abu
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.primary,
    
    // Ini 'trik' agar terlihat seperti kotak terpisah
    letterSpacing: 10, 
  },
  
  // --- 5. STYLE BARU UNTUK LINK 'KIRIM ULANG' ---
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
    color: COLORS.secondary, // Warna beda biar jelas
    fontSize: 14,
    fontWeight: '700',
  },

  button: {
    backgroundColor: COLORS.primary,
    height: 53,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32, // Jarak dari link 'kirim ulang'
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
  },
});