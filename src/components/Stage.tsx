import type { ReactNode } from 'react';
import { StyleSheet, View, type LayoutChangeEvent, type StyleProp, type ViewStyle } from 'react-native';
import { colors } from '../theme';

type Props = {
  color: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  onLayout?: (e: LayoutChangeEvent) => void;
};

// Escenario donde ocurre la animación: tarjeta blanca con manchas de color suaves
export default function Stage({ color, children, style, onLayout }: Props) {
  return (
    <View style={[styles.stage, style]} onLayout={onLayout}>
      <View pointerEvents="none" style={[styles.blob, styles.blobTop, { backgroundColor: color }]} />
      <View pointerEvents="none" style={[styles.blob, styles.blobBottom, { backgroundColor: color }]} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  blob: { position: 'absolute', borderRadius: 999, opacity: 0.12 },
  blobTop: { width: 220, height: 220, top: -70, right: -60 },
  blobBottom: { width: 260, height: 260, bottom: -110, left: -80 },
});
