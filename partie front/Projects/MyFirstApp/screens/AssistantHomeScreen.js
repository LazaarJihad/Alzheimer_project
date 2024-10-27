import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AssistantHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to Assistant Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AssistantHomeScreen;
