import { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Check, X } from 'lucide-react-native';
import { MOCK_PARTICIPANTS } from './data/events';
import ToggleSwitch from './components/ToggleSwitch';

export default function EventDetail() {
  const [participants, setParticipants] = useState(MOCK_PARTICIPANTS);

  const handleCheckIn = (participantId) => {
    setParticipants((current) =>
      current.map((p) =>
        p.id === participantId ? { ...p, checkedIn: !p.checkedIn } : p
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://picsum.photos/id/1018/400/300' }}
        style={styles.headerImage}
        resizeMode="cover"
      />
      <View style={styles.header}>
        <Text style={styles.title}>Florence Tour</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerText, { width: 100 }]}>Name</Text>
            <Text style={[styles.headerText, { width: 100 }]}>Phone</Text>
            <Text style={[styles.headerText, { width: 100 }]}>Date</Text>
            <Text style={[styles.headerText, { width: 80 }]}>Amount to Pay</Text>
            <Text style={[styles.headerText, { width: 100 }]}>Payment Completed</Text>
            <Text style={[styles.headerText, { width: 80 }]}>Check-in Status</Text>
            <Text style={[styles.headerText, { width: 80 }]}>Check-in</Text>
          </View>

          {participants.map((participant) => (
            <View key={participant.id} style={styles.tableRow}>
              <Text style={[styles.cell, { width: 120 }]}>{participant.name}</Text>
              <Text style={[styles.cell, { width: 100 }]}>{participant.phone}</Text>
              <Text style={[styles.cell, { width: 100 }]}>
                {new Date(participant.date).toLocaleDateString()}
              </Text>
              <Text style={[styles.cell, { width: 80 }]}>{participant.amountToPay}</Text>

              {/* Wrap text inside <Text> */}
              <View style={[styles.statusCell, { width: 100 }]}>
                <Text>{participant.paymentCompleted ? 'Yes' : 'No'}</Text>
              </View>

              <View style={[styles.statusCell, { width: 80 }]}>
                {participant.checkedIn ? (
                  <Check size={16} color="#34C759" />
                ) : (
                  <X size={16} color="#FF3B30" />
                )}
              </View>

              {/* Corrected JSX comment syntax */}
              {/* Check-in button with ToggleSwitch */}
              <View style={{ width: 80 }}>
                <ToggleSwitch
                  value={participant.checkedIn}
                  onValueChange={() => handleCheckIn(participant.id)}
                  style={{ width: 64, height: 32 }}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  headerImage: {
    width: '100%',
    height: 200,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#000',
  },
  table: {
    margin: 0,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  tableHeader: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#F2F2F7',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#666',
    flex: 1,
    textAlign: 'center',
  },
  cell: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  statusCell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
