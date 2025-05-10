"use client";

import MessageUI from "./MessageUI";

export default function MessageUIWrapper({ targetUserId }: { targetUserId: string }) {
  return <MessageUI targetUserId={targetUserId} />;
}
