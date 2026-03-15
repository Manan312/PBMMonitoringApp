import { StyleSheet, Platform } from "react-native";

export const userManagementStyles = StyleSheet.create({
  container: {
    gap: 24,
  },

  /* HEADER */

  header: {
    flexDirection: Platform.OS === "web" ? "row" : "column",
    justifyContent: "space-between",
    alignItems: Platform.OS === "web" ? "center" : "flex-start",
    gap: 16,
  },

  headerText: {
    flex: 1,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  /* SEARCH */

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
    backgroundColor: "white",
  },

  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
    outlineWidth:0
  },

  addButton: {
    height: 40,
  },

  /* CARD */

  card: {
    padding: 0,
  },

  /* FORM */

  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },

  roleButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#e2e8f0",
  },

  roleButtonActive: {
    backgroundColor: "#4f46e5",
  },

  roleText: {
    fontWeight: "600",
    color: "#475569",
  },

  roleTextActive: {
    color: "white",
  },

  /* MENU SELECTION */

  accessGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },

  accessButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
  },

  accessButtonActive: {
    backgroundColor: "#6366f1",
    borderColor: "#6366f1",
  },

  accessButtonInactive: {
    backgroundColor: "#f1f5f9",
    borderColor: "#e2e8f0",
  },

  accessButtonText: {
    fontSize: 12,
    fontWeight: "600",
  },

  accessButtonTextActive: {
    color: "white",
  },

  accessButtonTextInactive: {
    color: "#475569",
  },

  /* TABLE */

  table: {
    width: "100%",
    flex: 1,
    minHeight: 400,
    maxHeight: 400,
    overflow: "scroll",
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
  },

  th: {
    fontWeight: "700",
    fontSize: 13,
    color: "#64748b",
  },

  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },

  menuContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },

  /* USER */

  userCell: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#6366f1",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
  },

  userEmail: {
    fontWeight: "600",
    fontSize: 14,
  },

  userId: {
    fontSize: 12,
    color: "#64748b",
  },

  /* ROLE BADGE */

  roleBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#eef2ff",
    alignSelf: "flex-start",
  },

  roleBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4f46e5",
  },

  /* MENU BADGES */

  menuChip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#eef2ff",
  },

  menuText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4f46e5",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalCard: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },

  label: {
    marginTop: 18,
    fontWeight: "600",
    color: "#475569",
  },
});
