import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import MonitorLayout from "./MonitorLayout";
import { AuthPage } from "../pages/AuthPages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  UserDetailsResponse,
  UserResponse,
} from "../models/User";
import { GetUserDetails } from "../services/utilityServices";

export default function AppLayout() {
  debugger;
  const [userDetails, setUserDetails] = useState<UserDetailsResponse | null>(
    null,
  );
  const [userMenuAccess, setUserMenuAccess] =
    useState<string[] | null>(null);
  const [isCheckingUser, setIsCheckingUser] = useState(true);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("pbm_user");
    setUserDetails(null);
    setUserMenuAccess(null);
  };

  const GetUserMenuDetails = async (): Promise<void> => {
    const userDetails = await GetUserDetails();

    setUserDetails(userDetails!);
    setUserMenuAccess(userDetails?.UserMenus!);
  };

  const handleLogin = async (u: UserResponse) => {
    await AsyncStorage.setItem("pbm_user", JSON.stringify(u));

    if (new Date(u.ExpiryDate) < new Date()) {
      await handleLogout();
    } else {
      await GetUserMenuDetails();
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem("pbm_user");

      if (!storedUser) {
        setIsCheckingUser(false);
        return;
      }

      const user: UserResponse = JSON.parse(storedUser);

      if (new Date(user.ExpiryDate) < new Date()) {
        await handleLogout();
      } else {
        await GetUserMenuDetails();
      }

      setIsCheckingUser(false);
    };

    checkUser();
  }, []);

  // 🚨 Prevent rendering until storage check finishes
  if (isCheckingUser) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  if (userDetails && userMenuAccess) {
    return (
      <MonitorLayout
        handleLogout={handleLogout}
        userDetails={userDetails}
        userMenus={userMenuAccess}
      />
    );
  }

  return <AuthPage onLogin={handleLogin} />;
}
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
});
