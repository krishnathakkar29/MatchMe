import { getAuthUserId } from "@/actions/authAction";
import { getMessageThread } from "@/actions/messageAction";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "@/components/pages/members/chat/chat-form";
import MessageBox from "@/components/pages/members/chat/message-box";

export default async function ChatPage({
  params,
}: {
  params: { userId: string };
}) {
  const messages = await getMessageThread(params.userId);
  const userId = await getAuthUserId();
  return (
    <>
      <CardInnerWrapper
        header="Chat"
        body={
          <>
            <div>
              {messages.length === 0 ? (
                "No messages to display"
              ) : (
                <div>
                  {messages.map((message) => (
                    <MessageBox
                      key={message.id}
                      message={message}
                      currentUserId={userId}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        }
        footer={<ChatForm />}
      />
    </>
  );
}
