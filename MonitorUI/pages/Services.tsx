import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Activity, Settings, Play, Square } from "lucide-react-native";
import { Button } from "../components/UI/Button";
import { Card } from "../components/UI/Card";
import { apiService } from "../services/apiService";
import { ServiceStatusResponse } from "../models/Service";
import { globalStyles } from "../styles/globalStyle";
import { servicesStyles as styles } from "../styles/serviceStyle";
import {
  GetWinServiceStatus,
  ToggleWinService,
} from "../services/utilityServices";

export const Services = () => {
  const [services, setServices] = useState<ServiceStatusResponse[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const fetchServices = async () => {
    const data = await GetWinServiceStatus();
    if (data) setServices(data);
  };

  useEffect(() => {
    fetchServices();

    const interval = setInterval(
      () => {
        fetchServices();
      },
      5 * 60 * 1000,
    ); // 5 minutes

    return () => clearInterval(interval); // cleanup
  }, []);

  const toggleService = async (Name: string, Type: string, Request: string) => {
    setLoadingId(Name);
    try {
      if (Type === "API") {
      } else {
        const data = await ToggleWinService(Name, Request);
        setServices((prev) =>
          prev.map((service) =>
            service.Name === Name ? { ...service, ...data } : service,
          ),
        );
      }
    } finally {
      setLoadingId(null);
    }
  };

  const apiServiceData = services.find((s) => s.Type === "API");
  const windowServices = services.filter((s) => s.Type === "Window Service");

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={globalStyles.title}>Service Status Monitoring</Text>
        <Text style={globalStyles.subtitle}>
          Monitor and control API and Windows Services.
        </Text>
      </View>

      {apiServiceData && (
        <Card title="API Status" style={styles.apiCard}>
          <View style={styles.apiRow}>
            <View style={styles.apiInfo}>
              <View style={styles.apiIconContainer}>
                <Activity size={32} color="white" />
              </View>
              <View>
                <Text style={styles.apiName}>{apiServiceData.Name}</Text>
                <View style={styles.statusRow}>
                  <View
                    style={[
                      styles.statusDot,
                      {
                        backgroundColor:
                          apiServiceData.Status === "Running"
                            ? "#10b981"
                            : "#94a3b8",
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          apiServiceData.Status === "Running"
                            ? "#059669"
                            : "#64748b",
                      },
                    ]}
                  >
                    {apiServiceData.Status.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
            <Button
              onPress={() =>
                toggleService(
                  apiServiceData.Name,
                  apiServiceData.Type,
                  apiServiceData.Status === "Running" ? "Stop" : "Start",
                )
              }
              variant={
                apiServiceData.Status === "Running" ? "danger" : "primary"
              }
              loading={loadingId === apiServiceData.Name}
              icon={apiServiceData.Status === "Running" ? Square : Play}
              style={styles.apiButton}
            >
              {apiServiceData.Status === "Running" ? "Stop API" : "Start API"}
            </Button>
          </View>
        </Card>
      )}

      <View style={styles.grid}>
        {windowServices.map((service) => (
          <View key={service.id} style={styles.gridItem}>
            <Card style={styles.serviceCard}>
              <View style={styles.serviceHeader}>
                <View style={styles.serviceIconContainer}>
                  <Settings size={20} color="#d97706" />
                </View>
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor:
                        service.Status === "Running" ? "#ecfdf5" : "#f1f5f9",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      {
                        color:
                          service.Status === "Running" ? "#059669" : "#475569",
                      },
                    ]}
                  >
                    {service.Status.toUpperCase()}
                  </Text>
                </View>
              </View>
              <Text style={styles.serviceName} numberOfLines={2}>
                {service.Name}
              </Text>
              <Text style={styles.serviceType}>Windows Service</Text>

              <Button
                onPress={() =>
                  toggleService(
                    service.Name,
                    service.Type,
                    service.Status === "Running" ? "Stop" : "Start",
                  )
                }
                variant={service.Status === "Running" ? "danger" : "primary"}
                loading={loadingId === service.Name}
                icon={service.Status === "Running" ? Square : Play}
                style={styles.serviceButton}
              >
                {service.Status === "Running" ? "Stop" : "Start"}
              </Button>
            </Card>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
