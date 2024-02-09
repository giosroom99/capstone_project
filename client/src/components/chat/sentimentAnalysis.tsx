import fakeConvo from "../../fake/Chat.json";
export default function Analysis() {
  const mostRecentChat = getMostRecentChat(fakeConvo);

  const positiveRate = countSentiment(fakeConvo);
  const mostRecentConvoRate = countSentiment(
    groupChatsByMostRecentDate(fakeConvo)
  );

  return (
    <div>
      <div className="card text-center" style={{ width: "18rem" }}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Last Message:
            <span
              className={
                mostRecentChat.sentiment === "Positive"
                  ? "fw-bold text-success"
                  : "fw-bold text-danger"
              }
            >
              {" "}
              {mostRecentChat.sentiment}
            </span>
          </li>

          <li className="list-group-item">
            Most recent conversation:
            <span
              className={
                mostRecentConvoRate > 89
                  ? "fw-bold text-success"
                  : "fw-bold text-danger"
              }
            >
              {" "}
              {mostRecentConvoRate} %
            </span>
          </li>

          <li className="list-group-item">
            ALL:{" "}
            <span
              className={
                positiveRate.toFixed(3) * 100 > 89
                  ? "fw-bold text-success"
                  : "fw-bold text-danger"
              }
            >
              {positiveRate.toFixed(3) * 100}%
            </span>
          </li>
        </ul>
        <div className="card-footer">Card footer</div>
      </div>
    </div>
  );
}

const getMostRecentChat = (chatList: any[]) => {
  if (!chatList || chatList.length === 0) {
    return null;
  }

  const sortedChats = chatList.sort(
    (a, b) => Number(new Date(b.timestamp)) - Number(new Date(a.timestamp))
  );

  return sortedChats[0];
};

const groupChatsByMostRecentDate = (chatList) => {
  if (!chatList || chatList.length === 0) {
    return null; // Return null if the list is empty
  }

  const sortedChats = chatList.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const mostRecentDate = new Date(
    sortedChats[0].timestamp
  ).toLocaleDateString();

  const chatsForMostRecentDate = sortedChats.filter(
    (chat) => new Date(chat.timestamp).toLocaleDateString() === mostRecentDate
  );

  const sortedChatsForMostRecentDate = chatsForMostRecentDate.sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  return sortedChatsForMostRecentDate;
};

const countSentiment = (chatList) => {
  if (!chatList || chatList.length === 0) {
    return null;
  }
  let positiveCount = 0;
  let negativeCount = 0;

  for (const chat of chatList) {
    if (chat.sentiment === "Positive") {
      positiveCount++;
    } else if (chat.sentiment === "Negative") {
      negativeCount++;
    }
  }

  const positiveRate = positiveCount / (negativeCount + positiveCount);

  return positiveRate;
};
