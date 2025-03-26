import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';

export default function EventCard({ event }) {
  const handlePress = () => {
    router.push({
      pathname: '/event-detail',
      params: {
        id: event.id,
        name: event.name,
        date: event.date,
        origin: event.origin,
        participantsCount: event.participantsCount,
        image: event.image
      }
    });
  };

  return (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={handlePress}>
      <Image
        source={{ uri: event.image }}
        style={styles.eventImage}
        resizeMode="cover"
      />
      <View style={styles.eventContent}>
        <Text style={styles.eventName}>{event.name}</Text>
        <Text style={styles.eventDate}>
          {new Date(event.date).toLocaleDateString()}
        </Text>
        <View style={styles.eventFooter}>
          <Text style={styles.origin}>{event.origin}</Text>
          <Text style={styles.participants}>
            {event.participantsCount} participants
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  eventContent: {
    padding: 16,
    gap: 8,
  },
  eventName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
  },
  eventDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  origin: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#007AFF',
    backgroundColor: '#E5F0FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  participants: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
});