import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Accelerometer } from 'expo-sensors';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import HintCard from '../components/HintCard';
import Stage from '../components/Stage';
import { colors } from '../theme';

// En reposo el acelerómetro marca ~1 g (gravedad). Agitar lo supera con facilidad.
const SHAKE_THRESHOLD = 1.8;
const COOLDOWN_MS = 700;
const UPDATE_INTERVAL_MS = 80;

export default function ShakeScreen() {
  const focused = useIsFocused();
  const [available, setAvailable] = useState<boolean | null>(null);
  const [shakes, setShakes] = useState(0);

  const offsetX = useSharedValue(0);
  const rotation = useSharedValue(0);

  const playShake = useCallback(() => {
    cancelAnimation(offsetX);
    cancelAnimation(rotation);
    const t = { duration: 60, easing: Easing.linear };
    // Sacudida rápida de lado a lado que se asienta con un resorte
    offsetX.value = withSequence(
      withTiming(-22, t),
      withTiming(22, t),
      withTiming(-18, t),
      withTiming(18, t),
      withTiming(-12, t),
      withTiming(12, t),
      withSpring(0, { damping: 6, stiffness: 200 }),
    );
    rotation.value = withSequence(
      withTiming(-14, t),
      withTiming(14, t),
      withTiming(-10, t),
      withTiming(10, t),
      withTiming(-6, t),
      withTiming(6, t),
      withSpring(0, { damping: 6, stiffness: 200 }),
    );
    setShakes((n) => n + 1);
  }, [offsetX, rotation]);

  useEffect(() => {
    let mounted = true;
    Accelerometer.isAvailableAsync()
      .then((ok) => mounted && setAvailable(ok))
      .catch(() => mounted && setAvailable(false));
    return () => {
      mounted = false;
    };
  }, []);

  // Solo escucha el sensor mientras esta pantalla está visible
  useEffect(() => {
    if (!focused || !available) return;
    let lastShake = 0;
    Accelerometer.setUpdateInterval(UPDATE_INTERVAL_MS);
    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const now = Date.now();
      if (magnitude > SHAKE_THRESHOLD && now - lastShake > COOLDOWN_MS) {
        lastShake = now;
        playShake();
      }
    });
    return () => subscription.remove();
  }, [focused, available, playShake]);

  const shapeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX.value }, { rotate: `${rotation.value}deg` }],
  }));

  const status =
    available === null
      ? 'Comprobando el sensor...'
      : available
        ? 'Agita el celular para sacudir la figura.'
        : 'Este dispositivo no tiene acelerómetro. Usa el botón para probar la animación.';

  return (
    <View style={styles.container}>
      <HintCard color={colors.orange} title="Agita el celular" text={status} />
      <Stage color={colors.orange} style={styles.stage}>
        <Animated.View style={[styles.shape, shapeStyle]}>
          <Text style={styles.shapeText}>Shake</Text>
        </Animated.View>
        <View style={styles.counter}>
          <Text style={styles.counterText}>Sacudidas detectadas: {shakes}</Text>
        </View>
      </Stage>
      <Pressable style={styles.button} onPress={playShake}>
        <Text style={styles.buttonText}>Probar sin agitar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16, gap: 14 },
  stage: { alignItems: 'center', justifyContent: 'center', gap: 32 },
  shape: {
    width: 170,
    height: 170,
    borderRadius: 40,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.orange,
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  shapeText: { color: colors.white, fontSize: 26, fontWeight: '900' },
  counter: {
    backgroundColor: colors.bg,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  counterText: { color: colors.text, fontSize: 15, fontWeight: '700' },
  button: {
    alignSelf: 'center',
    backgroundColor: colors.orange,
    borderRadius: 999,
    paddingHorizontal: 28,
    paddingVertical: 13,
    shadowColor: colors.orange,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  buttonText: { color: colors.white, fontSize: 15, fontWeight: '800' },
});
