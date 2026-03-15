import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const buttonStyles = StyleSheet.create({
  button: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.roundness.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  primary: {
    backgroundColor: theme.colors.primary,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  danger: {
    backgroundColor: theme.colors.danger,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
    fontSize: theme.typography.md,
  },
  primaryText: {
    color: 'white',
  },
  dangerText: {
    color: 'white',
  },
  secondaryText: {
    color: '#334155',
  },
  ghostText: {
    color: theme.colors.textLight,
  },
});
