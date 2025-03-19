import { getMessagesByContainer } from "@/actions/messageAction";
import MessageSidebar from "@/components/pages/messages/message-sidebar";
import MessageTable from "@/components/pages/messages/message-table";
import React from "react";

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ container: string }>;
}) {
  const searchParr = (await searchParams).container;
  const messages = await getMessagesByContainer(searchParr);

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
