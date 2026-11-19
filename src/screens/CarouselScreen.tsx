import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import HintCard from '../components/HintCard';
import { colors } from '../theme';

type Item = { id: string; title: string; subtitle: string; color: string; onColor: string };

const ITEMS: Item[] = [
  { id: '1', title: 'Drag & Drop', subtitle: 'Arrastra y rota según la dirección', color: colors.primary, onColor: colors.white },
  { id: '2', title: 'Loading', subtitle: 'Spinner infinito y barra de progreso', color: colors.accent, onColor: colors.white },
  { id: '3', title: 'Multitouch', subtitle: 'Zoom, mover y rotar con los dedos', color: colors.pink, onColor: colors.white },
  { id: '4', title: 'Bounce', subtitle: 'Se encoge y rebota al soltar', color: colors.yellow, onColor: colors.text },
  { id: '5', title: 'Carrusel', subtitle: 'Escala, rotación y transiciones', color: colors.blue, onColor: colors.white },
];

function Card({
  item,
  index,
  scrollX,
  itemSize,
  cardWidth,
}: {
  item: Item;
  index: number;
  scrollX: SharedValue<number>;
  itemSize: number;
  cardWidth: number;
}) {
  const style = useAnimatedStyle(() => {
    const input = [(index - 1) * itemSize, index * itemSize, (index + 1) * itemSize];
    const scale = interpolate(scrollX.value, input, [0.82, 1, 0.82], Extrapolation.CLAMP);
    const rotate = interpolate(scrollX.value, input, [12, 0, -12], Extrapolation.CLAMP);
    const translateY = interpolate(scrollX.value, input, [24, 0, 24], Extrapolation.CLAMP);
    const opacity = interpolate(scrollX.value, input, [0.55, 1, 0.55], Extrapolation.CLAMP);
    return {
      opacity,
      transform: [{ translateY }, { scale }, { rotateZ: `${rotate}deg` }],
    };
  });

  return (
    <View style={{ width: itemSize, alignItems: 'center' }}>
      <Animated.View
        style={[styles.card, { width: cardWidth, backgroundColor: item.color, shadowColor: item.color }, style]}
      >
        <View style={[styles.pill, { backgroundColor: item.onColor }]}>
          <Text style={[styles.pillText, { color: item.color }]}>Ejercicio {item.id}</Text>
        </View>
        <Text style={[styles.cardNumber, { color: item.onColor }]}>{item.id}</Text>
        <View>
          <Text style={[styles.cardTitle, { color: item.onColor }]}>{item.title}</Text>
          <Text style={[styles.cardSubtitle, { color: item.onColor }]}>{item.subtitle}</Text>
        </View>
      </Animated.View>
    </View>
  );
}

function Dot({ index, scrollX, itemSize }: { index: number; scrollX: SharedValue<number>; itemSize: number }) {
  const style = useAnimatedStyle(() => {
    const input = [(index - 1) * itemSize, index * itemSize, (index + 1) * itemSize];
    return {
      width: interpolate(scrollX.value, input, [8, 26, 8], Extrapolation.CLAMP),
      opacity: interpolate(scrollX.value, input, [0.3, 1, 0.3], Extrapolation.CLAMP),
    };
  });
  return <Animated.View style={[styles.dot, style]} />;
}

export default function CarouselScreen() {
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.7;
  const itemSize = cardWidth + 16; // tarjeta + separación
  const sidePadding = (width - itemSize) / 2;
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  });

  return (
    <View style={styles.container}>
      <View style={styles.hintWrapper}>
        <HintCard
          color={colors.blue}
          title="Desliza las tarjetas"
          text="La tarjeta central crece y las laterales se inclinan y se atenúan."
        />
      </View>
      <View style={styles.listArea}>
        <Animated.FlatList
          data={ITEMS}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={itemSize}
          decelerationRate="fast"
          disableIntervalMomentum
          contentContainerStyle={{ paddingHorizontal: sidePadding, alignItems: 'center' }}
          onScroll={onScroll}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => (
            <Card item={item} index={index} scrollX={scrollX} itemSize={itemSize} cardWidth={cardWidth} />
          )}
        />
      </View>
      <View style={styles.dots}>
        {ITEMS.map((item, i) => (
          <Dot key={item.id} index={i} scrollX={scrollX} itemSize={itemSize} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingVertical: 16, gap: 14 },
  hintWrapper: { paddingHorizontal: 16 },
  listArea: { flex: 1, justifyContent: 'center' },
  card: {
    height: 380,
    borderRadius: 32,
    padding: 22,
    justifyContent: 'space-between',
    shadowOpacity: 0.4,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  pill: { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5 },
  pillText: { fontSize: 12, fontWeight: '800' },
  cardNumber: { fontSize: 96, fontWeight: '900', opacity: 0.3 },
  cardTitle: { fontSize: 28, fontWeight: '900' },
  cardSubtitle: { fontSize: 15, marginTop: 4, opacity: 0.85 },
  dots: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, height: 24 },
  dot: { height: 8, borderRadius: 4, backgroundColor: colors.primary },
});
