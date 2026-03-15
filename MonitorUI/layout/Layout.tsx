import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Shield, LogOut } from "lucide-react-native";
import { layoutStyles as styles } from "../styles/layoutStyle";
import { UserDetailsResponse } from "../models/User";
import ErrorBoundary from "./ErrorBoundary";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LayoutProps {
  children: React.ReactNode;
  user: UserDetailsResponse;
  activeMenu: string;
  setActiveMenu: (menu: any) => void;
  handleLogout: () => void;
  menuItems: any[];
}

export const Layout = ({
  children,
  user,
  activeMenu,
  setActiveMenu,
  handleLogout,
  menuItems,
}: LayoutProps) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoContainer}>
            <Shield size={18} color="white" />
          </View>
          <Text style={styles.logoText}>PBM Monitor</Text>
          <Text style={styles.logoText}>
            {activeMenu.replace("_", " ").toUpperCase()}
          </Text>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.userBadge}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.Name[0].toUpperCase()}
              </Text>
            </View>
            <Text style={styles.userName} numberOfLines={1}>
              {user.Name}
            </Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <LogOut size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.main}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrapper}>
          {/* <Text style={styles.pageTitle}>{activeMenu.replace('_', ' ').toUpperCase()}</Text> */}
          <ErrorBoundary key={activeMenu}>{children}</ErrorBoundary>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.nav}>
        <View style={styles.navContent}>
          {menuItems.map((item) => {
            const isActive = activeMenu === item.key;
            return (
              <TouchableOpacity
                key={item.key}
                onPress={async () => {
                  setActiveMenu(item.key);
                  await AsyncStorage.setItem("ActiveMenu", item.key);
                }}
                style={styles.navItem}
                activeOpacity={0.7}
              >
                <item.icon
                  size={24}
                  color={isActive ? "#4f46e5" : "#94a3b8"}
                  style={isActive && styles.activeIcon}
                />
                <Text
                  style={[
                    styles.navLabel,
                    isActive ? styles.activeNavLabel : styles.inactiveNavLabel,
                  ]}
                >
                  {item.label.split(" ")[0]}
                </Text>
                {isActive && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};
