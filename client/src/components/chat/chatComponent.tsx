import Chat from "./chat";
import { api } from "../../utils/apiCall";

const ChatComponent = () => {
  const managerId = "yourManagerId";
  const employeeId = "yourEmployeeId";
  const isManager = true;

  const handleSubmitMessage = async (newMessage) => {
    try {
      const response = api.post("/api/chat", newMessage);

      if (!response.ok) {
        throw new Error("Failed to submit message");
      }
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };

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
        <div className="col-9">
          <Chat
            managerId={managerId}
            employeeId={employeeId}
            onSubmitMessage={handleSubmitMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
