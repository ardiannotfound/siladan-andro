// Lokasi: app/login.tsx
import { Link } from 'expo-router';
import { useState } from 'react';
import {
    // KeyboardAvoidingView & Platform DIHAPUS (Fix Bug #2)
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
// --- 1. IMPORT KOMPONEN ANIMASI (Tidak berubah) ---
import Animated, {
    FadeIn,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

// --- Kita definisikan warnanya ---
const COLORS = {
  primary: '#053F5C',
  secondary: '#429EBD',
  white: '#FFFFFF',
};

// --- 2. TENTUKAN UKURAN HEADER KITA (Fix Poin #1) ---
const HEADER_HEIGHT_EXPANDED = 160; // DIKECILKAN (dari 250)
const HEADER_HEIGHT_COLLAPSED = 80;

const LOGO_HEIGHT_EXPANDED = 150; // DIKECILKAN (dari 180)
const LOGO_HEIGHT_COLLAPSED = 75;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT_EXPANDED - HEADER_HEIGHT_COLLAPSED],
      [HEADER_HEIGHT_EXPANDED, HEADER_HEIGHT_COLLAPSED],
      'clamp'
    );
    return { height };
  });

  // --- 6. BUAT STYLE ANIMASI UNTUK LOGO (Fix Poin #3) ---
  const logoAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT_EXPANDED - HEADER_HEIGHT_COLLAPSED],
      [LOGO_HEIGHT_EXPANDED, LOGO_HEIGHT_COLLAPSED],
      'clamp'
    );
    const width = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT_EXPANDED - HEADER_HEIGHT_COLLAPSED],
      [LOGO_HEIGHT_EXPANDED, LOGO_HEIGHT_COLLAPSED],
      'clamp'
    );
    
    // const opacity = ... (BAGIAN INI DIHAPUS TOTAL)

    return { height, width }; // <-- Kembalikan height & width saja
  });

  const onLoginPress = () => {
    console.log('Login Ditekan!', { email, username, password });
  };

  return (
    // KeyboardAvoidingView DIHAPUS DARI SINI
    <SafeAreaView style={styles.safeArea}>
      
      {/* --- 7. HEADER ANIMASI KITA --- */}
      <Animated.View style={[styles.headerContainer, headerAnimatedStyle]}>
        <Animated.Image
          source={require('../assets/images/logosiladan.png')}
          style={[styles.logo, logoAnimatedStyle]}
        />
      </Animated.View>

      {/* --- 8. SCROLLVIEW KITA --- */}
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContainer}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        // Properti ini akan otomatis menutup keyboard saat user mulai scroll
        keyboardShouldPersistTaps="handled" 
      >
        {/* --- 9. KITA BUNGKUS FORM DENGAN CONTAINER BARU --- */}
        <View style={styles.formContainer}>
          <Animated.View entering={FadeIn.duration(1000)}>
            {/* JUDUL */}
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>Silahkan masuk untuk melanjutkan</Text>

            {/* FORM INPUTS */}
            <View style={styles.form}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Masukkan Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Masukkan Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Masukkan Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry 
              />
            </View>

            {/* LUPA & UBAH PASSWORD (sejajar) */}
            <View style={styles.forgotContainer}>
              <Link href="/password-lupa" asChild>
                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Lupa Password?</Text>
                </TouchableOpacity>
              </Link>
              <Link href="/register" asChild>
                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Ubah Password</Text>
                </TouchableOpacity>
              </Link>
            </View>

            {/* TOMBOL LOGIN */}
            <TouchableOpacity style={styles.button} onPress={onLoginPress}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* LINK KE REGISTER */}
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
    </SafeAreaView>
    // KeyboardAvoidingView DIHAPUS DARI SINI
  );
}

// --- STYLESHEET (REVISI BESAR) ---
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
    marginTop: 30,
    },
  scrollContainer: {
    // Sesuaikan padding atas dengan tinggi header baru (Fix Poin #1)
    paddingTop: HEADER_HEIGHT_EXPANDED,
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingBottom: 48, // Jarak aman dari tombol home
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
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
    fontSize: 16,
    marginBottom: 24,
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