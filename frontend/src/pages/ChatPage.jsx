import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser.js";
import { useQuery } from "@tanstack/react-query";
import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { useEffect, useState } from "react";
import { getStreamToken } from "../lib/api.js";
import { StreamChat } from "stream-chat";
import { toast } from "react-hot-toast";

const ChatPage = () => {
  const { id: targetId } = useParams();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true); // default to true

  const { authUser } = useAuthUser();
  const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      setLoading(true);
      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullname,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetId].sort().join("--");

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetId],
        });

        await currChannel.watch();

    
        setChatClient(client);
        setChannel(currChannel);
        setLoading(false);
      } catch (error) {
        console.error("Error initializing chat client:", error);
        toast.error("Failed to initialize chat client. Please try again later.");
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetId]);

  const handleVideoCall = () => {
      if (channel) {
        const callUrl = `${window.location.origin}/call/${channel.id}`;
        channel.sendMessage({
          text: `I've started a video call. Join me here: ${callUrl}`,
        })

        toast.success('Video call link sent successfully');
      }
  }


  if (loading || !channel || !chatClient) return <ChatLoader />;

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall}/>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread/>
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;