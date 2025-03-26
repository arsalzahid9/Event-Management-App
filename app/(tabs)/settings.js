import { View, Text, TouchableOpacity, StyleSheet, Alert, Switch } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogOut, User, Bell, Lock, HelpCircle } from 'lucide-react-native';
import { useState } from 'react';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('guideEmail');
      router.replace('/(auth)/login');
    } catch (error) {
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  const settingsItems = [
    {
      icon: <User size={20} color="#007AFF" />,
      title: 'Account Settings',
      onPress: () => router.push('/account-settings'),
    },
    {
      icon: <Bell size={20} color="#007AFF" />,
      title: 'Notifications',
      rightComponent: (
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={notificationsEnabled ? '#007AFF' : '#f4f3f4'}
        />
      ),
    },
    {
      icon: <Lock size={20} color="#007AFF" />,
      title: 'Privacy & Security',
      onPress: () => router.push('/privacy'),
    },
    {
      icon: <HelpCircle size={20} color="#007AFF" />,
      title: 'Help & Support',
      onPress: () => router.push('/support'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.settingsList}>
        {settingsItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.settingItem}
            onPress={item.onPress}>
            <View style={styles.iconContainer}>
              {item.icon}
            </View>
            <Text style={styles.settingText}>{item.title}</Text>
            {item.rightComponent && (
              <View style={styles.rightComponent}>
                {item.rightComponent}
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={20} color="#FF3B30" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    padding: 16,
  },
  settingsList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  iconContainer: {
    width: 24,
    marginRight: 12,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#000',
  },
  rightComponent: {
    marginLeft: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});