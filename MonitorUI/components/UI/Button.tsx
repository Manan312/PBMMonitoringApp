import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { buttonStyles as styles } from '../../styles/buttonStyle';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  icon?: React.ElementType;
  children?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: any;
  loading?: boolean;
}

export const Button = ({ 
  children, 
  onPress, 
  variant = 'primary', 
  style,
  disabled,
  icon: Icon,
  loading,
}: ButtonProps) => {
  const isPrimary = variant === 'primary';
  const isDanger = variant === 'danger';
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';

  return (
    <TouchableOpacity 
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.button,
        isPrimary && styles.primary,
        isSecondary && styles.secondary,
        isDanger && styles.danger,
        isGhost && styles.ghost,
        disabled && styles.disabled,
        style
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary || isDanger ? 'white' : '#4f46e5'} />
      ) : (
        <>
          {Icon && <Icon size={18} color={isPrimary || isDanger ? 'white' : '#475569'} />}
          <Text style={[
            styles.text,
            isPrimary && styles.primaryText,
            isDanger && styles.dangerText,
            isSecondary && styles.secondaryText,
            isGhost && styles.ghostText,
          ]}>
            {children}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};
