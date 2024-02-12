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

  if (userData.role === "Manager") {
    isManager = true;
    const idsToFilter = userData.employees;

    const uniqueUserIDs = Array.from(
      new Set(
        conversationData.reduce((userIDs, chat) => {
          if (idsToFilter.includes(chat.sender_ID)) {
            userIDs.push(chat.sender_ID);
          }
          if (idsToFilter.includes(chat.recipient_ID)) {
            userIDs.push(chat.recipient_ID);
          }
          return userIDs;
        }, [])
      )
    );

    return (
      <div className="container">
        <h1 className="">
          {isManager === true ? (
            <i className="bi bi-incognito"></i>
          ) : (
            "Anonymous Chat"
          )}
        </h1>
        <div className="">
          <ol className="list-group list-group-numbered">
            {uniqueUserIDs.map((id, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-start"
                onClick={() => handleListItemClick(id)}
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

          {selectedUser && (
            <Chat
              userData={userData}
              employeeID={selectedUser}
              onSubmitMessage={handleSubmitMessage}
            />
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default ChatComponent;
