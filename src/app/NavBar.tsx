import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

const NAV_THINGY = [
  { name: 'Home', icon: 'home', place: '/Home/Home' },
  { name: "Tourneys", icon: 'trophy', place: '/Tourneys/Tourneys' },
  { name: 'Speechdrop', icon: 'mic', place: '/Speechdrop/Speechdrop' },
  { name: 'Messages', icon: 'chatbubbles', place: '/Messages/Messages' },
  { name: 'Account', icon: 'person', place: '/Account/Account' },
] as const;

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {NAV_THINGY.map((thing) => {
        const isActive = pathname.includes(thing.place) || pathname.includes(thing.name);
        let coloor = '#8E8E93';
        let nameee = "" + thing.icon + "-outline"
        if (isActive){
            coloor =    '#0080ff';
            nameee = thing.icon;
          }
          
        return (
          <Pressable
            key={thing.name}
            style={styles.navItem}
            onPress={() => router.push(thing.place)}
          >
            <Ionicons
              name={nameee}
              size={24}
              color={coloor}
              style={styles.icon}
            />
            <Text style={[styles.navText, isActive && styles.navTextActive]}>
              {thing.name}
            </Text>
            {isActive && <View style={styles.activeIndicator} />}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10, 
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60, 
  },
  icon: {
    marginBottom: 4,
  },
  navText: {
    fontSize: 10,
    color: '#8E8E93',
    fontWeight: '500',
  },
  navTextActive: {
    color: '#0080ff',
    fontWeight: 'bold',
  },
  activeIndicator: {
    width: 4,
    height: 4,
    backgroundColor: '#0080ff',
    borderRadius: 5,
    marginTop: 4,
  }
});