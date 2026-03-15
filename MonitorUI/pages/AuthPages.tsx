import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Shield, AlertCircle, Info } from "lucide-react-native";
import { Button } from "../components/UI/Button";
import { Card } from "../components/UI/Card";
import { apiService } from "../services/apiService";
import { authStyles as styles } from "../styles/authStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserResponse } from "../models/User";

interface AuthPageProps {
  onLogin: (user: any) => void;
}

export const AuthPage = ({ onLogin }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const clearStorage = async () => {
      await AsyncStorage.clear();
    };

    clearStorage();
  }, []);
  // Pre-fill demo credentials on mount
  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await apiService.login({
        UserName: email,
        Password: password,
      });
      if (res.Errors != null) {
        if (res.Errors[0].Message) {
          setError(res.Errors[0].Message);
        }
      } else {
        onLogin(res.Data);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Shield size={32} color="white" />
            </View>
            <Text style={styles.title}>PBM Sync Monitor</Text>
            <Text style={styles.subtitle}>
              Secure access to your monitoring dashboard
            </Text>
          </View>

          {error ? (
            <View style={styles.errorContainer}>
              <AlertCircle size={16} color="#ef4444" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter the UserName"
              value={email}
              onChangeText={setEmail}
              keyboardType="default"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <Button
            onPress={handleSubmit}
            variant="primary"
            loading={loading}
            style={styles.submitButton}
          >
            {"Sign In"}
          </Button>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
