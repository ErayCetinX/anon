import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Home from '../screens/home/Home';
import Question from '../screens/question/Question';

const Index = () => {
  const Stack = createStackNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{gestureEnabled: false, headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Question"
            component={Question}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Index;
