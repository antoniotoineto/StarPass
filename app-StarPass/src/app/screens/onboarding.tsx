import { Link } from 'expo-router';
import React, { useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OnboardingScreen() {

  return (
    <View style={styles.container}>
      <Text>Aooo</Text>
      <Link href='/screens/getEntryCode'>Simbora</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 50,
    backgroundColor: '#fff',
  }
});
