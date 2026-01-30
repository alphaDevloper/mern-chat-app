import React from "react";
import useAuthStore from "../store/useAuthStore";

function ChatPage() {
  const { logout } = useAuthStore();
  return (
    <div className="z-10">
      <h1>This is chat page</h1>
      <button onClick={logout} className="cursor-pointer">
        Log out
      </button>
    </div>
  );
}

export default ChatPage;
