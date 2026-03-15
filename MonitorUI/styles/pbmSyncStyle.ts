import { StyleSheet, Platform } from 'react-native';
import { theme } from './theme';

export const pbmSyncStyles = StyleSheet.create({
  container: {
    gap: theme.spacing.xl,
  },
  header: {
    marginBottom: theme.spacing.xs,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -theme.spacing.sm,
  },
   dateText: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  statWrapper: {
    width: Platform.OS === 'web' ? '25%' : '50%',
    paddingHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  searchGrid: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    flexWrap: 'wrap',
    marginBottom: theme.spacing.lg,
  },
  searchButton: {
    width: '100%',
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",    
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.roundness.lg,
    height: 44,
  },
  resultsScroll: {
    marginTop: theme.spacing.xxl,
  },
  table: {
    width: "100%",
    overflow:"scroll",
    maxHeight:350,
    minHeight:350,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    width: 80,
  },
  detailsButtonText: {
    fontSize: theme.typography.sm,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness.xxl,
    maxHeight: '90%',
    overflow: 'hidden',
  },
  modalHeader: {
    padding: theme.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  modalTitle: {
    fontSize: theme.typography.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  modalSubtitle: {
    fontSize: theme.typography.sm,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  closeButton: {
    padding: theme.spacing.sm,
  },
  modalBody: {
    flex: 1,
  },
  modalInner: {
    padding: theme.spacing.xl,
    gap: theme.spacing.xxl,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  summaryItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.roundness.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  summaryLabel: {
    fontSize: theme.typography.xs,
    fontWeight: '700',
    color: theme.colors.textLight,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.xs,
  },
  summaryValue: {
    fontSize: theme.typography.md,
    fontWeight: '700',
    color: theme.colors.text,
  },
  section: {
    gap: theme.spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  sectionIndicator: {
    width: 4,
    height: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: theme.typography.md,
    fontWeight: '700',
    color: theme.colors.text,
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.roundness.xl,
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  tableTh: {
    fontSize: theme.typography.sm,
    fontWeight: '600',
    color: theme.colors.textMuted,
  },
  tableBodyRow: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  tableTd: {
    fontSize: theme.typography.sm,
    color: theme.colors.textMuted,
  },
  jsonGrid: {
    gap: theme.spacing.lg,
  },
  jsonItem: {
    gap: theme.spacing.sm,
  },
  jsonLabel: {
    fontSize: theme.typography.xs,
    fontWeight: '700',
    color: theme.colors.textLight,
    textTransform: 'uppercase',
  },
  jsonBox: {
    backgroundColor: '#0f172a',
    padding: theme.spacing.lg,
    borderRadius: theme.roundness.xl,
  },
  jsonText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: theme.typography.xs,
    color: theme.colors.success,
  },
  bottomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xl,
  },
  denialWrapper: {
    flex: 2,
    minWidth: 300,
  },
  dumpWrapper: {
    flex: 1,
    minWidth: 250,
  },
  denialList: {
    minHeight:250,
    maxHeight:250,
    overflow:"scroll"
  },
  denialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  denialCode: {
    fontSize: theme.typography.xs,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    width: 40,
    color: theme.colors.textMuted,
  },
  barContainer: {
    flex: 1,
    height: 6,
    backgroundColor: theme.colors.secondary,
    borderRadius: 3,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: theme.colors.danger,
  },
  denialCount: {
    fontSize: theme.typography.xs,
    fontWeight: '700',
    color: '#334155',
    width: 30,
    textAlign: 'right',
  },
  dumpForm: {
    gap: theme.spacing.lg,
    height:250
  },
  inputGroup: {
    gap: 6,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: theme.typography.sm,
  },
});
