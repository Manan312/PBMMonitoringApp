import { StyleSheet, Platform } from "react-native";
import { theme } from "./theme";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  content: {
    padding: theme.spacing.lg,
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%",
  },
  card: {
    width:"100%",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
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
  cardTitle: {
    fontSize: theme.typography.lg,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.huge,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: theme.typography.md,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.xs,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.roundness.lg,
    paddingHorizontal: theme.spacing.md,
    height: 44,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: theme.typography.md,
    color: theme.colors.text,
    minWidth: 200,
  },
  label: {
    fontSize: theme.typography.xs,
    fontWeight: "700",
    color: theme.colors.textLight,
    textTransform: "uppercase",
    marginBottom: theme.spacing.xs,
  },
  button: {
    height: 48,
    borderRadius: theme.roundness.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: "600",
    fontSize: theme.typography.lg,
  },
  table: {
    width: "100%",
    flex: 1,
    minHeight:400,
    maxHeight:400,
    overflow:"scroll",
  },
  tableHeader: {
    width: "100%",
    flexDirection: "row",
    position:"relative",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingBottom: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  tableRow: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
    paddingVertical: theme.spacing.md,
    alignItems: "center",
  },
  th: {
    fontSize: theme.typography.xs,
    fontWeight: "700",
    color: theme.colors.textLight,
    textTransform: "uppercase",
  },
  td: {
    fontSize: theme.typography.md,
    color: theme.colors.textMuted,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.roundness.md,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: theme.typography.xs,
    fontWeight: "700",
  },
  mono: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: theme.typography.sm,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  gapSm: { gap: theme.spacing.sm },
  gapMd: { gap: theme.spacing.md },
  gapLg: { gap: theme.spacing.lg },
});
