// Lokasi: app/password-lupa.tsx
import { router } from 'expo-router';
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
import Animated, {
    FadeIn,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

// --- (Semua konstanta header & warna SAMA PERSIS seperti file lain) ---
const COLORS = { primary: '#053F5C', secondary: '#429EBD', white: '#FFFFFF' };
const HEADER_HEIGHT_EXPANDED = 160; 
const HEADER_HEIGHT_COLLAPSED = 80;
const LOGO_HEIGHT_EXPANDED = 150; 
const LOGO_HEIGHT_COLLAPSED = 75;

export default function LupaPasswordScreen() { // <-- Nama fungsi diubah
  const [email, setEmail] = useState(''); // <-- State diganti jadi email

  // --- (Semua kode animasi SAMA PERSIS) ---
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => { scrollY.value = event.contentOffset.y; });
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(scrollY.value, [0, HEADER_HEIGHT_EXPANDED - HEADER_HEIGHT_COLLAPSED], [HEADER_HEIGHT_EXPANDED, HEADER_HEIGHT_COLLAPSED], 'clamp');
    return { height };
  });
  const logoAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(scrollY.value, [0, HEADER_HEIGHT_EXPANDED - HEADER_HEIGHT_COLLAPSED], [LOGO_HEIGHT_EXPANDED, LOGO_HEIGHT_COLLAPSED], 'clamp');
    const width = interpolate(scrollY.value, [0, HEADER_HEIGHT_EXPANDED - HEADER_HEIGHT_COLLAPSED], [LOGO_HEIGHT_EXPANDED, LOGO_HEIGHT_COLLAPSED], 'clamp');
    return { height, width };
  });
  // --- Akhir kode animasi ---

  const onKirimKodePress = () => { // <-- Nama fungsi diubah
    if (!email) {
      Alert.alert('Gagal 😥', 'Email tidak boleh kosong.');
      return;
    }
    console.log('Pura-pura kirim kode reset ke:', email);
    // Pindahkan ke verifikasi DENGAN MODE 'RESET'
    router.push('/verifikasi?mode=reset');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        style={{ flex: 1 }}
      >
        <Animated.View style={[styles.headerContainer, headerAnimatedStyle]}>
          <Animated.Image
            source={require('../assets/images/logosiladan.png')}
            style={[styles.logo, logoAnimatedStyle]}
          />
        </Animated.View>

        <Animated.ScrollView
          contentContainerStyle={styles.scrollContainer}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled" 
        >
          {/* --- FORM DIUBAH TOTAL --- */}
          <View style={styles.formContainer}>
            <Animated.View entering={FadeIn.duration(1000)}>
              
              <Text style={styles.title}>Lupa Password?</Text>
              <Text style={styles.subtitle}>
                Masukkan email Anda yang terdaftar. Kami akan mengirimkan kode verifikasi.
              </Text>

              {/* Hanya 1 input email */}
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Masukkan Email Anda"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* Tombol diganti */}
              <TouchableOpacity style={styles.button} onPress={onKirimKodePress}>
                <Text style={styles.buttonText}>Kirim Kode</Text>
              </TouchableOpacity>

            </Animated.View>
          </View>
        </Animated.ScrollView>
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- (StyleSheet SAMA PERSIS, tapi disederhanakan) ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  headerContainer: { backgroundColor: COLORS.primary, position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
  logo: { resizeMode: 'contain', marginTop: 30 },
  scrollContainer: { paddingTop: HEADER_HEIGHT_EXPANDED },
  formContainer: { paddingHorizontal: 30, paddingBottom: 48, flexGrow: 1 },
  title: { color: COLORS.primary, fontSize: 25, fontWeight: '700', textAlign: 'center', marginTop: 24 },
  subtitle: { color: COLORS.primary, fontSize: 14, fontWeight: '600', textAlign: 'center', marginTop: 12, marginBottom: 48, lineHeight: 20 },
  inputLabel: { color: COLORS.primary, fontSize: 12, fontWeight: '600', marginBottom: 8 },
  input: { height: 40, borderBottomWidth: 1, borderBottomColor: COLORS.secondary, fontSize: 16, marginBottom: 24 },
  button: { backgroundColor: COLORS.primary, height: 53, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 32 },
  buttonText: { color: COLORS.white, fontSize: 20, fontWeight: '700' },
});