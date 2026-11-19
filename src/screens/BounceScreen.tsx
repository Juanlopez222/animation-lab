import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { colors } from '../theme';

const PRESSED_SCALE = 0.7;

export default function BounceScreen() {
  const scale = useSharedValue(1);

  const onPressIn = () => {
    // Se reduce rápido al presionar
    scale.value = withTiming(PRESSED_SCALE, { duration: 120 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  const onPressOut = () => {
    // Vuelve al tamaño original con rebote (resorte poco amortiguado)
    scale.value = withSpring(1, { damping: 4, stiffness: 180, mass: 0.8 });
  };

  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>Mantén presionada la figura y suéltala para ver el rebote.</Text>
      <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
        <Animated.View style={[styles.shape, style]}>
          <Text style={styles.label}>Presióname</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    padding: 24,
  },
  hint: { color: colors.muted, fontSize: 14, lineHeight: 20, textAlign: 'center' },
  shape: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
  },
  label: { color: colors.bg, fontSize: 18, fontWeight: '800' },
});
