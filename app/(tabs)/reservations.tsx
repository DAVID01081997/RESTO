import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from '@/components/ui/Header';
import StatusBadge from '@/components/ui/StatusBadge';
import { Calendar, Clock, Users, Phone, Plus } from 'lucide-react-native';

export default function Reservations() {
  const [selectedDate, setSelectedDate] = useState('today');

  const tables = [
    { id: 1, number: 1, seats: 2, status: 'available' },
    { id: 2, number: 2, seats: 4, status: 'occupied' },
    { id: 3, number: 3, seats: 2, status: 'reserved' },
    { id: 4, number: 4, seats: 6, status: 'available' },
    { id: 5, number: 5, seats: 4, status: 'occupied' },
    { id: 6, number: 6, seats: 8, status: 'available' },
    { id: 7, number: 7, seats: 2, status: 'available' },
    { id: 8, number: 8, seats: 4, status: 'reserved' },
  ];

  const reservations = [
    {
      id: 'R001',
      customerName: 'Emma Thompson',
      phone: '+1 234-567-8900',
      date: 'Today',
      time: '7:00 PM',
      guests: 4,
      table: 3,
      status: 'confirmed' as const,
      notes: 'Birthday celebration'
    },
    {
      id: 'R002',
      customerName: 'James Rodriguez',
      phone: '+1 234-567-8901',
      date: 'Today',
      time: '7:30 PM',
      guests: 2,
      table: 8,
      status: 'confirmed' as const,
      notes: 'Window seat preferred'
    },
    {
      id: 'R003',
      customerName: 'Lisa Chen',
      phone: '+1 234-567-8902',
      date: 'Today',
      time: '8:00 PM',
      guests: 6,
      table: null,
      status: 'pending' as const,
      notes: 'Business dinner'
    },
    {
      id: 'R004',
      customerName: 'Michael Brown',
      phone: '+1 234-567-8903',
      date: 'Tomorrow',
      time: '6:00 PM',
      guests: 3,
      table: null,
      status: 'pending' as const,
      notes: ''
    },
  ];

  const getTableStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#059669';
      case 'occupied': return '#DC2626';
      case 'reserved': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getTableStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Available';
      case 'occupied': return 'Occupied';
      case 'reserved': return 'Reserved';
      default: return 'Unknown';
    }
  };

  const todayReservations = reservations.filter(r => r.date === 'Today');
  const upcomingReservations = reservations.filter(r => r.date !== 'Today');

  return (
    <View style={styles.container}>
      <Header title="Table Management" subtitle={`${tables.filter(t => t.status === 'available').length} tables available`} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Floor Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Floor Plan</Text>
          <View style={styles.floorPlan}>
            {tables.map((table) => (
              <TouchableOpacity key={table.id} style={styles.tableContainer}>
                <View style={[
                  styles.table,
                  { borderColor: getTableStatusColor(table.status) }
                ]}>
                  <Text style={styles.tableNumber}>{table.number}</Text>
                  <Text style={styles.tableSeats}>{table.seats} seats</Text>
                </View>
                <Text style={[
                  styles.tableStatus,
                  { color: getTableStatusColor(table.status) }
                ]}>
                  {getTableStatusText(table.status)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Table Legend */}
        <View style={styles.section}>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#059669' }]} />
              <Text style={styles.legendText}>Available</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#DC2626' }]} />
              <Text style={styles.legendText}>Occupied</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
              <Text style={styles.legendText}>Reserved</Text>
            </View>
          </View>
        </View>

        {/* Today's Reservations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Reservations</Text>
          <View style={styles.reservationsList}>
            {todayReservations.map((reservation) => (
              <View key={reservation.id} style={styles.reservationCard}>
                <View style={styles.reservationHeader}>
                  <View>
                    <Text style={styles.customerName}>{reservation.customerName}</Text>
                    <View style={styles.reservationDetails}>
                      <View style={styles.detailItem}>
                        <Clock size={14} color="#6B7280" />
                        <Text style={styles.detailText}>{reservation.time}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Users size={14} color="#6B7280" />
                        <Text style={styles.detailText}>{reservation.guests} guests</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Phone size={14} color="#6B7280" />
                        <Text style={styles.detailText}>{reservation.phone}</Text>
                      </View>
                    </View>
                  </View>
                  <StatusBadge status={reservation.status} />
                </View>
                
                {reservation.table && (
                  <View style={styles.tableAssignment}>
                    <Text style={styles.assignedTable}>Table {reservation.table}</Text>
                  </View>
                )}
                
                {reservation.notes && (
                  <View style={styles.reservationNotes}>
                    <Text style={styles.notesText}>{reservation.notes}</Text>
                  </View>
                )}
                
                <View style={styles.reservationActions}>
                  {reservation.status === 'pending' && (
                    <>
                      <TouchableOpacity style={[styles.actionButton, styles.confirmButton]}>
                        <Text style={styles.confirmButtonText}>Confirm</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.actionButton, styles.assignButton]}>
                        <Text style={styles.assignButtonText}>Assign Table</Text>
                      </TouchableOpacity>
                    </>
                  )}
                  {reservation.status === 'confirmed' && (
                    <>
                      <TouchableOpacity style={[styles.actionButton, styles.checkinButton]}>
                        <Text style={styles.checkinButtonText}>Check In</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.actionButton, styles.modifyButton]}>
                        <Text style={styles.modifyButtonText}>Modify</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Upcoming Reservations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Reservations</Text>
          <View style={styles.reservationsList}>
            {upcomingReservations.map((reservation) => (
              <View key={reservation.id} style={styles.reservationCard}>
                <View style={styles.reservationHeader}>
                  <View>
                    <Text style={styles.customerName}>{reservation.customerName}</Text>
                    <View style={styles.reservationDetails}>
                      <View style={styles.detailItem}>
                        <Calendar size={14} color="#6B7280" />
                        <Text style={styles.detailText}>{reservation.date}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Clock size={14} color="#6B7280" />
                        <Text style={styles.detailText}>{reservation.time}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Users size={14} color="#6B7280" />
                        <Text style={styles.detailText}>{reservation.guests} guests</Text>
                      </View>
                    </View>
                  </View>
                  <StatusBadge status={reservation.status} />
                </View>
                
                {reservation.notes && (
                  <View style={styles.reservationNotes}>
                    <Text style={styles.notesText}>{reservation.notes}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
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
  floorPlan: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tableContainer: {
    alignItems: 'center',
    width: '22%',
  },
  table: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  tableNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  tableSeats: {
    fontSize: 10,
    color: '#6B7280',
  },
  tableStatus: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#6B7280',
  },
  reservationsList: {
    gap: 12,
  },
  reservationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  reservationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  reservationDetails: {
    gap: 4,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  tableAssignment: {
    backgroundColor: '#DBEAFE',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  assignedTable: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E40AF',
  },
  reservationNotes: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  notesText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  reservationActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#059669',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  assignButton: {
    backgroundColor: '#DBEAFE',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  assignButtonText: {
    color: '#1E40AF',
    fontWeight: '600',
    fontSize: 14,
  },
  checkinButton: {
    backgroundColor: '#1E40AF',
  },
  checkinButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  modifyButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  modifyButtonText: {
    color: '#374151',
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