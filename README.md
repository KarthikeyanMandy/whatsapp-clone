# Whatsapp Clone

# Frontend

**Packages Used**

MUI - Material-UI is a popular React UI framework that implements Google's Material Design. It offers components for building user interfaces following the Material Design principles.

Axios - A promise-based HTTP client used for making HTTP requests. It can be used both in browsers and Node.js environments.

Emoji-picker-react - A React component library that allows users to pick emojis and incorporate them into applications.

Firebase - Firebase is a platform by Google that provides various services for building web and mobile applications, including authentication, real-time database, hosting, etc.

Pusher-js -  A JavaScript library for working with Pusher, a service that enables real-time communication between servers and clients using WebSockets.

React-router-dom - React Router Dom is used to build single-page applications i.e. applications that have many pages or components but the page is never refreshed instead the content is dynamically fetched based on the URL.

**1)Index.js**

Establishing a root element, rendering the main App component, and enclosing it in a StateProvider for state management constitute the creation of a React application. 

**2)App.js**

If the user is present in local storage, it shows the Home component; if not, it shows the Login component.

**3)Login.js**

Firebase uses Google sign-in capability to authenticate users. After a successful login, the dispatch function updates the state value and stores user information locally.

**4)Home.js**

It consists of a sidebar component that includes the user profile, group lists, add group button, and logout button. When a group is selected from the list, the chat component appears; otherwise, it does not.

**5)Sidebar.js**

It displays a user profile with a menu button, username, and avatar. For every element in the group array, the chat component is shown.

**6)Chats.js**

It features group lists complete with avatars and group names. To remove the group, click the delete button.

**7)Chat.js**

It contains all of the messages for the chosen group along with the group name, avatar, and creation date. You can click the close chat or clear chat buttons to get rid of all of the messages associated with the current chat button. It features a message entry field with an emoji feature. Every communication contains a delete icon that can be clicked.

**8)NoChat.js**

When a member of the group is not chosen in the sidebar component's groups list, it renders.

**9)Modal.js**

An input area is accessible to introduce a new group.

**10)reducer.js**

It has a reducer function to modify the initial state value based on the action parameter.

**11)Stateprovider.js**

It wraps the context provider around its child components and gives them the state value and reducer function.

**12)Axios.js**

To send HTTP requests from browsers, it makes use of the Axios library. It contains headers for the data type to send with the request in addition to the main URL.

**13)firebase.js**

It includes the setup needed to start the Firebase services, including starting the Firebase app, obtaining authentication, and utilizing the Firebase app's Google auth provider.

**14)Service.js**

It has a service object with multiple methods for different kinds of group and message-related API requests.

**15)Style.css**

Every component contains CSS guidelines for how they should look and behave.

# Backend

**Packages Used**

Body Parser - Middleware for Node.js that parses incoming request bodies. It's commonly used to parse data in POST requests.

Cors - Cross-Origin Resource Sharing (CORS) middleware for Node.js, enabling secure communication between different origins in a web browser.

Dotenv - A module that loads environment variables from a .env file into process.env. This helps manage environment-specific configuration settings in Node.js applications.

Express - A fast, minimalist web framework for Node.js. It simplifies the process of building web applications by providing a robust set of features for routing, middleware, and handling HTTP requests and responses.

Mongoose - An elegant MongoDB object modeling tool for Node.js that provides a straightforward schema-based solution to model application data.

Morgan - HTTP request logger middleware for Node.js. It generates logs of incoming HTTP requests, providing details such as request method, URL, status code, and response time.

Pusher -  A library for working with Pusher, a service that facilitates real-time communication between servers and clients using WebSockets. It simplifies the integration of real-time features into applications.

**1)app.js**

It uses a defined router to handle routes, an express server with middleware cors for managing cross-origin requests, Morgan for logging HTTP requests, a body parser for parsing request bodies, and a determined port for listening.

**2).env**

It contains the URL to connect to the MongoDB database and the port number on which the server should listen.

**3)db.js**

It connects to a MongoDB database using the URL from the environment file and the Mongoose library.

**4)pusher.js**

It has a pusher module for real-time data updates and a pusher object with pusher app options.

**5)group.js**

It contains the schema needed to store data in MongoDB collections with a specific structure, particularly for groups including names and timestamps. It has a group model that may be applied to other application modules.

**6)message.js**

It contains the schema needed to organize the data in MongoDB collections, particularly messages that have the following fields: timestamp, userId, groupId, username, and message. It has a group model that may be applied to other application modules.

**7)groupservice.js**

It may be used to create, find one group, find all groups, and delete groups using Mongoose methods in conjunction with MongoDB group collection. For real-time updates, a pusher module is used to initiate events.

**8)messageservice.js**

It can generate, find all messages, delete one message, and interact with MongoDB message collection using a variety of Mongoose methods. For real-time updates, a pusher module is used to initiate events.

**9)routes.js**

It can specify several HTTP routes thanks to its express router. Clients can interact with the routes' API endpoints to carry out tasks like sending messages and forming groups, among other things.
