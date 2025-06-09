import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatusBadgeProps {
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled' | 'confirmed' | 'active';
  size?: 'small' | 'medium';
}

export default function StatusBadge({ status, size = 'medium' }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return { color: '#F59E0B', backgroundColor: '#FEF3C7', text: 'Pending' };
      case 'preparing':
        return { color: '#3B82F6', backgroundColor: '#DBEAFE', text: 'Preparing' };
      case 'ready':
        return { color: '#059669', backgroundColor: '#D1FAE5', text: 'Ready' };
      case 'completed':
        return { color: '#059669', backgroundColor: '#D1FAE5', text: 'Completed' };
      case 'cancelled':
        return { color: '#DC2626', backgroundColor: '#FEE2E2', text: 'Cancelled' };
      case 'confirmed':
        return { color: '#059669', backgroundColor: '#D1FAE5', text: 'Confirmed' };
      case 'active':
        return { color: '#3B82F6', backgroundColor: '#DBEAFE', text: 'Active' };
      default:
        return { color: '#6B7280', backgroundColor: '#F3F4F6', text: 'Unknown' };
    }
  };

  const config = getStatusConfig();
  const isSmall = size === 'small';

  return (
    <View style={[
      styles.container,
      { backgroundColor: config.backgroundColor },
      isSmall && styles.small
    ]}>
      <Text style={[
        styles.text,
        { color: config.color },
        isSmall && styles.smallText
      ]}>
        {config.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  small: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  smallText: {
    fontSize: 10,
  },
});