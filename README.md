# Chatroom
Frontend

Create a messaging application that communicates with your backend
Allow users to create a new chatroom
Have pages for the following routes
The homepage ( / ) should be an interface that allows user(s) to see a list of existing chatrooms and be able to enter a new or existing chatroom, characterized by an ID generated by the server (e.g., ABC123).
Routes like ( /ABC123 ) should display the respective chatroom to the user
Prompt user for nickname before they can post in a chatroom
Any previous messages should be displayed to an entering user with most recent messages at the bottom
When in a chatroom, periodically refresh messages (should be a relatively short interval like every 3 seconds)
Each message should show the nickname, text, and datetime it was posted
Allow users to post messages to a chatroom
Backend

Run an Express web server listening on port 8080. Document in the README if you run on another port.
Create API calls for routes (the design and naming is up to you as long as you can satisfy the requirements, but below are some that you might have)
GET / : used for homepage, returns a webpage with all created chatrooms
POST /create : creates a chatroom with roomName , roomName can either be something user provides or randomly generated.
GET /:roomName/messages : Returns all messages for a given chatroom (you can make these messages whatever you want).
As an example, our implementation has the server send the room.html template on the /:roomName route, and then the Javascript for room.html makes a GET request which the server handles with app.get('/:roomname/messages', ...) .
Each generated chatroom should be specified by a unique 6-character alphanumeric identifier.