import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

type Props = {
  color: string;
  title: string;
  text: string;
};

// Tarjeta de instrucciones que se muestra arriba de cada ejercicio
export default function HintCard({ color, title, text }: Props) {
  return (
    <View style={styles.card}>
      <View style={[styles.bar, { backgroundColor: color }]} />
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  bar: { width: 6 },
  body: { flex: 1, paddingVertical: 12, paddingHorizontal: 14, gap: 2 },
  title: { color: colors.text, fontSize: 16, fontWeight: '800' },
  text: { color: colors.muted, fontSize: 14, lineHeight: 20 },
});
