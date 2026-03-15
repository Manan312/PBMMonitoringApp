import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Platform,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Pressable,
} from "react-native";
import {
  Clock,
  Activity,
  CheckCircle,
  AlertCircle,
  Search,
  Download,
  X,
  FileText,
  CalendarIcon,
} from "lucide-react-native";
import { Button } from "../components/UI/Button";
import { Card } from "../components/UI/Card";
import { StatTile } from "../components/Dashboard/StatTile";
import { apiService } from "../services/apiService";
import { Calendar } from "react-native-calendars";

import {
  PBMSyncLog,
  PBMStatResponse,
  PBMDenialResponse,
  ApprovalDiagnosisDetails,
  ApprovalServiceDetails,
  ApprovalDetails,
  PBMDailyDumpRequest,
} from "../models/PBMSync";
import { globalStyles } from "../styles/globalStyle";
import { pbmSyncStyles as styles } from "../styles/pbmSyncStyle";
import {
  GetPBMDenialStats,
  GetPBMRequestDetails,
  GetPBMStats,
  GetPBMSyncDailyDump,
  GetPBMSyncData,
} from "../services/utilityServices";
import { showError } from "../services/toastService";

export const PBMSync = () => {
  const [stats, setStats] = useState<PBMStatResponse[]>([]);
  const [denials, setDenials] = useState<PBMDenialResponse[]>([]);
  const [searchParams, setSearchParams] = useState({
    PBMReferenceNo: "",
    LivaReferenceNo: "",
  });
  const [pbmLogs, setpbmLogs] = useState<PBMSyncLog[]>([]);
  const [searchResults, setSearchResults] = useState<ApprovalDetails | null>(
    null,
  );
  const [selectedLog, setSelectedLog] = useState<PBMSyncLog | null>(null);
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 10)),
  );
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);
  const [dumpError, setDumpError] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarType, setCalendarType] = useState<"start" | "end">("start");
  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const [sRes, dRes, lRes] = await Promise.all([
        GetPBMStats(),
        GetPBMDenialStats(),
        GetPBMSyncData(),
      ]);
      if (sRes) {
        setStats(sRes!);
      }
      if (dRes) {
        setDenials(dRes!);
      }
      if (lRes) {
        setpbmLogs(lRes!);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await GetPBMRequestDetails(searchParams);
      setSearchResults(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleSelect = async (log: PBMSyncLog): Promise<void> => {
    setSearchParams((p) => ({ ...p, PBMReferenceNo: log.PBMReferenceNo }));
    setSearchParams((p) => ({ ...p, LivaReferenceNo: log.LivaReferenceNo }));
    handleSearch();
  };
  const downloadDump = async () => {
    if (startDate===null || endDate===null) {
      showError("Please select a date range.");
      return;
    }
    // if (Platform.OS !== "web") {
    //   setDumpError("Export is only available on web.");
    //   return;
    // }
    const data:PBMDailyDumpRequest={StartDate:formatDate(startDate),EndDate:formatDate(endDate)};
    await GetPBMSyncDailyDump(data);
    // const data = await apiService.getPBMDump(dumpRange);
    // const headers = "ID,Status,PBM Ref,Liva Ref,Timestamp\n";
    // const rows = data
    //   .map(
    //     (l: any) =>
    //       `${l.id},${l.status},${l.pbm_reference || ""},${l.liva_reference || ""},${l.timestamp}`,
    //   )
    //   .join("\n");
    // const blob = new Blob([headers + rows], { type: "text/csv" });
    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement("a");
    // a.href = url;
    // a.download = `pbm_sync_dump_${startDate || "all"}.csv`;
    // a.click();
  };

  const statCards = useMemo(() => {
    const requestSent =
      stats.find((s) => s.RequestName === "Request Sent")?.RecordCount || 0;
    const responseRecieved =
      stats.find((s) => s.RequestName === "Response Recieved")?.RecordCount ||
      0;
    const requestApproved =
      stats.find((s) => s.RequestName === "Request Approved")?.RecordCount || 0;
    const requestRejected =
      stats.find((s) => s.RequestName === "Request Rejected")?.RecordCount || 0;
    return [
      {
        label: "Requests Sent",
        value: requestSent,
        icon: Clock,
        color: "#2563eb",
        bg: "#eff6ff",
      },
      {
        label: "Responses Received",
        value: responseRecieved,
        icon: Activity,
        color: "#4f46e5",
        bg: "#eef2ff",
      },
      {
        label: "Records Approved",
        value: requestApproved,
        icon: CheckCircle,
        color: "#10b981",
        bg: "#ecfdf5",
      },
      {
        label: "Records Rejected",
        value: requestRejected,
        icon: AlertCircle,
        color: "#ef4444",
        bg: "#fef2f2",
      },
    ];
  }, [stats]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={globalStyles.title}>PBM Nano Sync Monitoring</Text>
        <Text style={globalStyles.subtitle}>
          Track PBM sync requests, approvals, and rejections.
        </Text>
      </View>

      <View style={styles.statsGrid}>
        {statCards.map((card, i) => (
          <View key={i} style={styles.statWrapper}>
            <StatTile {...card} />
          </View>
        ))}
      </View>

      <Card title="Search Records">
        <View style={styles.searchGrid}>
          <View style={globalStyles.inputWrapper}>
            <Search size={16} color="#94a3b8" style={{ marginRight: 8 }} />
            <TextInput
              style={globalStyles.input}
              placeholder="PBM Reference..."
              value={searchParams.PBMReferenceNo}
              onChangeText={(text) =>
                setSearchParams((p) => ({ ...p, PBMReferenceNo: text }))
              }
            />
          </View>
          <View style={globalStyles.inputWrapper}>
            <Search size={16} color="#94a3b8" style={{ marginRight: 8 }} />
            <TextInput
              style={globalStyles.input}
              placeholder="Liva Reference..."
              value={searchParams.LivaReferenceNo}
              onChangeText={(text) =>
                setSearchParams((p) => ({ ...p, LivaReferenceNo: text }))
              }
            />
          </View>
          <View style={styles.searchWrapper}>
            <Button
              onPress={handleSearch}
              variant="primary"
              loading={loading}
              style={styles.searchButton}
            >
              Search Records
            </Button>
          </View>
        </View>

        <View style={styles.table}>
          <View style={globalStyles.tableHeader}>
            <Text style={[globalStyles.th, { flex: 2 }]}>
              Liva Reference No
            </Text>
            <Text style={[globalStyles.th, { flex: 1 }]}>Status</Text>
            <Text style={[globalStyles.th, { flex: 1 }]}>Created Date</Text>
            <Text style={[globalStyles.th, { flex: 1 }]}>Action</Text>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={styles.resultsScroll}
          >
            {pbmLogs.length > 0 ? (
              pbmLogs.slice(0, 10).map((log) => (
                <View key={log.LivaReferenceNo} style={globalStyles.tableRow}>
                  <Text
                    style={[globalStyles.td, globalStyles.mono, { flex: 2 }]}
                  >
                    {log.LivaReferenceNo}
                  </Text>

                  <View style={{ flex: 1 }}>
                    <View
                      style={[
                        globalStyles.statusBadge,
                        log.Status === "Success"
                          ? { backgroundColor: "#ecfdf5" }
                          : { backgroundColor: "#fef2f2" },
                      ]}
                    >
                      <Text
                        style={[
                          globalStyles.statusText,
                          log.Status === "Success"
                            ? { color: "#059669" }
                            : { color: "#dc2626" },
                        ]}
                      >
                        {log.Status.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={[globalStyles.td, globalStyles.mono, { flex: 1 }]}
                  >
                    {log.CreatedDate}
                  </Text>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => handleSelect(log)}
                      style={styles.detailsButton}
                    >
                      <FileText size={14} color="#4f46e5" />
                      <Text style={styles.detailsButtonText}>Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View style={{ padding: 20, alignItems: "center" }}>
                <Text style={{ color: "#64748b", fontSize: 14 }}>
                  No Records Available
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </Card>

      <Modal
        visible={!!searchResults}
        animationType="slide"
        transparent
        onRequestClose={() => setSearchResults(null)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalContent}>
            {/* HEADER */}
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Detailed Sync Report</Text>
                <Text style={styles.modalSubtitle}>
                  PBM: {searchResults?.PBMReferenceNo} | Liva:{" "}
                  {searchResults?.LivaReferenceNo}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setSearchResults(null)}
                style={styles.closeButton}
              >
                <X size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {searchResults && (
                <View style={styles.modalInner}>
                  {/* SUMMARY */}
                  <View style={styles.summaryGrid}>
                    <View style={styles.summaryItem}>
                      <Text style={styles.summaryLabel}>Denial Code</Text>
                      <Text style={[styles.summaryValue, { color: "#ef4444" }]}>
                        {searchResults!.DenialCode || "N/A"}
                      </Text>
                    </View>

                    <View style={styles.summaryItem}>
                      <Text style={styles.summaryLabel}>Approved Amount</Text>
                      <Text style={[styles.summaryValue, { color: "#10b981" }]}>
                        OMR {searchResults.PBMApprovedAmount?.toFixed(2)}
                      </Text>
                    </View>

                    <View style={styles.summaryItem}>
                      <Text style={styles.summaryLabel}>PBM Comments</Text>
                      <Text style={styles.summaryValue}>
                        {searchResults.PBMComments || "N/A"}
                      </Text>
                    </View>
                  </View>

                  {/* DIAGNOSIS */}
                  <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                      <View style={styles.sectionIndicator} />
                      <Text style={styles.sectionTitle}>
                        Diagnosis Code & Description
                      </Text>
                    </View>

                    <View style={styles.tableBorder}>
                      <View style={styles.tableHeaderRow}>
                        <Text style={[styles.tableTh, { flex: 1 }]}>Code</Text>
                        <Text style={[styles.tableTh, { flex: 3 }]}>
                          Description
                        </Text>
                      </View>

                      {searchResults.ApprovalDiagnosisDetails?.map((d, i) => (
                        <View key={i} style={styles.tableBodyRow}>
                          <Text
                            style={[
                              styles.tableTd,
                              globalStyles.mono,
                              { flex: 1 },
                            ]}
                          >
                            {d.ICDCode}
                          </Text>

                          <Text style={[styles.tableTd, { flex: 3 }]}>
                            {d.Description}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* SERVICES */}
                  <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                      <View style={styles.sectionIndicator} />
                      <Text style={styles.sectionTitle}>
                        Service Code & Description
                      </Text>
                    </View>

                    <View style={styles.tableBorder}>
                      <View style={styles.tableHeaderRow}>
                        <Text style={[styles.tableTh, { flex: 1 }]}>Code</Text>
                        <Text style={[styles.tableTh, { flex: 2 }]}>
                          Description
                        </Text>
                        <Text style={[styles.tableTh, { flex: 0.6 }]}>Qty</Text>
                        <Text style={[styles.tableTh, { flex: 1 }]}>Net</Text>
                      </View>

                      {searchResults.ApprovalServiceDetails?.map((s, i) => (
                        <View key={i} style={styles.tableBodyRow}>
                          <Text
                            style={[
                              styles.tableTd,
                              globalStyles.mono,
                              { flex: 1 },
                            ]}
                          >
                            {s.ServiceCode}
                          </Text>

                          <Text style={[styles.tableTd, { flex: 2 }]}>
                            {s.ServiceDescription}
                          </Text>

                          <Text style={[styles.tableTd, { flex: 0.6 }]}>
                            {s.RequestedQuantity}
                          </Text>

                          <Text
                            style={[
                              styles.tableTd,
                              { fontWeight: "700", flex: 1 },
                            ]}
                          >
                            OMR {s.RequestedNetAmount?.toFixed(2)}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* JSON PAYLOAD */}
                  <View style={styles.jsonGrid}>
                    <View style={styles.jsonItem}>
                      <Text style={styles.jsonLabel}>Request Payload</Text>

                      <View style={styles.jsonBox}>
                        <Text style={styles.jsonText}>
                          {JSON.stringify(
                            JSON.parse(searchResults.RequestJson ?? "{}"),
                            null,
                            2,
                          )}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.jsonItem}>
                      <Text style={styles.jsonLabel}>PBM Response Payload</Text>

                      <View
                        style={[styles.jsonBox, { backgroundColor: "#0f172a" }]}
                      >
                        <Text style={[styles.jsonText, { color: "#60a5fa" }]}>
                          {JSON.stringify(
                            JSON.parse(searchResults.PBMResponseJson ?? "{}"),
                            null,
                            2,
                          )}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.jsonItem}>
                      <Text style={styles.jsonLabel}>Response Payload</Text>

                      <View
                        style={[styles.jsonBox, { backgroundColor: "#0f172a" }]}
                      >
                        <Text style={[styles.jsonText, { color: "#60a5fa" }]}>
                          {JSON.stringify(
                            JSON.parse(searchResults.ResponseJson ?? "{}"),
                            null,
                            2,
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>

      <View style={styles.bottomGrid}>
        <View style={styles.denialWrapper}>
          <Card title="Denial Code Analysis">
            <ScrollView style={styles.denialList}>
              {denials.slice(0, 50).map((d, i) => (
                <View key={i} style={styles.denialItem}>
                  <Text style={styles.denialCode}>{d.DenialCode}</Text>
                  <View style={styles.barContainer}>
                    <View
                      style={[
                        styles.bar,
                        {
                          width: `${(d.RecordCount / Math.max(...denials.map((x) => x.RecordCount))) * 100}%`,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.denialCount}>{d.RecordCount}</Text>
                </View>
              ))}
            </ScrollView>
          </Card>
        </View>

        <View style={styles.dumpWrapper}>
          <Card title="Daily Dump Export">
            <View style={styles.dumpForm}>
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
              <Button onPress={downloadDump} variant="primary" icon={Download}>
                Export Dump (CSV)
              </Button>
              {dumpError ? (
                <View style={styles.errorBox}>
                  <AlertCircle size={14} color="#ef4444" />
                  <Text style={styles.errorText}>{dumpError}</Text>
                </View>
              ) : null}
            </View>
          </Card>
        </View>
      </View>
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
    </View>
  );
};
