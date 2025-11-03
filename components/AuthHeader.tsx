// Lokasi: components/AuthHeader.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

export const HEADER_HEIGHT_EXPANDED = 160; 
export const HEADER_HEIGHT_COLLAPSED = 80;
const LOGO_HEIGHT_EXPANDED = 150; 
const LOGO_HEIGHT_COLLAPSED = 75;

const COLORS = {
  primary: '#053F5C',
};

// "otak" dari animasi
export const useAnimatedAuthHeader = () => {
  const scrollY = useSharedValue(0);

  // 'sensor' scroll
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  // 'style' header (kotak biru)
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT_EXPANDED - HEADER_HEIGHT_COLLAPSED],
      [HEADER_HEIGHT_EXPANDED, HEADER_HEIGHT_COLLAPSED],
      'clamp'
    );
    return { height };
  });

  // 'style' logo
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
    return { height, width };
  });

  // Kirim 'sensor' dan 'style' ke halaman yang memanggil
  return { scrollHandler, headerAnimatedStyle, logoAnimatedStyle };
};


type AuthHeaderProps = {
  headerAnimatedStyle: any;
  logoAnimatedStyle: any;
};

const AuthHeader: React.FC<AuthHeaderProps> = ({ headerAnimatedStyle, logoAnimatedStyle }) => {
  return (
    <Animated.View style={[styles.headerContainer, headerAnimatedStyle]}>
      <Animated.Image
        // Path '../' karena kita 'naik satu level' dari components/
        source={require('../assets/images/logosiladan.png')} 
        style={[styles.logo, logoAnimatedStyle]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
});

export default AuthHeader;