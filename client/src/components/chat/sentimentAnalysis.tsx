import React from "react";

const Analysis = ({ conversationList }) => {
  if (!conversationList || conversationList.length === 0) {
    return (
      <div className="container">
        <div>No data available.</div>
      </div>
    );
  }

  const mostRecentChat = getMostRecentChat(conversationList);
  const positiveRate = countSentiment(conversationList);
  const mostRecentConvoRate = countSentiment(
    groupChatsByMostRecentDate(conversationList)
  );

  return (
    <div className="container">
      <div className="card text-center" style={{ width: "18rem" }}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Last Message:{" "}
            <span
              className={
                mostRecentChat.sentiment === "Positive"
                  ? "fw-bold text-success"
                  : "fw-bold text-danger"
              }
            >
              {mostRecentChat.sentiment}
            </span>
          </li>
          <li className="list-group-item">
            Most recent conversation:{" "}
            <span
              className={
                mostRecentConvoRate > 89
                  ? "fw-bold text-success"
                  : "fw-bold text-danger"
              }
            >
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
        <div className="card-footer bg-dark">Card footer</div>
      </div>
    </div>
  );
};

const getMostRecentChat = (chatList) => {
  if (!chatList || chatList.length === 0) {
    return { sentiment: null };
  }

  const sortedChats = chatList.sort(
    (a, b) => Number(new Date(b.timestamp)) - Number(new Date(a.timestamp))
  );

  return sortedChats[0];
};

const groupChatsByMostRecentDate = (chatList) => {
  if (!chatList || chatList.length === 0) {
    return [];
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
    return 0; // Return 0 when the list is empty
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

  if (positiveCount + negativeCount === 0) {
    return 0; // Return 0 when both counts are zero
  }

  const positiveRate = positiveCount / (negativeCount + positiveCount);

  return positiveRate !== 1 ? positiveRate : 0;
};

export default Analysis;
