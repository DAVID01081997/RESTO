import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '@/components/ui/Header';
import MetricCard from '@/components/ui/MetricCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { DollarSign, ShoppingCart, Clock, Users, TrendingUp, TriangleAlert as AlertTriangle } from 'lucide-react-native';

export default function Dashboard() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const todayOrders = [
    { id: '#1247', table: 'Table 5', items: 3, total: '$42.50', status: 'ready' as const, time: '2 min ago' },
    { id: '#1246', table: 'Online', items: 2, total: '$28.00', status: 'preparing' as const, time: '5 min ago' },
    { id: '#1245', table: 'Table 2', items: 4, total: '$65.75', status: 'pending' as const, time: '8 min ago' },
  ];

  const lowStock = [
    { item: 'Chicken Breast', current: 12, minimum: 20, unit: 'lbs' },
    { item: 'Olive Oil', current: 2, minimum: 5, unit: 'bottles' },
    { item: 'Tomatoes', current: 8, minimum: 15, unit: 'lbs' },
  ];

  return (
    <View style={styles.container}>
      <Header title="Dashboard" subtitle={currentDate} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Metrics Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Overview</Text>
          <View style={styles.metricsGrid}>
            <MetricCard
              title="Daily Revenue"
              value="$2,847"
              change="+12.5%"
              changeType="positive"
              icon={DollarSign}
              iconColor="#059669"
            />
            <MetricCard
              title="Orders"
              value="47"
              change="+8"
              changeType="positive"
              icon={ShoppingCart}
              iconColor="#3B82F6"
            />
            <MetricCard
              title="Avg Wait Time"
              value="12 min"
              change="-2 min"
              changeType="positive"
              icon={Clock}
              iconColor="#F59E0B"
            />
            <MetricCard
              title="Tables Occupied"
              value="18/24"
              change="75%"
              changeType="neutral"
              icon={Users}
              iconColor="#8B5CF6"
            />
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <Text style={styles.viewAll}>View All</Text>
          </View>
          <View style={styles.card}>
            {todayOrders.map((order) => (
              <View key={order.id} style={styles.orderItem}>
                <View style={styles.orderInfo}>
                  <View style={styles.orderHeader}>
                    <Text style={styles.orderId}>{order.id}</Text>
                    <Text style={styles.orderTime}>{order.time}</Text>
                  </View>
                  <Text style={styles.orderTable}>{order.table} • {order.items} items</Text>
                  <Text style={styles.orderTotal}>{order.total}</Text>
                </View>
                <StatusBadge status={order.status} size="small" />
              </View>
            ))}
          </View>
        </View>

        {/* Low Stock Alert */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.alertHeader}>
              <AlertTriangle size={18} color="#F59E0B" />
              <Text style={[styles.sectionTitle, styles.alertTitle]}>Low Stock Items</Text>
            </View>
            <Text style={styles.viewAll}>Manage</Text>
          </View>
          <View style={styles.card}>
            {lowStock.map((item, index) => (
              <View key={index} style={styles.stockItem}>
                <View style={styles.stockInfo}>
                  <Text style={styles.stockName}>{item.item}</Text>
                  <Text style={styles.stockLevel}>
                    {item.current} {item.unit} remaining (min: {item.minimum})
                  </Text>
                </View>
                <View style={styles.stockStatus}>
                  <View style={[styles.stockBar, { width: '100%' }]}>
                    <View style={[
                      styles.stockProgress,
                      { width: `${(item.current / item.minimum) * 100}%` }
                    ]} />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <TrendingUp size={20} color="#059669" />
              <Text style={styles.statValue}>+18%</Text>
              <Text style={styles.statLabel}>Revenue Growth</Text>
            </View>
            <View style={styles.statItem}>
              <Users size={20} color="#3B82F6" />
              <Text style={styles.statValue}>156</Text>
              <Text style={styles.statLabel}>New Customers</Text>
            </View>
            <View style={styles.statItem}>
              <ShoppingCart size={20} color="#F59E0B" />
              <Text style={styles.statValue}>4.2</Text>
              <Text style={styles.statLabel}>Avg Rating</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  alertTitle: {
    color: '#F59E0B',
  },
  viewAll: {
    fontSize: 14,
    color: '#1E40AF',
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  orderInfo: {
    flex: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  orderTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  orderTable: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
  },
  stockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  stockInfo: {
    flex: 1,
  },
  stockName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  stockLevel: {
    fontSize: 14,
    color: '#6B7280',
  },
  stockStatus: {
    width: 80,
    marginLeft: 16,
  },
  stockBar: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
  },
  stockProgress: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 3,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});