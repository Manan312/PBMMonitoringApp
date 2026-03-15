import React, { useState, useMemo, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Database, Activity, Settings, Users } from "lucide-react-native";
import { Layout } from "./Layout";
import { MasterSync } from "../pages/MasterSyncPage";
import { PBMSync } from "../pages/PBMSync";
import { Services } from "../pages/Services";
import { UserManagement } from "../pages/UserManagement";
import { UserDetailsResponse } from "../models/User";
import AsyncStorage from "@react-native-async-storage/async-storage";

type MenuKey = "Master" | "PBM" | "Services" | "Users";

interface MonitorLayoutProps {
  handleLogout: () => void;
  userDetails: UserDetailsResponse;
  userMenus: string[];
}

export default function MonitorLayout({
  handleLogout,
  userDetails,
  userMenus,
}: MonitorLayoutProps) {
  const [activeMenu, setActiveMenu] = useState<MenuKey>("Master");

  const menuItems = useMemo(() => {
    if (!userMenus) return [];

    return [
      { key: "Master", label: "Master Sync", icon: Database },
      { key: "PBM", label: "PBM Nano Sync", icon: Activity },
      { key: "Services", label: "Services", icon: Settings },
      { key: "Users", label: "User Management", icon: Users, adminOnly: true },
    ].filter((item) => userMenus.includes(item.key as MenuKey));
  }, [userMenus]);

  if (!menuItems.length) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  useEffect(() => {
    const loadActiveMenu = async () => {
      const storedMenu = await AsyncStorage.getItem("ActiveMenu");

      if (storedMenu && menuItems.some((m) => m.key === storedMenu)) {
        setActiveMenu(storedMenu as MenuKey);
      }
    };

    loadActiveMenu();
  }, [menuItems]);
  return (
    <Layout
      user={userDetails}
      activeMenu={activeMenu}
      setActiveMenu={setActiveMenu}
      handleLogout={handleLogout}
      menuItems={menuItems}
    >
      {activeMenu === "Master" && <MasterSync />}
      {activeMenu === "PBM" && <PBMSync />}
      {activeMenu === "Services" && <Services />}
      {activeMenu === "Users" && <UserManagement />}
    </Layout>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
});
