import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from '@/components/ui/Header';
import { Package, TriangleAlert as AlertTriangle, Plus, TrendingDown, TrendingUp } from 'lucide-react-native';

export default function Inventory() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { key: 'all', label: 'All Items' },
    { key: 'proteins', label: 'Proteins' },
    { key: 'vegetables', label: 'Vegetables' },
    { key: 'dairy', label: 'Dairy' },
    { key: 'pantry', label: 'Pantry' },
    { key: 'beverages', label: 'Beverages' },
  ];

  const inventoryItems = [
    {
      id: 1,
      name: 'Chicken Breast',
      category: 'proteins',
      currentStock: 12,
      minimumStock: 20,
      unit: 'lbs',
      costPerUnit: 4.50,
      supplier: 'Fresh Foods Co',
      lastUpdated: '2 hours ago',
      status: 'low'
    },
    {
      id: 2,
      name: 'Salmon Fillet',
      category: 'proteins',
      currentStock: 25,
      minimumStock: 15,
      unit: 'lbs',
      costPerUnit: 12.99,
      supplier: 'Ocean Fresh',
      lastUpdated: '4 hours ago',
      status: 'good'
    },
    {
      id: 3,
      name: 'Tomatoes',
      category: 'vegetables',
      currentStock: 8,
      minimumStock: 15,
      unit: 'lbs',
      costPerUnit: 2.49,
      supplier: 'Local Farms',
      lastUpdated: '1 hour ago',
      status: 'low'
    },
    {
      id: 4,
      name: 'Olive Oil',
      category: 'pantry',
      currentStock: 2,
      minimumStock: 5,
      unit: 'bottles',
      costPerUnit: 8.99,
      supplier: 'Mediterranean Imports',
      lastUpdated: '6 hours ago',
      status: 'critical'
    },
    {
      id: 5,
      name: 'Mozzarella Cheese',
      category: 'dairy',
      currentStock: 18,
      minimumStock: 10,
      unit: 'lbs',
      costPerUnit: 6.75,
      supplier: 'Dairy Best',
      lastUpdated: '3 hours ago',
      status: 'good'
    },
    {
      id: 6,
      name: 'Ground Beef',
      category: 'proteins',
      currentStock: 35,
      minimumStock: 25,
      unit: 'lbs',
      costPerUnit: 5.99,
      supplier: 'Premium Meats',
      lastUpdated: '5 hours ago',
      status: 'good'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return '#DC2626';
      case 'low': return '#F59E0B';
      case 'good': return '#059669';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'critical': return 'Critical';
      case 'low': return 'Low Stock';
      case 'good': return 'In Stock';
      default: return 'Unknown';
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? inventoryItems 
    : inventoryItems.filter(item => item.category === selectedCategory);

  const lowStockItems = inventoryItems.filter(item => item.status === 'low' || item.status === 'critical');
  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0);

  return (
    <View style={styles.container}>
      <Header title="Inventory" subtitle={`${inventoryItems.length} items tracked`} />
      
      {/* Summary Cards */}
      <View style={styles.summarySection}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Package size={20} color="#1E40AF" />
          </View>
          <View style={styles.summaryInfo}>
            <Text style={styles.summaryValue}>${totalValue.toFixed(0)}</Text>
            <Text style={styles.summaryLabel}>Total Value</Text>
          </View>
        </View>
        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <AlertTriangle size={20} color="#F59E0B" />
          </View>
          <View style={styles.summaryInfo}>
            <Text style={styles.summaryValue}>{lowStockItems.length}</Text>
            <Text style={styles.summaryLabel}>Low Stock</Text>
          </View>
        </View>
        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <TrendingUp size={20} color="#059669" />
          </View>
          <View style={styles.summaryInfo}>
            <Text style={styles.summaryValue}>+12%</Text>
            <Text style={styles.summaryLabel}>This Month</Text>
          </View>
        </View>
      </View>

      {/* Category Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        <View style={styles.filterTabs}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.key}
              style={[
                styles.filterTab,
                selectedCategory === category.key && styles.activeFilterTab
              ]}
              onPress={() => setSelectedCategory(category.key)}
            >
              <Text style={[
                styles.filterText,
                selectedCategory === category.key && styles.activeFilterText
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.inventoryList}>
          {filteredItems.map((item) => (
            <View key={item.id} style={styles.inventoryCard}>
              {/* Item Header */}
              <View style={styles.itemHeader}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemSupplier}>{item.supplier}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(item.status) + '15' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: getStatusColor(item.status) }
                  ]}>
                    {getStatusText(item.status)}
                  </Text>
                </View>
              </View>

              {/* Stock Information */}
              <View style={styles.stockInfo}>
                <View style={styles.stockRow}>
                  <Text style={styles.stockLabel}>Current Stock</Text>
                  <Text style={styles.stockValue}>
                    {item.currentStock} {item.unit}
                  </Text>
                </View>
                <View style={styles.stockRow}>
                  <Text style={styles.stockLabel}>Minimum Required</Text>
                  <Text style={styles.stockValue}>
                    {item.minimumStock} {item.unit}
                  </Text>
                </View>
                <View style={styles.stockRow}>
                  <Text style={styles.stockLabel}>Cost per {item.unit}</Text>
                  <Text style={styles.stockValue}>
                    ${item.costPerUnit.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.stockRow}>
                  <Text style={styles.stockLabel}>Total Value</Text>
                  <Text style={[styles.stockValue, styles.totalValue]}>
                    ${(item.currentStock * item.costPerUnit).toFixed(2)}
                  </Text>
                </View>
              </View>

              {/* Stock Level Bar */}
              <View style={styles.stockBar}>
                <View style={styles.stockBarBackground}>
                  <View style={[
                    styles.stockBarFill,
                    {
                      width: `${Math.min((item.currentStock / item.minimumStock) * 100, 100)}%`,
                      backgroundColor: getStatusColor(item.status)
                    }
                  ]} />
                </View>
                <Text style={styles.stockPercentage}>
                  {Math.round((item.currentStock / item.minimumStock) * 100)}%
                </Text>
              </View>

              {/* Last Updated */}
              <Text style={styles.lastUpdated}>
                Last updated: {item.lastUpdated}
              </Text>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity style={[styles.actionButton, styles.updateButton]}>
                  <Text style={styles.updateButtonText}>Update Stock</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.orderButton]}>
                  <Text style={styles.orderButtonText}>Reorder</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  summarySection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  summaryIcon: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  summaryInfo: {
    flex: 1,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
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
  inventoryList: {
    padding: 20,
    gap: 16,
  },
  inventoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  itemSupplier: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  stockInfo: {
    marginBottom: 16,
  },
  stockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  stockLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  stockValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  totalValue: {
    color: '#059669',
    fontSize: 16,
  },
  stockBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  stockBarBackground: {
    flex: 1,
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
  },
  stockBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  stockPercentage: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    minWidth: 35,
    textAlign: 'right',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  updateButtonText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 14,
  },
  orderButton: {
    backgroundColor: '#1E40AF',
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1E40AF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});