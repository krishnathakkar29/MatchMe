import { getAuthUserId } from "@/actions/authAction";
import { getMessageThread } from "@/actions/messageAction";
import CardInnerWrapper from "@/providers/card-inner-wrapper";
import ChatForm from "@/components/pages/members/chat/chat-form";
import MessageList from "@/components/pages/members/chat/message-list";
import { createChatId } from "@/lib/util";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const paramsUserID = (await params).userId;
  const messages = await getMessageThread(paramsUserID);
  const userId = await getAuthUserId();
  const chatId = createChatId(userId, paramsUserID);

  return (
    <>
      <CardInnerWrapper
        header="Chat"
        body={
          <MessageList
            currentUserId={userId}
            initialMessages={messages}
            chatId={chatId}
          />
        }
        footer={<ChatForm />}
      />
    </>
  );
}
