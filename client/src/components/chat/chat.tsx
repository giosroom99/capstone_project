import { useState, useEffect } from "react";
import { api } from "../../utils/apiCall";
import Analysis from "./sentimentAnalysis";

interface ChatProps {
  userData: any;
  employeeID?: string;
  onSubmitMessage: (newMessage: any) => void;
}

const Chat: React.FC<ChatProps> = ({
  userData,
  employeeID,
  onSubmitMessage,
}) => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const senderID = userData.p_id;
  const loggedInUser = localStorage.getItem("userId");

  useEffect(() => {
    const container = document.getElementById("chat-container");
    container.scrollTop = container.scrollHeight;
  }, [conversation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chatData = await api.get(`/user/${employeeID}/chat`);
        setConversation(chatData);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchData();
  }, []);

  const userRole = userData.role;

  let receiver = "";

  // const oneConvo = conversation[0];
  // if (oneConvo) {
  //   receiver = oneConvo.recipient_ID === loggedInUser
  //       ? oneConvo.sender_ID
  //       : oneConvo.recipient_ID;
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userRole === "Employee" && userData.manager_info) {
      receiver = userData.manager_info.user_mngr_assigned_to_role;
    }

    if (userRole === "Manager" && conversation.length > 0) {
      receiver = employeeID ?? "";
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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
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
        </div>
        <div className="col-md-2">
          {userRole === "Manager" ? (
            <div className="col-md-2">
              <h5 className="text-center">Positivity Analyzer</h5>
              <Analysis conversationList={conversation} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
