import React from 'react';
import { View, Text } from 'react-native';
import { cardStyles as styles } from '../../styles/cardStyle';

interface CardProps {
  children: React.ReactNode;
  style?: any;
  title?: string;
}

export const Card = ({ children, style, title }: CardProps) => (
  <View style={[styles.card, style]}>
    {title && (
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
    )}
    <View style={styles.content}>
      {children}
    </View>
  </View>
);
