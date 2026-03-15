import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";

import {
  Download,
  AlertCircle,
  Search,
  CalendarIcon,
} from "lucide-react-native";
import { Calendar } from "react-native-calendars";

import { Button } from "../components/UI/Button";
import { Card } from "../components/UI/Card";
import { SyncPieChart } from "../components/Dashboard/SyncPieChart";

import {
  GetMasterSyncStats,
  GetMasterDataSyncFailedRecords,
  GetMasterDataSyncFailedExcel,
} from "../services/utilityServices";

import {
  MasterStatResponse,
  MasterSyncLog,
  MasterSearchRequest,
} from "../models/MasterSync";
import { globalStyles } from "../styles/globalStyle";
import { masterSyncStyles as styles } from "../styles/masterStyle";
import { JsonViewerModal } from "../components/UI/JsonViewModal";
import { showError } from "../services/toastService";

export const MasterSync = () => {
  const [stats, setStats] = useState<MasterStatResponse[]>([]);
  const [failedLogs, setFailedLogs] = useState<MasterSyncLog[]>([]);
  const [searchRef, setSearchRef] = useState("");

  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarType, setCalendarType] = useState<"start" | "end">("start");

  const [showJson, setShowJson] = useState(false);
  const [selectedLog, setSelectedLog] = useState<any>(null);

  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 10)),
  );

  const [endDate, setEndDate] = useState<Date>(new Date());

  const [downloadError, setDownloadError] = useState("");
  const [loading, setLoading] = useState(false);

  const types = ["Policy", "Benefit", "Member", "Accumulator"];

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0].replace(/-/g, "/");
  };
  const checkDate = () => {
    const days =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

    if (days > 30) {
      showError("Date Range should not be more than 30 days");
      setEndDate(new Date());
      setStartDate(new Date(new Date().setDate(new Date().getDate() - 10)));
      return false;
    }
    return true;
  };
  const fetchStats = async () => {
    setLoading(true);

    try {
      const data = await GetMasterSyncStats();
      if (data) setStats(data);
      const masterSyncSearch: MasterSearchRequest = {
        StartDate: formatDate(startDate),
        EndDate: formatDate(endDate),
      };
      const failedData = await GetMasterDataSyncFailedRecords(masterSyncSearch);
      if (failedData) setFailedLogs(failedData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSearch = async () => {
    if (checkDate() == false) {
      return null;
    }
    const masterSyncSearch: MasterSearchRequest = {
      StartDate: formatDate(startDate),
        EndDate: formatDate(endDate),
      ReferenceNo: searchRef,
    };
    const failedData = await GetMasterDataSyncFailedRecords(masterSyncSearch);
    if (failedData) setFailedLogs(failedData);
  };

  const handleDownload = async () => {
    if (checkDate() == false) {
      return null;
    }
    const masterSyncSearch: MasterSearchRequest = {
      StartDate: startDate.toISOString().split("T")[0],
      EndDate: endDate.toISOString().split("T")[0],
      ReferenceNo: searchRef,
    };
    await GetMasterDataSyncFailedExcel(masterSyncSearch);
  };

  const getChartData = (type: string) => {
    const stat = stats.find((s) => s.EntityType === type);

    return {
      success: stat?.SuccessCount ?? 0,
      failed: stat?.FailureCount ?? 0,
      pending: stat?.PendingCount ?? 0,
    };
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <Text style={globalStyles.title}>Master Sync Monitoring</Text>

        <Text style={globalStyles.subtitle}>
          Monitor Policy, Benefit, Member, and Accumulator sync status.
        </Text>
      </View>

      {/* CHARTS */}

      <View style={styles.chartsGrid}>
        {types.map((type) => {
          const { success, failed, pending } = getChartData(type);

          return (
            <View key={type} style={styles.chartWrapper}>
              <SyncPieChart
                title={`${type} Sync`}
                successCount={success}
                failedCount={failed}
                pendingCount={pending}
              />
            </View>
          );
        })}
      </View>

      {/* CARD */}

      <Card title="Master Sync Cases">
        <ScrollView>
          <View style={styles.downloadGrid}>
            {/* Reference */}

            <View style={styles.inputGroup}>
              <Text style={globalStyles.label}>Reference Number</Text>

              <View style={globalStyles.inputWrapper}>
                <Search size={18} color="#94a3b8" />

                <TextInput
                  style={globalStyles.input}
                  placeholder="Search Reference..."
                  value={searchRef}
                  onChangeText={setSearchRef}
                />
              </View>
            </View>

            {/* Start Date */}

            <View style={styles.inputGroup}>
              <Text style={globalStyles.label}>Start Date</Text>

              <Pressable
                style={globalStyles.inputWrapper}
                onPress={() => {
                  setCalendarType("start");
                  setShowCalendar(true);
                }}
              >
                <Text style={styles.dateText}>{formatDate(startDate)}</Text>
                <CalendarIcon size={18} color="#94a3b8" />
              </Pressable>
            </View>

            {/* End Date */}

            <View style={styles.inputGroup}>
              <Text style={globalStyles.label}>End Date</Text>

              <Pressable
                style={globalStyles.inputWrapper}
                onPress={() => {
                  setCalendarType("end");
                  setShowCalendar(true);
                }}
              >
                <Text style={styles.dateText}>{formatDate(endDate)}</Text>
                <CalendarIcon size={18} color="#94a3b8" />
              </Pressable>
            </View>

            <Button onPress={handleSearch} loading={loading}>
              Search
            </Button>

            <Button icon={Download} onPress={handleDownload}>
              Export CSV
            </Button>
          </View>

          {downloadError ? (
            <View style={styles.errorBox}>
              <AlertCircle size={14} color="#ef4444" />

              <Text style={styles.errorText}>{downloadError}</Text>
            </View>
          ) : null}

          {/* TABLE */}

          <View style={globalStyles.table}>
            <View style={globalStyles.tableHeader}>
              <Text style={[globalStyles.th, { flex: 1 }]}>Entity Id</Text>
              <Text style={[globalStyles.th, { flex: 1 }]}>Entity Type</Text>
              <Text style={[globalStyles.th, { flex: 1 }]}>Policy Id</Text>
              <Text style={[globalStyles.th, { flex: 1 }]}>Retry</Text>
              <Text style={[globalStyles.th, { flex: 1 }]}>Request</Text>
              <Text style={[globalStyles.th, { flex: 1 }]}>Response</Text>
            </View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              style={styles.resultsScroll}
            >
              {failedLogs.slice(0, 20).length > 0 ? (
                failedLogs.slice(0, 20).map((log) => (
                  <View key={log.Id} style={globalStyles.tableRow}>
                    <Text style={[globalStyles.td, { flex: 1 }]}>
                      {log.EntityId}
                    </Text>

                    <Text style={[globalStyles.td, { flex: 1 }]}>
                      {log.EntityType}
                    </Text>

                    <Text style={[globalStyles.td, { flex: 1 }]}>
                      {log.PolicyId}
                    </Text>

                    <Text style={[globalStyles.td, { flex: 1 }]}>
                      {log.RetryCount}
                    </Text>

                    <Pressable
                      style={{ flex: 1 }}
                      onPress={() => {
                        setSelectedLog(log.RequestJson);
                        setShowJson(true);
                      }}
                    >
                      <Text style={globalStyles.td}>View</Text>
                    </Pressable>

                    <Pressable
                      style={{ flex: 1 }}
                      onPress={() => {
                        setSelectedLog(log.ResponseJson);
                        setShowJson(true);
                      }}
                    >
                      <Text style={globalStyles.td}>View</Text>
                    </Pressable>
                  </View>
                ))
              ) : (
                <View style={styles.emptyRow}>
                  <Text style={styles.emptyText}>No failed cases found.</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </Card>

      {/* CALENDAR POPUP */}

      <Modal visible={showCalendar} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 420,
              backgroundColor: "white",
              borderRadius: 12,
              padding: 15,
            }}
          >
            <Calendar
              onDayPress={(day) => {
                const selected = new Date(day.dateString);

                if (calendarType === "start") {
                  setStartDate(selected);
                } else {
                  setEndDate(selected);
                }

                setShowCalendar(false);
              }}
              markedDates={{
                [formatDate(startDate)]: {
                  selected: true,
                  selectedColor: "#6366f1",
                },
                [formatDate(endDate)]: {
                  selected: true,
                  selectedColor: "#22c55e",
                },
              }}
            />

            <Pressable
              onPress={() => setShowCalendar(false)}
              style={{
                marginTop: 10,
                padding: 10,
                backgroundColor: "#6366f1",
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* JSON MODAL */}

      <JsonViewerModal
        visible={showJson}
        Json={JSON.parse(selectedLog)}
        onClose={() => setShowJson(false)}
      />
    </View>
  );
};
