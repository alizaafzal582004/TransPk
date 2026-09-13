// TransPk — Frosted Glass Card
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../config/theme';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  glow?: boolean;
}

export default function GlassCard({ children, style, glow }: Props) {
  return (
    <View style={[styles.card, glow ? theme.shadow.glow : theme.shadow.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.glass,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
    padding: theme.spacing.md,
  },
});