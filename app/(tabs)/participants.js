import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking, Animated } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Phone, Check, X } from 'lucide-react-native';
import { MOCK_PARTICIPANTS } from '../data/participants';

export default function ParticipantsScreen() {
  const { eventId } = useLocalSearchParams();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadParticipants();
  }, [eventId]);

  const loadParticipants = async () => {
    try {
      // In a real app, fetch participants from Google Sheets API
      setParticipants(MOCK_PARTICIPANTS);
    } catch (error) {
      console.error('Error loading participants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = (participantId) => {
    setParticipants((current) =>
      current.map((p) =>
        p.id === participantId ? { ...p, checkedIn: !p.checkedIn } : p
      )
    );
    // In a real app, update Google Sheets
  };

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const CheckInButton = ({ participant }) => {
    const [animation] = useState(new Animated.Value(0));

    const handlePress = () => {
      handleCheckIn(participant.id);
      Animated.spring(animation, {
        toValue: participant.checkedIn ? 0 : 1,
        useNativeDriver: true,
      }).start();
    };

    const scale = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.9],
    });

    return (
      <TouchableOpacity onPress={handlePress}>
        <Animated.View
          style={[
            styles.checkInButton,
            participant.checkedIn && styles.checkedInButton,
            { transform: [{ scale }] }
          ]}
        >
          {participant.checkedIn ? (
            <View style={styles.checkInContent}>
              <Check size={20} color="#fff" />
              <Text style={styles.checkInText}>Checked In</Text>
            </View>
          ) : (
            <View style={styles.checkInContent}>
              <X size={20} color="#fff" />
              <Text style={styles.checkInText}>Check In</Text>
            </View>
          )}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderParticipant = ({ item }) => (
    <View style={styles.participantCard}>
      <View style={styles.participantInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <TouchableOpacity
          style={styles.phoneButton}
          onPress={() => handleCall(item.phone)}>
          <Phone size={16} color="#007AFF" />
          <Text style={styles.phone}>{item.phone}</Text>
        </TouchableOpacity>
        <View style={styles.ticketInfo}>
          <Text style={styles.ticketType}>{item.ticketType}</Text>
          <Text style={styles.amount}>{item.amountToPay}</Text>
        </View>
      </View>
      <CheckInButton participant={item} />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading participants...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={participants}
        renderItem={renderParticipant}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  list: {
    padding: 16,
    gap: 16,
  },
  participantCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  participantInfo: {
    flex: 1,
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  phone: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#007AFF',
  },
  ticketInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ticketType: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  amount: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
  },
  checkInButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 16,
    minWidth: 100,
    alignItems: 'center',
  },
  checkedInButton: {
    backgroundColor: '#34C759',
  },
  checkInContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  checkInText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
});