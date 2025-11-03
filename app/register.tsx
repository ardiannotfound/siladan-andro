// Lokasi: app/register.tsx (PERBAIKAN SafeAreaView)
import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  // SafeAreaView DIHAPUS DARI SINI
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// --- 1. IMPORT SafeAreaView DARI LIBRARY YANG BENAR ---
import { SafeAreaView } from 'react-native-safe-area-context';

import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Animated, { FadeIn } from 'react-native-reanimated';

// --- IMPORT KOMPONEN HEADER KITA ---
import AuthHeader, {
  HEADER_HEIGHT_EXPANDED, // Komponen (Tampilan)
  useAnimatedAuthHeader, // Hook (Logika)
} from '@/components/AuthHeader'; // '@/' adalah shortcut ke root

// --- KONSTANTA LOKAL (YANG MASIH DIPERLUKAN) ---
const COLORS = {
  primary: '#053F5C',
  secondary: '#429EBD',
  white: '#FFFFFF',
  placeholder: '#A0A0A0',
};

export default function RegisterScreen() {
  
  const [namaLengkap, setNamaLengkap] = useState('');
  const [nik, setNik] = useState('');
  const [tglLahir, setTglLahir] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [alamat, setAlamat] = useState('');
  const [noHp, setNoHp] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [konfirmasiPassword, setKonfirmasiPassword] = useState('');

  // --- PANGGIL HOOK ANIMASI ---
  const { scrollHandler, headerAnimatedStyle, logoAnimatedStyle } = useAnimatedAuthHeader();

  // --- HANDLER BARU UNTUK DATE PICKER ---
  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || (tglLahir || new Date());
    setShowDatePicker(Platform.OS === 'ios'); 
    
    if (event.type === 'set') { 
        setTglLahir(currentDate);
    } else {
        setShowDatePicker(false);
    }
  };

  // Helper untuk format tanggal di tombol
  const getFormattedDate = () => {
    if (!tglLahir) {
      return "Pilih Tanggal Lahir (DD/MM/YYYY)";
    }
    let day = tglLahir.getDate().toString().padStart(2, '0');
    let month = (tglLahir.getMonth() + 1).toString().padStart(2, '0');
    let year = tglLahir.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const onRegisterPress = () => {
    if (!namaLengkap || !nik || !tglLahir || !alamat || !noHp || !email || !username || !password || !konfirmasiPassword) {
      Alert.alert('Gagal 😥', 'Semua kolom wajib diisi!');
      return;
    }
    if (password !== konfirmasiPassword) {
      Alert.alert('Gagal 😥', 'Password dan Konfirmasi Password tidak cocok!');
      return;
    }
    console.log('Pura-pura mendaftar...', { namaLengkap, nik, tglLahir: getFormattedDate(), alamat, noHp, email, username });
    router.push('/verifikasi?mode=register');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        style={{ flex: 1 }}
      >
        {/* --- PANGGIL KOMPONEN HEADER KITA --- */}
        <AuthHeader 
          headerAnimatedStyle={headerAnimatedStyle}
          logoAnimatedStyle={logoAnimatedStyle}
        />

        {/* --- HUBUNGKAN SCROLLVIEW KE 'SENSOR' --- */}
        <Animated.ScrollView
          contentContainerStyle={styles.scrollContainer}
          onScroll={scrollHandler} 
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled" 
        >
          <View style={styles.formContainer}>
            <Animated.View entering={FadeIn.duration(1000)}>
              
              <Text style={styles.title}>Buat Akun Baru</Text>
              <Text style={styles.subtitle}>Silakan isi data diri Anda</Text>

              <View style={styles.form}>
                
                <Text style={styles.inputLabel}>Nama Lengkap</Text>
                <TextInput style={styles.input} placeholder="Masukkan Nama Lengkap" value={namaLengkap} onChangeText={setNamaLengkap} autoCapitalize="words" />

                <Text style={styles.inputLabel}>NIK</Text>
                <TextInput style={styles.input} placeholder="16 Digit NIK" value={nik} onChangeText={setNik} keyboardType="numeric" maxLength={16} />

                <Text style={styles.inputLabel}>Tanggal Lahir</Text>
                <Pressable style={styles.datePickerInput} onPress={() => setShowDatePicker(true)}>
                  <Text style={tglLahir ? styles.dateText : styles.datePlaceholder}>
                    {getFormattedDate()}
                  </Text>
                </Pressable>

                {showDatePicker && (
                  <DateTimePicker
                    value={tglLahir || new Date(2000, 0, 1)}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                  />
                )}

                <Text style={styles.inputLabel}>Alamat</Text>
                <TextInput style={[styles.input, styles.inputMultiline]} placeholder="Masukkan Alamat Lengkap" value={alamat} onChangeText={setAlamat} multiline={true} numberOfLines={3} />

                <Text style={styles.inputLabel}>Nomor HP</Text>
                <TextInput style={styles.input} placeholder="Contoh: 08123456789" value={noHp} onChangeText={setNoHp} keyboardType="phone-pad" />

                <Text style={styles.inputLabel}>Email</Text>
                <TextInput style={styles.input} placeholder="Masukkan Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

                <Text style={styles.inputLabel}>Username</Text>
                <TextInput style={styles.input} placeholder="Masukkan Username" value={username} onChangeText={setUsername} autoCapitalize="none" />

                <Text style={styles.inputLabel}>Password</Text>
                <TextInput style={styles.input} placeholder="Buat Password Anda" value={password} onChangeText={setPassword} secureTextEntry />

                <Text style={styles.inputLabel}>Konfirmasi Password</Text>
                <TextInput style={styles.input} placeholder="Ketik ulang Password Anda" value={konfirmasiPassword} onChangeText={setKonfirmasiPassword} secureTextEntry />
              </View>

              <TouchableOpacity style={styles.button} onPress={onRegisterPress}>
                <Text style={styles.buttonText}>Buat Akun</Text>
              </TouchableOpacity>

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

// --- STYLESHEET (INPUT DIPERBAIKI) ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    height: 50, 
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
    fontSize: 16,
    marginBottom: 24,
    paddingHorizontal: 2, 
    paddingVertical: 10,  
  },
  inputMultiline: {
    height: 100, 
    textAlignVertical: 'top',
    paddingTop: 10, 
  },
  datePickerInput: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
    marginBottom: 24,
    paddingHorizontal: 2,
    justifyContent: 'center', 
  },
  dateText: {
    fontSize: 16,
    color: COLORS.primary,
  },
  datePlaceholder: {
    fontSize: 16,
    color: COLORS.placeholder,
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