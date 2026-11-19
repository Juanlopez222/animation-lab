import { useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import HintCard from '../components/HintCard';
import Stage from '../components/Stage';
import { colors } from '../theme';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const SPINNER_SIZE = 104;

export default function LoadingScreen() {
  const rotation = useSharedValue(0);
  const progress = useSharedValue(0);

  // Al montar: el spinner gira sin parar y la barra se llena en bucle
  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 1000, easing: Easing.linear }), -1, false);
    progress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.quad) }),
        withTiming(1, { duration: 400 }), // pausa al llegar al 100%
        withTiming(0, { duration: 0 }),
      ),
      -1,
      false,
    );
    return () => {
      cancelAnimation(rotation);
      cancelAnimation(progress);
    };
  }, [rotation, progress]);

  const spinnerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const barStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const percentProps = useAnimatedProps(() => {
    const text = `${Math.round(progress.value * 100)}%`;
    // `text` actualiza el contenido del TextInput sin pasar por React
    return { text, defaultValue: text } as any;
  });

  return (
    <View style={styles.container}>
      <HintCard
        color={colors.accent}
        title="Carga en curso"
        text="El spinner gira sin parar mientras la barra de progreso se llena."
      />
      <Stage color={colors.accent} style={styles.stage}>
        <Animated.View style={[styles.spinner, spinnerStyle]} />
        <Text style={styles.title}>Cargando...</Text>

        <View style={styles.barWrapper}>
          <View style={styles.track}>
            <Animated.View style={[styles.fill, barStyle]} />
          </View>
          <AnimatedTextInput
            editable={false}
            style={styles.percent}
            animatedProps={percentProps}
            defaultValue="0%"
          />
        </View>
      </Stage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16, gap: 14 },
  stage: { alignItems: 'center', justifyContent: 'center', gap: 26, padding: 24 },
  spinner: {
    width: SPINNER_SIZE,
    height: SPINNER_SIZE,
    borderRadius: SPINNER_SIZE / 2,
    borderWidth: 10,
    borderColor: '#E3F7F3',
    borderTopColor: colors.accent,
    borderRightColor: colors.primary,
  },
  title: { color: colors.text, fontSize: 22, fontWeight: '800' },
  barWrapper: { width: '100%', maxWidth: 340, gap: 10, alignItems: 'center' },
  track: {
    width: '100%',
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E9E5FA',
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: 8, backgroundColor: colors.accent },
  percent: { color: colors.accent, fontSize: 22, fontWeight: '900', padding: 0, textAlign: 'center' },
});
