"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { FaFileContract } from "react-icons/fa";

interface MessageUIProps {
  targetUserId: string;
}

const dummyUserData = {
  id: "abc123",
  name: "Jane Doe",
  avatar: "https://i.pravatar.cc/150?img=1",
};

const dummyUsers = [
  { id: "user1", name: "Jhon Doe", role: "Client" },
  { id: "user2", name: "Jane Doe", role: "" },
  { id: "user3", name: "Crypto Dev", role: "" },
];

export default function MessageUI({ targetUserId }: MessageUIProps) {
  const [messages, setMessages] = useState([
    { from: "them", text: "Hello there!", time: "10:00 AM" },
    { from: "me", text: "Hey! How are you?", time: "10:03 AM" },
  ]);
  const [newMsg, setNewMsg] = useState("");
  const [showModal, setShowModal] = useState(false);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setMessages([...messages, { from: "me", text: newMsg, time: "Now" }]);
    setNewMsg("");
  };

  const containerStyle =
    "bg-white/80 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-gray-700 shadow-md transition-all duration-300";

  return (
    <div className="p-4 pt-9 md:p-6 h-screen box-border">
      {showModal && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setShowModal(false)}
        />
      )}

      {showModal && (
        <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Send Smart Contract</h3>
          <input placeholder="Project Title" className="w-full p-2 border rounded mb-2" />
          <input placeholder="Milestone" className="w-full p-2 border rounded mb-2" />
          <input placeholder="Amount (USDC)" className="w-full p-2 border rounded mb-4" />
          <button
            onClick={() => setShowModal(false)}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
          >
            Send Contract
          </button>
        </div>
      )}

      <div className={`flex flex-col md:flex-row rounded-2xl overflow-hidden h-full max-h-[700px] ${containerStyle}`}>
        <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r dark:border-gray-700 p-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Chat</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Chatting with user ID:</p>
          <p className="text-base font-medium text-gray-700 dark:text-white break-words mb-4">
            {targetUserId}
          </p>

          <ul className="space-y-2">
            {dummyUsers.map((user) => (
              <li
                key={user.id}
                className="flex items-center justify-between gap-3 p-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/150?img=3"
                    alt={user.name}
                    className="w-9 h-9 rounded-full border"
                  />
                  <span className="text-gray-800 dark:text-white text-sm font-medium">
                    {user.name}
                  </span>
                </div>
                {user.role && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                    {user.role}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>


        <div className="flex-1 flex flex-col">

          <div className="flex items-center gap-3 p-4 border-b dark:border-gray-700">
            <img
              src={dummyUserData.avatar}
              className="w-10 h-10 rounded-full"
              alt={dummyUserData.name}
            />
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">{dummyUserData.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Active now</p>
            </div>
          </div>

  
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-4 py-2 rounded-2xl text-sm max-w-[80%] ${
                    m.from === "me"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                  }`}
                >
                  <p>{m.text}</p>
                  <p className="text-[10px] text-right mt-1 opacity-70">{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={sendMessage}
            className="flex items-center gap-2 p-4 border-t dark:border-gray-700"
          >
            <input
              type="text"
              placeholder="Type a message..."
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              className="flex-1 px-4 py-2 rounded-full border dark:border-gray-600 dark:bg-gray-700 bg-white dark:text-white text-gray-900"
            />
            <button
              type="submit"
              className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
            >
              <Send className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              title="Send Smart Contract"
            >
              <FaFileContract size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
