import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './screens/Main';
import { SafeAreaView } from 'react-native-safe-area-context';
import KeyboardDismiss from './components/KeyboardDismiss';
import { Provider } from 'react-redux';
import store from './store';


const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <KeyboardDismiss>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName='Main'
              screenOptions={{
                contentStyle: {
                  backgroundColor: 'black',
                },
                headerShown: false,
              }}>
              <Stack.Screen name='Main' component={Main} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </KeyboardDismiss>
    </Provider>
  );
}

export default App;
