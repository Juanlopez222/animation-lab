import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import HintCard from '../components/HintCard';
import Stage from '../components/Stage';
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
      <HintCard
        color={colors.yellow}
        title="Presiona y suelta"
        text="La figura se encoge al presionarla y rebota al volver a su tamaño."
      />
      <Stage color={colors.yellow} style={styles.stage}>
        <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
          <Animated.View style={[styles.shape, style]}>
            <Text style={styles.label}>Presióname</Text>
          </Animated.View>
        </Pressable>
      </Stage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16, gap: 14 },
  stage: { alignItems: 'center', justifyContent: 'center' },
  shape: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.yellow,
    shadowOpacity: 0.55,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  label: { color: colors.text, fontSize: 20, fontWeight: '900' },
});
