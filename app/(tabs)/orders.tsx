import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from '@/components/ui/Header';
import StatusBadge from '@/components/ui/StatusBadge';
import { Clock, MapPin, Phone, Plus } from 'lucide-react-native';

export default function Orders() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const orders = [
    {
      id: '#1247',
      customer: 'John Smith',
      phone: '+1 234-567-8900',
      type: 'Dine-in',
      table: 'Table 5',
      items: [
        { name: 'Grilled Salmon', quantity: 1, price: 24.99 },
        { name: 'Caesar Salad', quantity: 1, price: 12.50 },
        { name: 'Lemon Cake', quantity: 1, price: 8.99 },
      ],
      total: 46.48,
      status: 'ready' as const,
      time: '12:34 PM',
      notes: 'Extra lemon on the side'
    },
    {
      id: '#1246',
      customer: 'Sarah Johnson',
      phone: '+1 234-567-8901',
      type: 'Takeout',
      table: null,
      items: [
        { name: 'Margherita Pizza', quantity: 2, price: 16.99 },
        { name: 'Garlic Bread', quantity: 1, price: 6.99 },
      ],
      total: 40.97,
      status: 'preparing' as const,
      time: '12:28 PM',
      notes: 'No olives please'
    },
    {
      id: '#1245',
      customer: 'Mike Wilson',
      phone: '+1 234-567-8902',
      type: 'Delivery',
      table: null,
      address: '123 Oak Street, Apt 4B',
      items: [
        { name: 'Beef Burger', quantity: 1, price: 14.99 },
        { name: 'Sweet Potato Fries', quantity: 1, price: 7.99 },
        { name: 'Chocolate Shake', quantity: 1, price: 5.99 },
      ],
      total: 28.97,
      status: 'pending' as const,
      time: '12:25 PM',
      notes: 'Ring doorbell twice'
    },
  ];

  const filters = [
    { key: 'all', label: 'All Orders', count: orders.length },
    { key: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
    { key: 'preparing', label: 'Preparing', count: orders.filter(o => o.status === 'preparing').length },
    { key: 'ready', label: 'Ready', count: orders.filter(o => o.status === 'ready').length },
  ];

  const filteredOrders = selectedFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedFilter);

  return (
    <View style={styles.container}>
      <Header title="Orders" subtitle={`${orders.length} active orders`} />
      
      {/* Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        <View style={styles.filterTabs}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterTab,
                selectedFilter === filter.key && styles.activeFilterTab
              ]}
              onPress={() => setSelectedFilter(filter.key)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter.key && styles.activeFilterText
              ]}>
                {filter.label} ({filter.count})
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.ordersList}>
          {filteredOrders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              {/* Order Header */}
              <View style={styles.orderHeader}>
                <View style={styles.orderHeaderLeft}>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <View style={styles.orderTime}>
                    <Clock size={14} color="#6B7280" />
                    <Text style={styles.timeText}>{order.time}</Text>
                  </View>
                </View>
                <StatusBadge status={order.status} />
              </View>

              {/* Customer Info */}
              <View style={styles.customerInfo}>
                <Text style={styles.customerName}>{order.customer}</Text>
                <View style={styles.customerDetails}>
                  <View style={styles.detailRow}>
                    <Phone size={14} color="#6B7280" />
                    <Text style={styles.detailText}>{order.phone}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <MapPin size={14} color="#6B7280" />
                    <Text style={styles.detailText}>
                      {order.type} {order.table ? `• ${order.table}` : ''}
                      {order.address ? `• ${order.address}` : ''}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Order Items */}
              <View style={styles.orderItems}>
                {order.items.map((item, index) => (
                  <View key={index} style={styles.orderItem}>
                    <Text style={styles.itemQuantity}>{item.quantity}x</Text>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                  </View>
                ))}
              </View>

              {/* Order Notes */}
              {order.notes && (
                <View style={styles.orderNotes}>
                  <Text style={styles.notesLabel}>Notes:</Text>
                  <Text style={styles.notesText}>{order.notes}</Text>
                </View>
              )}

              {/* Order Total */}
              <View style={styles.orderTotal}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalAmount}>${order.total.toFixed(2)}</Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                {order.status === 'pending' && (
                  <>
                    <TouchableOpacity style={[styles.actionButton, styles.acceptButton]}>
                      <Text style={styles.acceptButtonText}>Accept Order</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, styles.rejectButton]}>
                      <Text style={styles.rejectButtonText}>Reject</Text>
                    </TouchableOpacity>
                  </>
                )}
                {order.status === 'preparing' && (
                  <TouchableOpacity style={[styles.actionButton, styles.readyButton]}>
                    <Text style={styles.readyButtonText}>Mark Ready</Text>
                  </TouchableOpacity>
                )}
                {order.status === 'ready' && (
                  <TouchableOpacity style={[styles.actionButton, styles.completeButton]}>
                    <Text style={styles.completeButtonText}>Complete Order</Text>
                  </TouchableOpacity>
                )}
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
  ordersList: {
    padding: 20,
    gap: 16,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orderId: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  orderTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#6B7280',
  },
  customerInfo: {
    marginBottom: 12,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  customerDetails: {
    gap: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  orderItems: {
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    width: 30,
  },
  itemName: {
    fontSize: 14,
    color: '#111827',
    flex: 1,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  orderNotes: {
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#92400E',
  },
  orderTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#059669',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#059669',
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  rejectButton: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  rejectButtonText: {
    color: '#DC2626',
    fontWeight: '600',
  },
  readyButton: {
    backgroundColor: '#1E40AF',
  },
  readyButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  completeButton: {
    backgroundColor: '#059669',
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
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