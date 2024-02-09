### Get Data

This should return that specific user's data with their role.
if user is manager, return list of all users reporting to them. Else if user is employee, return their own data + their manager's data.

    /User/:user_id"

This should return all chats record that matches either the recipient_ID or sender_ID

    /Chat/:user_id"

### Post Data

This should add a new chat to the database.

    /chat/NewMessageData

    should be in the format of:
    {
    "chat_ID": "1",
    "sender_ID": "employee_1",
    "recipient_ID": "manager_1",
    "message_text": "Hi, I have a question about the upcoming project.",
    "timestamp": "2024-02-08T12:30:00",
    "is_manager_response": false,
    "is_read": true
    }
