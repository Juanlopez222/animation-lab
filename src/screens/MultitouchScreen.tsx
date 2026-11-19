import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  GestureDetector,
  usePanGesture,
  usePinchGesture,
  useRotationGesture,
  useSimultaneousGestures,
} from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import HintCard from '../components/HintCard';
import Stage from '../components/Stage';
import { colors } from '../theme';

const MIN_SCALE = 0.5;
const MAX_SCALE = 5;

export default function MultitouchScreen() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0); // radianes

  // Valores guardados al empezar cada gesto
  const savedX = useSharedValue(0);
  const savedY = useSharedValue(0);
  const savedScale = useSharedValue(1);
  const savedRotation = useSharedValue(0);

  const pan = usePanGesture({
    onBegin: () => {
      savedX.value = translateX.value;
      savedY.value = translateY.value;
    },
    onUpdate: (e) => {
      translateX.value = savedX.value + e.translationX;
      translateY.value = savedY.value + e.translationY;
    },
  });

  const pinch = usePinchGesture({
    onBegin: () => {
      savedScale.value = scale.value;
    },
    onUpdate: (e) => {
      scale.value = Math.min(Math.max(savedScale.value * e.scale, MIN_SCALE), MAX_SCALE);
    },
  });

  const rotate = useRotationGesture({
    onBegin: () => {
      savedRotation.value = rotation.value;
    },
    onUpdate: (e) => {
      rotation.value = savedRotation.value + e.rotation;
    },
  });

  // Los tres gestos funcionan a la vez
  const gesture = useSimultaneousGestures(pan, pinch, rotate);

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotateZ: `${rotation.value}rad` },
    ],
  }));

  const reset = () => {
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    scale.value = withSpring(1);
    rotation.value = withSpring(0);
  };

  return (
    <View style={styles.container}>
      <HintCard
        color={colors.pink}
        title="Usa tus dedos"
        text="Un dedo mueve, pellizcar hace zoom y dos dedos girando rotan la imagen."
      />
      <Stage color={colors.pink} style={styles.stage}>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.imageWrapper, imageStyle]}>
            <Image source={require('../../assets/gesture-image.png')} style={styles.image} />
          </Animated.View>
        </GestureDetector>
      </Stage>
      <Pressable style={styles.button} onPress={reset}>
        <Text style={styles.buttonText}>Restablecer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16, gap: 14 },
  stage: { alignItems: 'center', justifyContent: 'center' },
  imageWrapper: {
    width: 240,
    height: 240,
    shadowColor: colors.shadow,
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  image: { width: '100%', height: '100%', borderRadius: 22 },
  button: {
    alignSelf: 'center',
    backgroundColor: colors.pink,
    borderRadius: 999,
    paddingHorizontal: 32,
    paddingVertical: 13,
    shadowColor: colors.pink,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  buttonText: { color: colors.white, fontSize: 15, fontWeight: '800' },
});
