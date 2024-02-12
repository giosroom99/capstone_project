import Chat from "./chat";
import { api } from "../../utils/apiCall";
import Analysis from "./sentimentAnalysis";
import { useEffect, useState } from "react";

const ChatComponent = () => {
  let isManager = false;
  const [userData, setUserData] = useState();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await api.get(`/user/${userId}`);
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, []);

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

  if (!userData) {
    return (
      <div>
        <h1>no data here </h1>
      </div>
    );
  }

  if (userData.role === "Manager") {
    isManager = true;
  }

  return (
    <div className="container">
      <h1 className="">
        {isManager === true ? (
          <i className="bi bi-incognito"></i>
        ) : (
          "Anonymous Chat"
        )}
      </h1>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <Chat
            userData={userData}
            loggedInUser={userId}
            onSubmitMessage={handleSubmitMessage}
          />
        </div>
        {isManager === true ? (
          <div className="col-md-2">
            <h5 className="text-center">Positivity Analyzer</h5>
            <Analysis />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
