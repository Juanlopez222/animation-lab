import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

type Props = {
  title: string;
  description: string;
  module: number;
};

// Pantalla temporal: cada ejercicio la reemplazará en su módulo.
export default function ScreenPlaceholder({ title, description, module }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Módulo {module}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.soon}>Próximamente</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  badge: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  badgeText: { color: colors.accent, fontSize: 12, fontWeight: '600' },
  title: { color: colors.text, fontSize: 24, fontWeight: '700', textAlign: 'center' },
  description: { color: colors.muted, fontSize: 15, textAlign: 'center', lineHeight: 22 },
  soon: { color: colors.primary, fontSize: 14, marginTop: 8 },
});
