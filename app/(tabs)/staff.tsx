import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from '@/components/ui/Header';
import StatusBadge from '@/components/ui/StatusBadge';
import { Clock, User, Calendar, Phone, Plus, MapPin } from 'lucide-react-native';

export default function Staff() {
  const [selectedView, setSelectedView] = useState('schedule');

  const staffMembers = [
    {
      id: 1,
      name: 'Alice Johnson',
      role: 'Head Chef',
      phone: '+1 234-567-8900',
      email: 'alice@restaurant.com',
      status: 'active' as const,
      shift: 'Morning',
      hoursThisWeek: 38,
      clockedIn: true,
      clockInTime: '6:00 AM',
      avatar: 'AJ'
    },
    {
      id: 2,
      name: 'Bob Martinez',
      role: 'Server',
      phone: '+1 234-567-8901',
      email: 'bob@restaurant.com',
      status: 'active' as const,
      shift: 'Evening',
      hoursThisWeek: 32,
      clockedIn: true,
      clockInTime: '4:00 PM',
      avatar: 'BM'
    },
    {
      id: 3,
      name: 'Carol Smith',
      role: 'Manager',
      phone: '+1 234-567-8902',
      email: 'carol@restaurant.com',
      status: 'active' as const,
      shift: 'Full Day',
      hoursThisWeek: 45,
      clockedIn: false,
      clockInTime: null,
      avatar: 'CS'
    },
    {
      id: 4,
      name: 'David Chen',
      role: 'Kitchen Assistant',
      phone: '+1 234-567-8903',
      email: 'david@restaurant.com',
      status: 'active' as const,
      shift: 'Morning',
      hoursThisWeek: 28,
      clockedIn: true,
      clockInTime: '7:00 AM',
      avatar: 'DC'
    },
  ];

  const todaySchedule = [
    { time: '6:00 AM - 2:00 PM', staff: ['Alice Johnson', 'David Chen'], shift: 'Morning' },
    { time: '2:00 PM - 10:00 PM', staff: ['Bob Martinez', 'Carol Smith'], shift: 'Evening' },
    { time: '10:00 PM - 6:00 AM', staff: ['Night Staff'], shift: 'Night' },
  ];

  const weeklyPerformance = [
    { name: 'Alice Johnson', rating: 4.8, ordersCompleted: 156, avgTime: '12 min' },
    { name: 'Bob Martinez', rating: 4.6, ordersCompleted: 89, avgTime: '8 min' },
    { name: 'Carol Smith', rating: 4.9, ordersCompleted: 45, avgTime: '15 min' },
    { name: 'David Chen', rating: 4.5, ordersCompleted: 134, avgTime: '10 min' },
  ];

  const views = [
    { key: 'schedule', label: 'Schedule' },
    { key: 'performance', label: 'Performance' },
    { key: 'timecard', label: 'Time Cards' },
  ];

  const renderScheduleView = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Today's Schedule</Text>
      <View style={styles.scheduleList}>
        {todaySchedule.map((schedule, index) => (
          <View key={index} style={styles.scheduleCard}>
            <View style={styles.scheduleHeader}>
              <Text style={styles.scheduleTime}>{schedule.time}</Text>
              <Text style={styles.scheduleShift}>{schedule.shift} Shift</Text>
            </View>
            <View style={styles.staffList}>
              {schedule.staff.map((staff, staffIndex) => (
                <View key={staffIndex} style={styles.staffBadge}>
                  <Text style={styles.staffBadgeText}>{staff}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderPerformanceView = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Weekly Performance</Text>
      <View style={styles.performanceList}>
        {weeklyPerformance.map((performance, index) => (
          <View key={index} style={styles.performanceCard}>
            <View style={styles.performanceHeader}>
              <Text style={styles.performanceName}>{performance.name}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingValue}>★ {performance.rating}</Text>
              </View>
            </View>
            <View style={styles.performanceStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{performance.ordersCompleted}</Text>
                <Text style={styles.statLabel}>Orders</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{performance.avgTime}</Text>
                <Text style={styles.statLabel}>Avg Time</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderTimecardView = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Staff Clock Status</Text>
      <View style={styles.staffList}>
        {staffMembers.map((staff) => (
          <View key={staff.id} style={styles.staffCard}>
            <View style={styles.staffHeader}>
              <View style={styles.staffInfo}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{staff.avatar}</Text>
                </View>
                <View style={styles.staffDetails}>
                  <Text style={styles.staffName}>{staff.name}</Text>
                  <Text style={styles.staffRole}>{staff.role}</Text>
                  <View style={styles.staffContact}>
                    <Phone size={12} color="#6B7280" />
                    <Text style={styles.contactText}>{staff.phone}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.statusContainer}>
                <StatusBadge status={staff.clockedIn ? 'active' : 'pending'} size="small" />
                {staff.clockedIn && staff.clockInTime && (
                  <Text style={styles.clockTime}>In: {staff.clockInTime}</Text>
                )}
              </View>
            </View>
            
            <View style={styles.staffStats}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>This Week</Text>
                <Text style={styles.statValue}>{staff.hoursThisWeek}h</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Shift</Text>
                <Text style={styles.statValue}>{staff.shift}</Text>
              </View>
            </View>

            <View style={styles.staffActions}>
              <TouchableOpacity style={[styles.actionButton, styles.scheduleButton]}>
                <Calendar size={16} color="#1E40AF" />
                <Text style={styles.scheduleButtonText}>Schedule</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.timecardButton]}>
                <Clock size={16} color="#059669" />
                <Text style={styles.timecardButtonText}>Timecard</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderContent = () => {
    switch (selectedView) {
      case 'schedule': return renderScheduleView();
      case 'performance': return renderPerformanceView();
      case 'timecard': return renderTimecardView();
      default: return renderTimecardView();
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Staff Management" subtitle={`${staffMembers.length} team members`} />
      
      {/* View Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        <View style={styles.filterTabs}>
          {views.map((view) => (
            <TouchableOpacity
              key={view.key}
              style={[
                styles.filterTab,
                selectedView === view.key && styles.activeFilterTab
              ]}
              onPress={() => setSelectedView(view.key)}
            >
              <Text style={[
                styles.filterText,
                selectedView === view.key && styles.activeFilterText
              ]}>
                {view.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderContent()}
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  scheduleList: {
    gap: 12,
  },
  scheduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scheduleTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  scheduleShift: {
    fontSize: 12,
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  staffList: {
    gap: 12,
  },
  staffBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  staffBadgeText: {
    fontSize: 14,
    color: '#1E40AF',
    fontWeight: '500',
  },
  performanceList: {
    gap: 12,
  },
  performanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  performanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  performanceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  ratingContainer: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400E',
  },
  performanceStats: {
    flexDirection: 'row',
    gap: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  staffCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  staffHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  staffInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1E40AF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  staffDetails: {
    flex: 1,
  },
  staffName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  staffRole: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  staffContact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  contactText: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  clockTime: {
    fontSize: 12,
    color: '#059669',
    marginTop: 4,
    fontWeight: '500',
  },
  staffStats: {
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  staffActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
  },
  scheduleButton: {
    backgroundColor: '#DBEAFE',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  scheduleButtonText: {
    color: '#1E40AF',
    fontWeight: '600',
    fontSize: 14,
  },
  timecardButton: {
    backgroundColor: '#D1FAE5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  timecardButtonText: {
    color: '#059669',
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