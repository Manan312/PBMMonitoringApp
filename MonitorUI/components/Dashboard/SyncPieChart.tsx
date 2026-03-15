import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import { Card } from "../UI/Card";
import { syncPieChartStyles as styles } from "../../styles/syncPieChartStyle";

interface SyncPieChartProps {
  title: string;
  successCount: number;
  failedCount: number;
  pendingCount: number;
}

export const SyncPieChart = ({
  title,
  successCount,
  failedCount,
  pendingCount,
}: SyncPieChartProps) => {
  const total = successCount + failedCount + pendingCount;

  const successPercent = total > 0 ? successCount / total : 0;
  const failedPercent = total > 0 ? failedCount / total : 0;
  const pendingPercent = total > 0 ? pendingCount / total : 0;

  const size = 120;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const successOffset = circumference * (1 - successPercent);
  const failedOffset = circumference * (1 - (successPercent + failedPercent));
  const pendingOffset =
    circumference * (1 - (successPercent + failedPercent + pendingPercent));

  return (
    <Card title={title} style={styles.card}>
      <View style={styles.chartContainer}>
        <Svg width={size} height={size}>
          <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
            {/* Pending */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#facc15"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={pendingOffset}
              fill="transparent"
            />

            {/* Failed */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#ef4444"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={failedOffset}
              fill="transparent"
            />

            {/* Success */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#10b981"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={successOffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </G>
        </Svg>

        <View style={styles.centerText}>
          <Text style={styles.percentText}>
            {Math.round(successPercent * 100)}%
          </Text>
          <Text style={styles.label}>Success</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.statBox}>
          <View style={[styles.dot, { backgroundColor: "#10b981" }]} />
          <View>
            <Text style={styles.statLabel}>Success</Text>
            <Text style={styles.statValue}>{successCount}</Text>
          </View>
        </View>

        <View style={styles.statBox}>
          <View style={[styles.dot, { backgroundColor: "#ef4444" }]} />
          <View>
            <Text style={styles.statLabel}>Failed</Text>
            <Text style={styles.statValue}>{failedCount}</Text>
          </View>
        </View>

        <View style={styles.statBox}>
          <View style={[styles.dot, { backgroundColor: "#facc15" }]} />
          <View>
            <Text style={styles.statLabel}>Pending</Text>
            <Text style={styles.statValue}>{pendingCount}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};
