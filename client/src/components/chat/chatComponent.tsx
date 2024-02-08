import Chat from "./chat";
import { api } from "../../utils/apiCall";

const ChatComponent = () => {
  const managerId = "yourManagerId";
  const employeeId = "yourEmployeeId";

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
      <h1 className="">anonymous message to Manager Name</h1>
      <div className="row">
        <div className="col-8">
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
