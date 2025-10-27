import { Redirect } from 'expo-router';

export default function StartPage() {
  // Untuk sekarang, kita paksa pengguna ke halaman login.
  // Nanti, di sini Anda bisa cek:
  // "if (sudahLogin) return <Redirect href="/(tabs)" />;"
  // "if (belumLogin) return <Redirect href="/login" />;"
  
  return <Redirect href="/login" />;
}