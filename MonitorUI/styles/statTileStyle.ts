import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const statTileStyles = StyleSheet.create({
  card: {
    padding: 0,
    marginBottom: 0,
  },
  container: {
    padding: theme.spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  iconContainer: {
    padding: theme.spacing.md,
    borderRadius: theme.roundness.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: theme.typography.sm,
    color: theme.colors.textLight,
  },
  value: {
    fontSize: theme.typography.xxl,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 2,
  },
});
