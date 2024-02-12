import { useState, useEffect } from "react";
import { api } from "../../utils/apiCall";

const Chat = ({ userData, loggedInUser, onSubmitMessage }) => {
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
  }, [loggedInUser]);

  const userRole = userData.role;

  let receiver = "";
  const oneConvo = conversation[0];
  if (oneConvo) {
    receiver =
      oneConvo.recipient_ID === loggedInUser
        ? oneConvo.sender_ID
        : oneConvo.recipient_ID;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is an Employee and has a manager assigned
    if (userRole === "Employee" && userData.manager_info) {
      receiver = userData.manager_info.user_mngr_assigned_to_role;
    }

    // Check if the user is a Manager and there is an existing conversation
    if (userRole === "Manager" && conversation.length > 0) {
      const otherUser =
        loggedInUser === conversation[0].sender_ID
          ? conversation[0].recipient_ID
          : conversation[0].sender_ID;

      receiver = otherUser;
    }

    const newMessage = {
      sender_ID: loggedInUser,
      recipient_ID: receiver,
      message_text: message,
      timestamp: new Date(),
      is_manager_response: userRole === "Manager",
      is_read: true,
    };

    setConversation([...conversation, newMessage]);

    await onSubmitMessage(newMessage);

    setMessage("");
  };

  return (
    <div>
      {userRole === "Manager" && conversation.length === 0 ? (
        <div className="container bg-dark border border-2 rounded mt-1">
          <div
            id="chat-container"
            className="mb-5"
            style={{
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            <h1>No messages here</h1>
          </div>
        </div>
      ) : (
        <div className="container bg-dark border border-2 rounded mt-1">
          <div
            id="chat-container"
            className="mb-5"
            style={{
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            {conversation.map((msg) => (
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
                      ? "text-sm-start pt-1"
                      : "text-sm-end pt-1"
                  } fw-bold font-monospace fs-6`}
                >
                  {" "}
                  {new Date(msg.timestamp.$date).toLocaleString()}
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
      )}
    </div>
  );
};

export default Chat;
