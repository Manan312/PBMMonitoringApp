import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.xxl,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness.xxl,
    padding: theme.spacing.xxl,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.huge,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: theme.roundness.xl,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.huge,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: theme.typography.md,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.xs,
  },
  form: {
    gap: theme.spacing.xl,
  },
  inputGroup: {
    gap: theme.spacing.sm,
  },
  label: {
    fontSize: theme.typography.sm,
    fontWeight: '600',
    color: theme.colors.text,
  },
  input: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.roundness.lg,
    paddingHorizontal: theme.spacing.lg,
    height: 50,
    fontSize: theme.typography.md,
    color: theme.colors.text,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.dangerLight,
    padding: theme.spacing.md,
    borderRadius: theme.roundness.lg,
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: theme.typography.sm,
    fontWeight: '500',
    flex: 1,
  },
  footer: {
    marginTop: theme.spacing.huge,
    alignItems: 'center',
  },
  footerText: {
    fontSize: theme.typography.sm,
    color: theme.colors.textLight,
  },
  demoBanner: {
    backgroundColor: theme.colors.primaryLight,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.roundness.lg,
    padding: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  demoTextContainer: {
    flex: 1,
  },
  demoTitle: {
    fontSize: theme.typography.md,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  demoSubtitle: {
    fontSize: theme.typography.sm,
    color: theme.colors.primary,
    marginTop: 2,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.dangerLight,
    padding: theme.spacing.md,
    borderRadius: theme.roundness.lg,
    marginBottom: theme.spacing.lg,
  },
  formGroup: {
    marginBottom: theme.spacing.lg,
  },
  submitButton: {
    marginTop: theme.spacing.sm,
  },
  switchButton: {
    marginTop: theme.spacing.xl,
    alignItems: 'center',
  },
  switchText: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: theme.typography.md,
  },
});
