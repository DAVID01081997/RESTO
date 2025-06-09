import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from '@/components/ui/Header';
import MetricCard from '@/components/ui/MetricCard';
import { TrendingUp, DollarSign, ShoppingCart, Users, Clock, Star, Calendar, ChartBar as BarChart3 } from 'lucide-react-native';

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const periods = [
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'year', label: 'This Year' },
  ];

  const salesData = {
    week: {
      revenue: '$18,749',
      change: '+12.5%',
      orders: 324,
      orderChange: '+18',
      avgOrder: '$57.87',
      avgChange: '+$3.42',
      customers: 287,
      customerChange: '+23'
    }
  };

  const topDishes = [
    { name: 'Grilled Salmon', orders: 45, revenue: '$1,125', percentage: 18 },
    { name: 'Margherita Pizza', orders: 38, revenue: '$646', percentage: 15 },
    { name: 'Caesar Salad', orders: 32, revenue: '$400', percentage: 12 },
    { name: 'Beef Burger', orders: 28, revenue: '$420', percentage: 10 },
    { name: 'Chicken Parmesan', orders: 24, revenue: '$480', percentage: 9 },
  ];

  const hourlyData = [
    { hour: '11 AM', orders: 8, revenue: 456 },
    { hour: '12 PM', orders: 15, revenue: 875 },
    { hour: '1 PM', orders: 22, revenue: 1240 },
    { hour: '2 PM', orders: 18, revenue: 1020 },
    { hour: '3 PM', orders: 12, revenue: 680 },
    { hour: '4 PM', orders: 9, revenue: 510 },
    { hour: '5 PM', orders: 16, revenue: 920 },
    { hour: '6 PM', orders: 25, revenue: 1450 },
    { hour: '7 PM', orders: 30, revenue: 1750 },
    { hour: '8 PM', orders: 28, revenue: 1620 },
    { hour: '9 PM', orders: 20, revenue: 1150 },
    { hour: '10 PM', orders: 14, revenue: 820 },
  ];

  const maxOrders = Math.max(...hourlyData.map(h => h.orders));

  const customerInsights = [
    { metric: 'New Customers', value: '23', change: '+15%', type: 'positive' as const },
    { metric: 'Returning Customers', value: '264', change: '+8%', type: 'positive' as const },
    { metric: 'Average Rating', value: '4.8', change: '+0.2', type: 'positive' as const },
    { metric: 'Customer Satisfaction', value: '94%', change: '+3%', type: 'positive' as const },
  ];

  const getMaxValue = () => {
    return Math.max(...topDishes.map(dish => dish.orders));
  };

  return (
    <View style={styles.container}>
      <Header title="Analytics" subtitle="Business insights and performance" />
      
      {/* Period Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        <View style={styles.filterTabs}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.key}
              style={[
                styles.filterTab,
                selectedPeriod === period.key && styles.activeFilterTab
              ]}
              onPress={() => setSelectedPeriod(period.key)}
            >
              <Text style={[
                styles.filterText,
                selectedPeriod === period.key && styles.activeFilterText
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Key Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.metricsGrid}>
            <MetricCard
              title="Revenue"
              value={salesData.week.revenue}
              change={salesData.week.change}
              changeType="positive"
              icon={DollarSign}
              iconColor="#059669"
            />
            <MetricCard
              title="Orders"
              value={salesData.week.orders.toString()}
              change={salesData.week.orderChange}
              changeType="positive"
              icon={ShoppingCart}
              iconColor="#3B82F6"
            />
            <MetricCard
              title="Avg Order"
              value={salesData.week.avgOrder}
              change={salesData.week.avgChange}
              changeType="positive"
              icon={TrendingUp}
              iconColor="#F59E0B"
            />
            <MetricCard
              title="Customers"
              value={salesData.week.customers.toString()}
              change={salesData.week.customerChange}
              changeType="positive"
              icon={Users}
              iconColor="#8B5CF6"
            />
          </View>
        </View>

        {/* Top Dishes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Performing Dishes</Text>
          <View style={styles.dishesCard}>
            {topDishes.map((dish, index) => (
              <View key={index} style={styles.dishItem}>
                <View style={styles.dishInfo}>
                  <Text style={styles.dishName}>{dish.name}</Text>
                  <Text style={styles.dishStats}>
                    {dish.orders} orders • {dish.revenue}
                  </Text>
                </View>
                <View style={styles.dishPerformance}>
                  <View style={styles.performanceBar}>
                    <View style={[
                      styles.performanceFill,
                      { width: `${(dish.orders / getMaxValue()) * 100}%` }
                    ]} />
                  </View>
                  <Text style={styles.dishPercentage}>{dish.percentage}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Hourly Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hourly Performance</Text>
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartSubtitle}>Orders by Hour</Text>
              <View style={styles.chartLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
                  <Text style={styles.legendText}>Orders</Text>
                </View>
              </View>
            </View>
            <View style={styles.barChart}>
              {hourlyData.map((data, index) => (
                <View key={index} style={styles.barContainer}>
                  <View style={styles.barColumn}>
                    <View style={[
                      styles.bar,
                      { 
                        height: `${(data.orders / maxOrders) * 100}%`,
                        backgroundColor: '#3B82F6'
                      }
                    ]} />
                  </View>
                  <Text style={styles.barLabel}>{data.hour}</Text>
                  <Text style={styles.barValue}>{data.orders}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Customer Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Insights</Text>
          <View style={styles.insightsGrid}>
            {customerInsights.map((insight, index) => (
              <View key={index} style={styles.insightCard}>
                <Text style={styles.insightValue}>{insight.value}</Text>
                <Text style={styles.insightMetric}>{insight.metric}</Text>
                <Text style={[
                  styles.insightChange,
                  { color: insight.type === 'positive' ? '#059669' : '#DC2626' }
                ]}>
                  {insight.change}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Metrics</Text>
          <View style={styles.statsCard}>
            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Clock size={16} color="#6B7280" />
                <Text style={styles.statLabel}>Avg Wait Time</Text>
              </View>
              <Text style={styles.statValue}>12 min</Text>
            </View>
            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Star size={16} color="#6B7280" />
                <Text style={styles.statLabel}>Customer Rating</Text>
              </View>
              <Text style={styles.statValue}>4.8/5</Text>
            </View>
            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <BarChart3 size={16} color="#6B7280" />
                <Text style={styles.statLabel}>Peak Hour</Text>
              </View>
              <Text style={styles.statValue}>7:00 PM</Text>
            </View>
            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Users size={16} color="#6B7280" />
                <Text style={styles.statLabel}>Table Turnover</Text>
              </View>
              <Text style={styles.statValue}>2.3x</Text>
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
  filterContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 12,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  activeFilterTab: {
    backgroundColor: '#1E40AF',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  dishesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dishItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dishInfo: {
    flex: 1,
  },
  dishName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  dishStats: {
    fontSize: 14,
    color: '#6B7280',
  },
  dishPerformance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: 120,
  },
  performanceBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
  },
  performanceFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 3,
  },
  dishPercentage: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    minWidth: 30,
    textAlign: 'right',
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  chartLegend: {
    flexDirection: 'row',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
  },
  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
    paddingHorizontal: 4,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  barColumn: {
    height: 80,
    width: 16,
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 2,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 10,
    color: '#6B7280',
    transform: [{ rotate: '-45deg' }],
  },
  barValue: {
    fontSize: 10,
    fontWeight: '600',
    color: '#111827',
  },
  insightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  insightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
  },
  insightValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  insightMetric: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
  insightChange: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
});