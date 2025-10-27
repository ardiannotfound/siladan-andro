// Lokasi: app/_layout.tsx (INI KODE YANG SUDAH DIGABUNG)

// --- Impor dari kodemu ---
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn } from 'react-native-reanimated';

// --- Impor dari kodeku (digabung) ---
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

// --- Setting dari kodemu (kita biarkan) ---
export const unstable_settings = {
  anchor: '(tabs)',
};

// --- Komponen Splash Screen (ini tambahan dari saya) ---
function AnimatedSplashScreen() {
  return (
    <View style={styles.splashContainer}>
      {/*
        BUNGKUS GAMBARNYA DENGAN 'Animated.View'
        DAN BERIKAN PROP 'entering'
      */}
      <Animated.View entering={FadeIn.duration(2000)}>
        <Image
          // GANTI DENGAN PATH LOGO ANDA
          source={require('../assets/images/logosiladan.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

// --- RootLayout (INI BAGIAN UTAMA YANG KITA GABUNG) ---
export default function RootLayout() {
  // 1. Ambil theme (dari kodemu)
  const colorScheme = useColorScheme();

  // 2. Tambahkan state splash screen (dari kodeku)
  const [isAppReady, setIsAppReady] = useState(false);

  // 3. Tambahkan timer loading (dari kodeku)
  useEffect(() => {
    // Simulasikan loading 3 detik
    setTimeout(() => {
      setIsAppReady(true);
    }, 3000); 
  }, []);

  // 4. Tampilkan Splash jika belum siap (dari kodeku)
  if (!isAppReady) {
    return <AnimatedSplashScreen />;
  }

  // 5. Tampilkan Aplikasi jika sudah siap (digabung)
  return (
    // Kita gunakan ThemeProvider-mu
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Ini adalah 3 rute utama kita:
          1. login (yang baru kita tambahkan)
          2. (tabs) (dari kodemu)
          3. modal (dari kodemu)
        */}
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="verifikasi" options={{ headerShown: false }} />
        <Stack.Screen name="password-lupa" options={{ headerShown: false }} />
        <Stack.Screen name="password-reset" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      {/* Kita pertahankan StatusBar-mu */}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

// --- Stylesheet (tambahan dari saya) ---
const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // <-- SESUAIKAN WARNA BACKGROUND
  },
  logo: {
    width: 200, // <-- SESUAIKAN UKURAN LOGO
    height: 200, // <-- SESUAIKAN UKURAN LOGO
  },
});