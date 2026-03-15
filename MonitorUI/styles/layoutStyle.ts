  import { StyleSheet, Platform } from 'react-native';
  import { theme } from './theme';

  export const layoutStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      height: 64,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.lg,
      ...Platform.select({
        ios: {
          shadowColor: theme.colors.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    logoContainer: {
      width: 32,
      height: 32,
      borderRadius: theme.roundness.md,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoText: {
      fontSize: theme.typography.xl,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    userBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.secondary,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.roundness.full,
      gap: 6,
      maxWidth: 150,
    },
    avatar: {
      width: 20,
      height: 20,
      borderRadius: theme.roundness.lg,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: {
      color: theme.colors.white,
      fontSize: theme.typography.xs,
      fontWeight: 'bold',
    },
    userName: {
      fontSize: theme.typography.sm,
      fontWeight: '500',
      color: theme.colors.textMuted,
    },
    logoutButton: {
      padding: 4,
    },
    main: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 100, // Space for bottom nav
    },
    contentWrapper: {
      padding: theme.spacing.lg,
      maxWidth: 1200,
      alignSelf: 'center',
      width: '100%',
    },
    pageTitle: {
      fontSize: theme.typography.sm,
      fontWeight: '700',
      color: theme.colors.textLight,
      letterSpacing: 1,
      marginBottom: theme.spacing.xl,
      marginTop: theme.spacing.sm,
      textTransform: 'uppercase',
    },
    nav: {
      backgroundColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      height: 70,
      paddingBottom: Platform.OS === 'ios' ? 20 : 0,
      ...Platform.select({
        ios: {
          shadowColor: theme.colors.black,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
        },
        android: {
          elevation: 8,
        },
      }),
    },
    navContent: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      maxWidth: 500,
      alignSelf: 'center',
      width: '100%',
    },
    navItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      position: 'relative',
    },
    activeIcon: {
      transform: [{ scale: 1.1 }],
    },
    navLabel: {
      fontSize: theme.typography.xs,
      fontWeight: '700',
      marginTop: 4,
      textTransform: 'uppercase',
    },
    activeNavLabel: {
      color: theme.colors.primary,
    },
    inactiveNavLabel: {
      color: theme.colors.textLight,
    },
    activeIndicator: {
      position: 'absolute',
      top: 0,
      left: '25%',
      right: '25%',
      height: 3,
      backgroundColor: theme.colors.primary,
      borderBottomLeftRadius: 3,
      borderBottomRightRadius: 3,
    },
  });
