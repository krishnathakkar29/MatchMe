"use client";

import { useCallback, useEffect, useState } from "react";
import MessageBox from "./message-box";
import { MessageDto } from "@/types";
import { pusherClient } from "@/lib/pusher";
import { set } from "date-fns";
import { formatShortDateTime } from "@/lib/util";

type Props = {
  initialMessages: {
    messages: MessageDto[];
    readCount: number;
  };
  currentUserId: string;
  chatId: string;
};

const MessageList = ({ initialMessages, chatId, currentUserId }: Props) => {
  const [messages, setMessages] = useState(initialMessages.messages);

  const handleNewMessage = useCallback((message: MessageDto) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  const handleMessageRead = useCallback((messageIds: string[]) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        messageIds.includes(message.id)
          ? {
              ...message,
              dateRead: formatShortDateTime(new Date()),
            }
          : message
      )
    );
  }, []);

  useEffect(() => {
    const channel = pusherClient.subscribe(chatId);
    channel.bind("message:new", handleNewMessage);
    channel.bind("messages:read", handleMessageRead);

    return () => {
      channel.unsubscribe();
      channel.unbind("messages:read", handleMessageRead);
      channel.unbind("message:new", handleNewMessage);
    };
  }, [chatId]);

  return (
    <div>
      {messages.length === 0 ? (
        "No messages to display"
      ) : (
        <>
          {messages.map((message) => (
            <MessageBox
              key={message.id}
              message={message}
              currentUserId={currentUserId}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default MessageList;
