import { useState, useEffect } from "react";
import { api } from "../../utils/apiCall";

const Chat = ({ userData, managerId, loggedInUser, onSubmitMessage }) => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const senderID = loggedInUser;

  useEffect(() => {
    const container = document.getElementById("chat-container");
    container.scrollTop = container.scrollHeight;
  }, [conversation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chatData = await api.get(`/user/${loggedInUser}/chat`);
        setConversation(chatData);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchData();
  }, []);

  let receiver = "";
  const oneConvo = conversation[0];
  if (oneConvo) {
    if (oneConvo.recipient_ID === loggedInUser) {
      receiver = oneConvo.sender_ID;
    } else {
      receiver = oneConvo.recipient_ID;
    }
  }

  const handleSubmit = async (e) => {
    let newMessage = {};
    e.preventDefault();
    if (userData.role === "Manager") {
      newMessage = {
        sender_ID: loggedInUser,
        recipient_ID: receiver,
        message_text: message,
        timestamp: new Date(),
        is_manager_response: true,
        is_read: true,
      };
    } else {
      newMessage = {
        sender_ID: loggedInUser,
        recipient_ID: receiver,
        message_text: message,
        timestamp: new Date(),
        is_manager_response: false,
        is_read: true,
      };
    }

    setConversation([...conversation, newMessage]);

    await onSubmitMessage(newMessage);

    setMessage("");
  };

  return (
    <div className="container bg-dark border border-2 rounded mt-1">
      <div
        id="chat-container"
        className="mb-5"
        style={{
          maxHeight: "70vh",
          overflowY: "auto",
        }}
      >
        {conversation.slice().map((msg) => (
          <div
            key={msg.chat_ID}
            className={
              msg.sender_ID !== senderID
                ? "alert alert-secondary"
                : "alert alert-primary"
            }
          >
            <p>{msg.message_text}</p>
            <p
              className={`${
                msg.sender_ID !== senderID
                  ? "text-sm-start pt-1 "
                  : "text-sm-end pt-1 "
              } fw-bold font-monospace  fs-6`}
            >
              {" "}
              {msg.timestamp.$date}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Chat;
