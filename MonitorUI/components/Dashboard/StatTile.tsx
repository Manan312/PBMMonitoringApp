import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '../UI/Card';
import { statTileStyles as styles } from '../../styles/statTileStyle';

interface StatTileProps {
  label: string;
  value: string | number;
  icon: any;
  color: string;
  bg: string;
}

export const StatTile = ({ label, value, icon: Icon, color, bg }: StatTileProps) => (
  <Card style={styles.card}>
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: bg }]}>
        <Icon size={24} color={color} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  </Card>
);
