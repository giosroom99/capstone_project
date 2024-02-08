import { useState, useEffect } from "react";
import { api } from "../../utils/apiCall";
import fakeConvo from "../../fake/Chat.json";

const Chat = ({ managerId, employeeId, onSubmitMessage }) => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const senderID = "employee_1";
  const isManager = true;

  useEffect(() => {
    const container = document.getElementById("chat-container");
    container.scrollTop = container.scrollHeight;
  }, [conversation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await api.get("/api/chat");
        // const chatData = await response;
        setConversation(fakeConvo);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(fakeConvo);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = {
      sender_ID: employeeId,
      recipient_ID: managerId,
      message_text: message,
      timestamp: new Date(),
      is_manager_response: false,
      is_read: true,
    };

    setConversation([...conversation, newMessage]);

    await onSubmitMessage(newMessage);

    setMessage("");
  };

  return (
    <div className="container bg-dark border border-2 rounded mt-3">
      <div
        id="chat-container"
        className="mb-3"
        style={{
          maxHeight: "350px",
          overflowY: "auto",
        }}
      >
        {conversation
          .slice()

          .map((msg) => (
            <div
              key={msg.chat_ID}
              className={
                msg.sender_ID !== senderID
                  ? "alert alert-secondary"
                  : "alert alert-primary"
              }
            >
              {msg.message_text}
              <p
                className={`${
                  msg.sender_ID !== senderID
                    ? "text-sm-start pt-1 "
                    : "text-sm-end pt-1 "
                } fw-bold font-monospace  fs-6`}
              >
                {" "}
                {msg.timestamp}
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
