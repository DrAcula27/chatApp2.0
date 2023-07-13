// gesture-handler must be imported at the top of the entry file (app.js in this case) before anything else
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { useChatClient } from "./useChatClient";
import { AppProvider } from "./appContext";
import { Chat, OverlayProvider, ChannelList } from "stream-chat-expo";
import { StreamChat } from "stream-chat";
import { chatApiKey, chatUserId } from "./chatConfig";

const Stack = createStackNavigator();

const filters = {
  members: {
    $in: [chatUserId],
  },
};

const sort = {
  last_message_at: -1,
};

const ChannelListScreen = (props) => {
  return <ChannelList filters={filters} sort={sort} />;
};

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
          <Stack.Screen name="Channel List" component={ChannelListScreen} />
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
