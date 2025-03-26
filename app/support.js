import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Mail, Phone, MessageCircle } from 'lucide-react-native';
import { useNavigation } from 'expo-router';

export default function SupportScreen() {
  const navigation = useNavigation();

  const supportOptions = [
    {
      icon: <Mail size={20} color="#007AFF" />,
      title: 'Email Support',
      description: 'Get help via email',
      action: () => Linking.openURL('mailto:support@eventsapp.com')
    },
    {
      icon: <Phone size={20} color="#007AFF" />,
      title: 'Call Support',
      description: 'Speak with our support team',
      action: () => Linking.openURL('tel:+1234567890')
    },
    {
      icon: <MessageCircle size={20} color="#007AFF" />,
      title: 'Live Chat',
      description: 'Chat with us in real-time',
      action: () => navigation.navigate('/chat-support')
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.introText}>
            We're here to help! Choose your preferred support method below.
          </Text>

          {supportOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionCard}
              onPress={option.action}>
              <View style={styles.optionIcon}>
                {option.icon}
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>
            </TouchableOpacity>
          ))}

          <Text style={styles.faqText}>
            Check our FAQ section for quick answers to common questions.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    padding: 16,
  },
  introText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
    color: '#666',
    marginBottom: 24,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
  },
  optionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  faqText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
});