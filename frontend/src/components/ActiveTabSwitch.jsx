import React from "react";
import useChatStore from "../store/useChatStore";
import { MessageCircle, Users } from "lucide-react";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab("chats")}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
            activeTab === "chats"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span className="font-medium text-sm">Chats</span>
        </button>
        <button
          onClick={() => setActiveTab("contacts")}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
            activeTab === "contacts"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Users className="w-4 h-4" />
          <span className="font-medium text-sm">Contacts</span>
        </button>
      </div>
    </div>
  );
}

export default ActiveTabSwitch;
