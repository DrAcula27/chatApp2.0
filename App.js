// gesture-handler must be imported at the top of the entry file (app.js in this case) before anything else
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { useChatClient } from "./useChatClient";
import { AppProvider } from "./appContext";
import {
  Channel,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider,
  Thread,
  ChannelPreviewMessenger,
} from "stream-chat-expo";
import { StreamChat } from "stream-chat";
import { chatApiKey, chatUserId } from "./chatConfig";
import { useAppContext } from "./appContext";

const chatClient = StreamChat.getInstance(chatApiKey);

const CustomListItem = (props) => {
  const { unread } = props;
  const backgroundColor = unread ? "#8fcdea" : "#fff";
  return (
    <View style={{ backgroundColor }}>
      <ChannelPreviewMessenger {...props} />
    </View>
  );
};

const filters = {
  members: {
    $in: [chatUserId],
  },
};

const sort = {
  last_message_at: -1,
};

const ChannelListScreen = ({ navigation }) => {
  const { setChannel } = useAppContext();
  return (
    <ChannelList
      Preview={CustomListItem}
      onSelect={(channel) => {
        setChannel(channel);
        navigation.navigate("ChannelScreen");
      }}
      filters={filters}
      sort={sort}
    />
  );
};

const ChannelScreen = ({ navigation }) => {
  const { channel, setThread } = useAppContext();
  return (
    <Channel channel={channel}>
      <MessageList
        onThreadSelect={(message) => {
          if (channel?.id) {
            setThread(message);
            navigation.navigate("ThreadScreen");
          }
        }}
      />
      <MessageInput />
    </Channel>
  );
};

const ThreadScreen = ({ navigation }) => {
  const { channel, thread } = useAppContext();
  return (
    <Channel channel={channel} thread={thread} threadList>
      <Thread />
      <MessageInput />
    </Channel>
  );
};

const Stack = createStackNavigator();

const chatTheme = {
  channelPreview: {
    container: {
      backgroundColor: "transparent",
    },
  },
};

const NavigationStack = () => {
  const { clientIsReady } = useChatClient();

  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>;
  }

  return (
    <OverlayProvider value={{ theme: chatTheme }}>
      <Chat client={chatClient}>
        <Stack.Navigator>
          <Stack.Screen
            name="ChannelListScreen"
            component={ChannelListScreen}
          />
          <Stack.Screen name="ChannelScreen" component={ChannelScreen} />
          <Stack.Screen name="ThreadScreen" component={ThreadScreen} />
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
