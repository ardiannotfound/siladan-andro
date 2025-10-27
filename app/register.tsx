// Lokasi: app/register.tsx
import { Link, router } from 'expo-router';
import { useState } from 'react'; // <-- Hapus 'useRef'
import {
    Alert,
    KeyboardAvoidingView, // <-- 1. IMPORT KEMBALI
    Platform, // <-- 2. IMPORT KEMBALI
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
// --- Impor Animasi (Sama seperti login) ---
import Animated, {
    FadeIn,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

// --- Warna (Sama seperti login) ---
const COLORS = {
  primary: '#053F5C',
  secondary: '#429EBD',
  white: '#FFFFFF',
};

// --- Ukuran Header (Sesuai kode terakhirmu) ---
const HEADER_HEIGHT_EXPANDED = 160; 
const HEADER_HEIGHT_COLLAPSED = 80;
const LOGO_HEIGHT_EXPANDED = 150; 
const LOGO_HEIGHT_COLLAPSED = 75;

export default function RegisterScreen() {
  
  // --- State 9 variabel (Tidak berubah) ---
  const [namaLengkap, setNamaLengkap] = useState('');
  const [nik, setNik] = useState('');
  const [tglLahir, setTglLahir] = useState('');
  const [alamat, setAlamat] = useState('');
  const [noHp, setNoHp] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [konfirmasiPassword, setKonfirmasiPassword] = useState('');

  // --- 3. HAPUS SEMUA 'useRef' DAN 'scrollToBottom' ---
  // const scrollRef = useRef<Animated.ScrollView>(null);
  // const scrollToBottom = () => { ... };

  // --- Animasi (Sama seperti login) ---
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


  // --- Fungsi 'onRegisterPress' (Tidak berubah) ---
  const onRegisterPress = () => {
    if (!namaLengkap || !nik || !tglLahir || !alamat || !noHp || !email || !username || !password || !konfirmasiPassword) {
      Alert.alert('Gagal 😥', 'Semua kolom wajib diisi!');
      return;
    }
    if (password !== konfirmasiPassword) {
      Alert.alert('Gagal 😥', 'Password dan Konfirmasi Password tidak cocok!');
      return;
    }
    console.log('Pura-pura mendaftar...', { namaLengkap, nik, tglLahir, alamat, noHp, email, username });
    router.push('/verifikasi?mode=register');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* --- 4. BUNGKUS SEMUANYA DENGAN KEYBOARDAVOIDINGVIEW --- */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        style={{ flex: 1 }}
      >
        {/* --- Header (Sama seperti login) --- */}
        <Animated.View style={[styles.headerContainer, headerAnimatedStyle]}>
          <Animated.Image
            source={require('../assets/images/logosiladan.png')}
            style={[styles.logo, logoAnimatedStyle]}
          />
        </Animated.View>

        {/* --- 5. HAPUS 'ref' DARI SCROLLVIEW --- */}
        <Animated.ScrollView
          // ref={scrollRef} <-- HAPUS INI
          contentContainerStyle={styles.scrollContainer}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled" 
        >
          <View style={styles.formContainer}>
            <Animated.View entering={FadeIn.duration(1000)}>
              
              <Text style={styles.title}>Buat Akun Baru</Text>
              <Text style={styles.subtitle}>Silakan isi data diri Anda</Text>

              {/* --- 6. HAPUS SEMUA 'onFocus' DARI INPUT --- */}
              <View style={styles.form}>
                
                <Text style={styles.inputLabel}>Nama Lengkap</Text>
                <TextInput style={styles.input} placeholder="Masukkan Nama Lengkap" value={namaLengkap} onChangeText={setNamaLengkap} autoCapitalize="words" />

                <Text style={styles.inputLabel}>NIK</Text>
                <TextInput style={styles.input} placeholder="16 Digit NIK" value={nik} onChangeText={setNik} keyboardType="numeric" maxLength={16} />

                <Text style={styles.inputLabel}>Tanggal Lahir</Text>
                <TextInput style={styles.input} placeholder="DD/MM/YYYY" value={tglLahir} onChangeText={setTglLahir} keyboardType="numeric" />

                <Text style={styles.inputLabel}>Alamat</Text>
                <TextInput style={[styles.input, styles.inputMultiline]} placeholder="Masukkan Alamat Lengkap" value={alamat} onChangeText={setAlamat} multiline={true} numberOfLines={3} />

                <Text style={styles.inputLabel}>Nomor HP</Text>
                <TextInput style={styles.input} placeholder="Contoh: 08123456789" value={noHp} onChangeText={setNoHp} keyboardType="phone-pad" 
                  // onFocus={scrollToBottom} <-- HAPUS
                />

                <Text style={styles.inputLabel}>Email</Text>
                <TextInput style={styles.input} placeholder="Masukkan Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"
                  // onFocus={scrollToBottom} <-- HAPUS
                />

                <Text style={styles.inputLabel}>Username</Text>
                <TextInput style={styles.input} placeholder="Masukkan Username" value={username} onChangeText={setUsername} autoCapitalize="none"
                  // onFocus={scrollToBottom} <-- HAPUS
                />

                <Text style={styles.inputLabel}>Password</Text>
                <TextInput style={styles.input} placeholder="Buat Password Anda" value={password} onChangeText={setPassword} secureTextEntry 
                  // onFocus={scrollToBottom} <-- HAPUS
                />

                <Text style={styles.inputLabel}>Konfirmasi Password</Text>
                <TextInput style={styles.input} placeholder="Ketik ulang Password Anda" value={konfirmasiPassword} onChangeText={setKonfirmasiPassword} secureTextEntry 
                  // onFocus={scrollToBottom} <-- HAPUS
                />
              </View>

              {/* TOMBOL LOGIN (diganti) */}
              <TouchableOpacity style={styles.button} onPress={onRegisterPress}>
                <Text style={styles.buttonText}>Buat Akun</Text>
              </TouchableOpacity>

              {/* LINK KE REGISTER (diganti) */}
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Sudah punya akun? </Text>
                <Link href="/login" asChild>
                  <TouchableOpacity>
                    <Text style={styles.registerLink}>Login</Text>
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

// --- STYLESHEET (Tidak berubah) ---
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
  inputMultiline: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 8,
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 53,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16, 
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