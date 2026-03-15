import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const syncPieChartStyles = StyleSheet.create({
  card: {
    padding: 0,
  },
  chartContainer: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  centerText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentText: {
    fontSize: theme.typography.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  label: {
    fontSize: theme.typography.xs,
    color: theme.colors.textLight,
    textTransform: 'uppercase',
  },
  footer: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 14,
},

statBox: {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
},

dot: {
  width: 10,
  height: 10,
  borderRadius: 5,
},

statLabel: {
  fontSize: 11,
  color: "#64748b",
},

statValue: {
  fontSize: 14,
  fontWeight: "600",
  color: "#0f172a",
},
  successText: {
    fontSize: theme.typography.sm,
    fontWeight: '600',
    color: '#059669',
  },
  failedText: {
    fontSize: theme.typography.sm,
    fontWeight: '600',
    color: '#dc2626',
  },
  pendingText: {
    fontSize: theme.typography.sm,
    fontWeight: '600',
    color: '#facc15',
  },
});
