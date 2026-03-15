import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.roundness.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
    marginBottom: theme.spacing.lg,
  },
  header: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    backgroundColor: theme.colors.background,
  },
  title: {
    fontWeight: '600',
    fontSize: theme.typography.lg,
    color: theme.colors.text,
  },
  content: {
    padding: theme.spacing.xl,
  },
});
