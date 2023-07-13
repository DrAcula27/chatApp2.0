// gesture-handler must be imported at the top of the entry file (app.js in this case) before anything else
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

const Stack = createStackNavigator();

const HomeScreen = () => <Text>Home Screen</Text>;

const NavigationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <NavigationStack />
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
