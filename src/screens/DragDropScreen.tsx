import { StyleSheet, Text, View, type LayoutChangeEvent } from 'react-native';
import { GestureDetector, usePanGesture } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import HintCard from '../components/HintCard';
import Stage from '../components/Stage';
import { colors } from '../theme';

const SIZE = 100;
const MAX_TILT = 35; // grados
const TILT_DISTANCE = 140; // px de arrastre para llegar a la inclinación máxima

export default function DragDropScreen() {
  // Posición de la figura (esquina superior izquierda dentro del área)
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  // Arrastre actual respecto al inicio del gesto: define el sentido de la rotación
  const dragX = useSharedValue(0);
  const pressed = useSharedValue(0);
  const areaW = useSharedValue(0);
  const areaH = useSharedValue(0);

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    areaW.value = width;
    areaH.value = height;
    // Centrar la figura la primera vez
    if (x.value === 0 && y.value === 0) {
      x.value = (width - SIZE) / 2;
      y.value = (height - SIZE) / 2;
    }
  };

  const pan = usePanGesture({
    onBegin: () => {
      startX.value = x.value;
      startY.value = y.value;
      pressed.value = withSpring(1);
    },
    onUpdate: (e) => {
      const nextX = startX.value + e.translationX;
      const nextY = startY.value + e.translationY;
      // Mantener la figura dentro del área
      x.value = Math.min(Math.max(nextX, 0), Math.max(areaW.value - SIZE, 0));
      y.value = Math.min(Math.max(nextY, 0), Math.max(areaH.value - SIZE, 0));
      dragX.value = e.translationX;
    },
    onFinalize: () => {
      // Al soltar, vuelve a la posición recta con un resorte
      dragX.value = withSpring(0, { damping: 9, stiffness: 120 });
      pressed.value = withSpring(0);
    },
  });

  const shapeStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      dragX.value,
      [-TILT_DISTANCE, 0, TILT_DISTANCE],
      [-MAX_TILT, 0, MAX_TILT],
      Extrapolation.CLAMP,
    );
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        { rotate: `${rotate}deg` },
        { scale: 1 + pressed.value * 0.12 },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <HintCard
        color={colors.primary}
        title="Arrastra la figura"
        text="Si la mueves a la izquierda gira a la izquierda; a la derecha, gira a la derecha."
      />
      <Stage color={colors.primary} onLayout={onLayout}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.shape, shapeStyle]}>
            <Text style={styles.arrows}>‹  ›</Text>
          </Animated.View>
        </GestureDetector>
      </Stage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16, gap: 14 },
  shape: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: SIZE,
    height: SIZE,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  arrows: { color: colors.white, fontSize: 32, fontWeight: '800' },
});
