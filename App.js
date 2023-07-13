// gesture-handler must be imported at the top of the entry file (app.js in this case) before anything else
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { useChatClient } from "./useChatClient";
import { AppProvider } from "./appContext";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { StreamChat } from "stream-chat";
import { StreamChatRN } from "stream-chat-expo"; // this might be the correct version compared to the above line
import { chatApiKey } from "./chatConfig";

const Stack = createStackNavigator();

const HomeScreen = () => <Text>Home Screen</Text>;

const chatClient = StreamChat.getInstance(chatApiKey);

const NavigationStack = () => {
  const { clientIsReady } = useChatClient();

  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>;
  }

  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </Chat>
    </OverlayProvider>
  );
};

export default () => {
  return (
    <AppProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <NavigationStack />
          </NavigationContainer>
        </SafeAreaView>
      </GestureHandlerRootView>
    </AppProvider>
  );
};
