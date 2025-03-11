import { getMessagesByContainer } from "@/actions/messageAction";
import MessageSidebar from "@/components/pages/messages/message-sidebar";
import MessageTable from "@/components/pages/messages/message-table";
import React from "react";

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: { container: string };
}) {
  const messages = await getMessagesByContainer(searchParams.container);

  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh] mt-10">
      <div className="col-span-2">
        <MessageSidebar />
      </div>
      <div className="col-span-10">
        <MessageTable messages={messages} />
      </div>
    </div>
  );
}
