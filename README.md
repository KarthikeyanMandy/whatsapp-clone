# Whatsapp Clone

# Frontend

**1)Index.js**

It sets up a React app by creating a root element, rendering the main App component wrapped in a StateProvider for state management, using a reducer and initialState.

**2)App.js**

It is the main component renders Home component if user exists that stored in local storage otherwise renders Login component.

**3)Login.js**

It uses google-sign functionality with firebase for sign in to the app.It stores the user in local storage after successful login and updates the state value using dispatch function.

**4)Home.js**

It has a sibebar component with user profile, group lists,add group button and logout button.It renders chat component if any group selected in the list of groups otherwise it renders no chat component.

**5)Sidebar.js**

It has user profile with user avatar,user name and a menu button to add group and logout.It renders chats component for all the elements in the groups array.

**6)Chats.js**

It has group lists with group name and group avatar.It has delete button to delete the group.

**7)Chat.js**

It has all messages for the selected group with groupavatar,groupname,group when created , and close chat to close the current chat and clear chat to delete all the messages for the current chat button.It has a input field to send a message with emoji option.It has a delete icon for each message to delete.

**8)NoChat.js**

It renders when anyone of the group is not selected in the groups list in the sidebar component.

**9)Modal.js**

It has a input field to add a new group.

**10)reducer.js**

It has the initial state value and a reducer function to change the state value according to the action parameter.

**11)Stateprovider.js**

It provides the state value and reducer function to its children components wrapped in context provider.

**12)Axios.js**

It uses axios library to make HTTP requests from browsers.It has base url and headers for the data type to sent along the request.

**13)firebase.js**

It contains the configuration for initializing the firebase services such as initialize the firebase app ,get authentication service  and using google auth provider from firebase app.

**14)Service.js**

It has a service object with various methods for different API requests related groups and messages.

**15)Style.css**

It has the css rules for all the components for their appearence and behaviour.

# Backend

**1)app.js**

It sets up express server with middleware cors for cross origin requests, uses defined router for handling routes,using morgan for logging http requests,using body-parser for request body parsing and listens defined port.

**2).env**

It has the port number for the server to listen and has the url to connect the mongodb database.

**3)db.js**

It uses mongoose library to connect to a mongodb database with the url from env file.

**4)pusher.js**

It has pusher module for the real time data updates and has pusher object with configurations of the pusher app.

**5)group.js**

It has the schema for the structure of the data to be stored in mongodb collections especially groups with name and timestamp.It has group model that can be used in other modules of the application.

**6)message.js**

It has the schema for the structure of the data to be stored in mongodb collections especially messages with username,message,userId,groupId and timestamp.It has group model that can be used in other modules of the application.

**7)groupservice.js**

It has different functions uses mongoose methods to interact with mongodb group collection to create,find one group,find all groups and delete group.It uses pusher module to trigger events for the real time updates.

**8)messageservice.js**

It has different functions uses mongoose methods to interact with mongodb message collection to create,find all messages and delete one message and all messages.It uses pusher module to trigger events for the real time updates.

**9)routes.js**

It has an express router to define different HTTP routes.The routes has API endpoints that client can interact with to perform operations like creating groups and message etc.
