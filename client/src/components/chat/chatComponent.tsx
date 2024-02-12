import Chat from "./chat";
import { api } from "../../utils/apiCall";
import Analysis from "./sentimentAnalysis";
import { useEffect, useState } from "react";

const ChatComponent = () => {
  let isManager = false;
  const [userData, setUserData] = useState();
  const [conversationData, setConversationData] = useState();
  const [selectedUser, setSelectedUser] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const dataUser = await api.get(`/user/${userId}`);
        const conversationData = await api.get(`/user/${userId}/chat`);
        setUserData(dataUser);
        setConversationData(conversationData);
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, [userId, selectedUser]); // Add selectedUser as a dependency

  const handleSubmitMessage = async (newMessage) => {
    try {
      const response = api.post("/chat", newMessage);
      if (!response.ok) {
        throw new Error("Failed to submit message");
      }
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };

  const handleListItemClick = (selectedUserId) => {
    setSelectedUser(selectedUserId);
  };

  if (!userData && !conversationData) {
    return (
      <div>
        <h1>no data here </h1>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="">
        {userData.role === "Manager" ? (
          <i className="bi bi-incognito"></i>
        ) : (
          "Anonymous Chat"
        )}
      </h1>
      <Chat
        userData={userData}
        employeeID={userData.role === "Manager" ? selectedUser : null}
        onSubmitMessage={handleSubmitMessage}
      />
      {userData.role === "Manager" && (
        <div className="">
          <ol className="list-group list-group-numbered">
            {conversationData.map((chat, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-start"
                onClick={() => handleListItemClick(chat.sender_ID)}
                style={{ cursor: "pointer" }}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    Mysterious <i className="bi bi-incognito"></i>
                  </div>
                  A private feedback
                </div>
                <span className="badge bg-dark rounded-pill">
                  <i className="bi bi-incognito"></i>
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
