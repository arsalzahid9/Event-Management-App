import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function PrivacyPolicyScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.introText}>
            Last updated: October 2023{"\n"}
            At Events App, we're committed to protecting your privacy while providing a seamless event management experience.
          </Text>

          <Section title="1. Event-Related Data">
            We collect information necessary for event management:
            {"\n\n"}• Participant details (name, contact info)
            {"\n"}• Event attendance records
            {"\n"}• Payment information for ticket purchases
          </Section>

          <Section title="2. How We Use Your Data">
            Your information helps us:
            {"\n\n"}• Manage event registrations
            {"\n"}• Process ticket payments
            {"\n"}• Improve event organization
            {"\n"}• Communicate event updates
          </Section>

          <Section title="3. Data Sharing with Event Organizers">
            We share necessary information with:
            {"\n\n"}• Event organizers for attendance management
            {"\n"}• Payment processors for transactions
            {"\n"}• Venue staff for security purposes
          </Section>

          <Section title="4. Your Event Data Rights">
            You can:
            {"\n\n"}• Access your event participation history
            {"\n"}• Request correction of your details
            {"\n"}• Delete your account and associated data
          </Section>

          <Section title="5. Data Security Measures">
            We protect your data with:
            {"\n\n"}• Encrypted data transmission
            {"\n"}• Secure payment processing
            {"\n"}• Regular security audits
          </Section>

          <Text style={styles.contactText}>
            For privacy concerns related to events, contact: {"\n"}
            privacy@eventsapp.com
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionText}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 8,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    margin: 16,
  },
  introText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
    color: '#666',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#007AFF',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
    color: '#444',
  },
  contactText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
    color: '#666',
    marginTop: 24,
    textAlign: 'center',
  },
});