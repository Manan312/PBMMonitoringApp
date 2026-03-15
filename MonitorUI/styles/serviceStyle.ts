import { StyleSheet, Platform } from 'react-native';
import { theme } from './theme';

export const servicesStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    gap: theme.spacing.xl,
    paddingBottom: 40,
  },
  header: {
    marginBottom: theme.spacing.xs,
  },
  apiCard: {
    backgroundColor: theme.colors.primaryLight,
    borderColor: '#bfdbfe',
  },
  apiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: theme.spacing.lg,
  },
  apiInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  apiIconContainer: {
    width: 64,
    height: 64,
    borderRadius: theme.roundness.xl,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      }
    }),
  },
  apiName: {
    fontSize: theme.typography.xxl,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: theme.typography.sm,
    fontWeight: '700',
    letterSpacing: 1,
  },
  apiButton: {
    paddingHorizontal: theme.spacing.xxl,
    height: 48,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -theme.spacing.sm,
  },
  gridItem: {
    width: Platform.OS === 'web' ? '25%' : '50%',
    paddingHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
    minWidth: 160,
  },
  serviceCard: {
    height: '100%',
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  serviceIconContainer: {
    padding: theme.spacing.sm,
    borderRadius: theme.roundness.md,
    backgroundColor: theme.colors.warningLight,
  },
  badge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.roundness.lg,
  },
  badgeText: {
    fontSize: theme.typography.xs,
    fontWeight: '700',
  },
  serviceName: {
    fontSize: theme.typography.lg,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
    height: 40,
  },
  serviceType: {
    fontSize: theme.typography.sm,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.xl,
  },
  serviceButton: {
    width: '100%',
    height: 36,
  },
});
