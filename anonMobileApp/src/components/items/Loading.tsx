import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator color={'#050505'} size={40} />
      <Text style={{color: '#050505', fontSize: 16}}>Loading...</Text>
    </View>
  );
};

export default Loading;
