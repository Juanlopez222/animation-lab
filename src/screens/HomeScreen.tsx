import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';
import { exercises } from '../navigation/exercises';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Animation Lab</Text>
      <Text style={styles.subtitle}>
        Animaciones y gestos con React Native Reanimated + Expo. Abre el menú lateral para probar cada ejercicio.
      </Text>
      {exercises.map((e) => (
        <View key={e.name} style={styles.card}>
          <Text style={styles.cardTitle}>
            {e.icon}  {e.label}
          </Text>
          <Text style={styles.cardText}>{e.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 20, gap: 12 },
  title: { color: colors.text, fontSize: 30, fontWeight: '800' },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22, marginBottom: 8 },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    gap: 4,
  },
  cardTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  cardText: { color: colors.muted, fontSize: 14, lineHeight: 20 },
});
