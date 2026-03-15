import { StyleSheet, Platform } from "react-native";
import { theme } from "./theme";

export const masterSyncStyles = StyleSheet.create({
  container: {
    gap: theme.spacing.xl,
  },
  header: {
    marginBottom: theme.spacing.xs,
  },
  searchContainer: {
    flexDirection: "row",
    gap: theme.spacing.md,
    flexWrap: "wrap",
    marginBottom: 20,
  },
  downloadGrid: {
    flexDirection: "row",
    gap: theme.spacing.md,
    flexWrap: "wrap",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  resultsScroll: {
    marginTop: theme.spacing.xxl,
  },
  inputGroup: {
    flex: 1,
    minWidth: 250,
    gap: 6,
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: theme.typography.sm,
  },
  dateText: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  chartsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -theme.spacing.sm,
  },
  chartWrapper: {
    width: Platform.OS === "web" ? "25%" : "50%",
    paddingHorizontal: theme.spacing.sm,
    minWidth: 160,
  },
  table: {
    minWidth: 570,
  },
  refText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontWeight: "700",
    color: theme.colors.primary,
    fontSize: theme.typography.sm,
  },
  capitalize: {
    textTransform: "capitalize",
  },
  smallText: {
    fontSize: theme.typography.sm,
  },
  emptyRow: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    color: theme.colors.textLight,
    fontSize: theme.typography.md,
  },
});
