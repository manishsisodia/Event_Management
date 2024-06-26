import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Header from './components/Header';
import './Css/Homepage.css'; // Import your CSS file
import './App.css';
import Forgotpassword from './pages/Forgotpassword';
import Changepassword from './pages/Changepassword';
import HostEvent from './pages/HostEvent';
import EventById from './pages/EventById';
import BookTicket from './pages/BookTicket';
import UpdateEvent from './pages/UpdateEvent';
import Ticket from './pages/Ticket';
import CreateTicket from './pages/CreateTicket';
import Invite from './pages/Invite';
import Notification from './pages/Notification';
import Rsvp from './pages/Rsvp';
import Messages from './pages/Messages';
import Sendmessage from './pages/Sendmessage';
import Feedback from './pages/Feedback';
import Logout from './pages/Logout';
import Myevents from './pages/Myevents';
import Chats from './pages/Chats';
import Sendchat from './pages/Sendchat';
import Session from './pages/Session';
import Createsession from './pages/Createsession';
import SessionAction from './pages/Sessionaction';
import Updatesession from './pages/Updatesession';
import UploadImage from './pages/UploadImage';
import Eventscreatebyme from './pages/Eventscreatebyme';
import Search from './pages/Search';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial state is false, meaning user is not logged in

  return (
    <Router>
      <div>
        <Header isLoggedIn={isLoggedIn} className="header" /> {/* Pass isLoggedIn state */}
        <div className="page-container"> {/* Apply page container styles */}
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> */}
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/forgot_password/" element={<Forgotpassword />} />
            <Route path="/event_management/change_password/:token/" element={<Changepassword />} />
            <Route path="/create_event/" element={<HostEvent />} />
            <Route path="/event/:event_id/" element={<EventById />} />
            <Route path="/book_ticket/:event_id/" element={<BookTicket />} />
            <Route path="/update_event/:event_id/" element={<UpdateEvent />} />
            <Route path="/ticket/:event_id/" element={<Ticket />} />
            <Route path="/create_ticket/:event_id" element={<CreateTicket />} />
            <Route path="/invite/:event_id/" element={<Invite />} />
            <Route path="/notification/:event_id/" element={<Notification />} />
            <Route path="/event_management/rsvp/:event_id/" element={<Rsvp />} />
            <Route path="/messages/" element={<Messages />} />
            <Route path="/send_messages/" element={<Sendmessage />} />
            <Route path="/feedback/:event_id/" element={<Feedback />} />
            <Route path="/my_event" element={<Myevents />} />
            <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/chat/" element={<Chats />} />
            <Route path="/send_chat/" element={<Sendchat />} />
            <Route path="/session/:event_id/" element={<Session />} />
            <Route path="/create_session/:event_id/" element={<Createsession />} />
            <Route path="/session_action/:id/" element={<SessionAction />} />
            <Route path="/update_session/:id/" element={<Updatesession />} />
            <Route path="/upload_image/:event_id/" element={<UploadImage />} />
            <Route path="/create_by_me/" element={<Eventscreatebyme />} />
            <Route path="/search/" element={<Search />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


































// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Registration from './pages/Registration';
// import Header from './components/Header';
// import './Css/Homepage.css'; // Import your CSS file
// import './App.css';
// import Forgotpassword from './pages/Forgotpassword';
// import Changepassword from './pages/Changepassword';
// import HostEvent from './pages/HostEvent';
// import EventById from './pages/EventById';
// import BookTicket from './pages/BookTicket';
// import UpdateEvent from './pages/UpdateEvent';
// import Ticket from './pages/Ticket';
// import CreateTicket from './pages/CreateTicket';
// import Invite from './pages/Invite';
// import Notification from './pages/Notification';
// import Rsvp from './pages/Rsvp';
// import Messages from './pages/Messages';
// import Sendmessage from './pages/Sendmessage';
// import Feedback from './pages/Feedback';
// import Logout from './pages/Logout';
// import Myevents from './pages/Myevents';
// import Chats from './pages/Chats';
// import Sendchat from './pages/Sendchat';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial state is false, meaning user is not logged in

//   return (
//     <Router>
//       <div>
//         <Header isLoggedIn={isLoggedIn} className="header" /> {/* Pass isLoggedIn state */}
//         <div className="page-container"> {/* Apply page container styles */}
//           <Routes>
//             <Route path="/" element={<Home />} />
//             {/* <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> */}
//             <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//             <Route path="/registration" element={<Registration />} />
//             <Route path="/forgot_password/" element={<Forgotpassword />} />
//             <Route path="/event_management/change_password/:token/" element={<Changepassword />} />
//             <Route path="/create_event/" element={<HostEvent />} />
//             <Route path="/event/:event_id/" element={<EventById />} />
//             <Route path="/book_ticket/:event_id/" element={<BookTicket />} />
//             <Route path="/update_event/:event_id/" element={<UpdateEvent />} />
//             <Route path="/ticket/:event_id/" element={<Ticket />} />
//             <Route path="/create_ticket/" element={<CreateTicket />} />
//             <Route path="/invite/" element={<Invite />} />
//             <Route path="/notification/" element={<Notification />} />
//             <Route path="/event_management/rsvp/:event_id/" element={<Rsvp />} />
//             <Route path="/messages/" element={<Messages />} />
//             <Route path="/send_messages/" element={<Sendmessage />} />
//             <Route path="/feedback/:event_id/" element={<Feedback />} />
//             <Route path="/my_event" element={<Myevents />} />
//             <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
//             <Route path="/chat/" element={<Chats />} />
//             <Route path="/send_chat/" element={<Sendchat />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
































// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Registration from './pages/Registration';
// import Header from './components/Header';
// import './Css/Homepage.css'; // Import your CSS file
// import './App.css';
// import Forgotpassword from './pages/Forgotpassword';
// import Changepassword from './pages/Changepassword';
// import HostEvent from './pages/HostEvent';
// import EventById from './pages/EventById';
// import BookTicket from './pages/BookTicket';
// import UpdateEvent from './pages/UpdateEvent';
// import Ticket from './pages/Ticket';
// import CreateTicket from './pages/CreateTicket';
// import Invite from './pages/Invite';
// import Notification from './pages/Notification';
// import Rsvp from './pages/Rsvp';
// import Messages from './pages/Messages';
// import Sendmessage from './pages/Sendmessage';
// import Feedback from './pages/Feedback';
// import Logout from './pages/Logout';
// import Myevents from './pages/Myevents';
// import Chats from './pages/Chats';
// import Sendchat from './pages/Sendchat';

// function App() {
//   return (
//     <Router>
//       <div>
//         <Header className="header" /> {/* Apply header styles */}
//         <div className="page-container"> {/* Apply page container styles */}
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/registration" element={<Registration />} />
//             <Route path="/forgot_password/" element={<Forgotpassword />} />
//             <Route path="/event_management/change_password/:token/" element={<Changepassword />} />
//             <Route path="/create_event/" element={<HostEvent />} />
//             <Route path="/event/:event_id/" element={<EventById />} />
//             <Route path="/book_ticket/:event_id/" element={<BookTicket />} />
//             <Route path="/update_event/:event_id/" element={<UpdateEvent />} />
//             <Route path="/ticket/:event_id/" element={<Ticket />} />
//             <Route path="/create_ticket/" element={<CreateTicket />} />
//             <Route path="/invite/" element={<Invite />} />
//             <Route path="/notification/" element={<Notification />} />
//             <Route path="/event_management/rsvp/:event_id/" element={<Rsvp />} />
//             <Route path="/messages/" element={<Messages />} />
//             <Route path="/send_messages/" element={<Sendmessage />} />
//             <Route path="/feedback/:event_id/" element={<Feedback />} />
//             <Route path="/my_event" element={<Myevents />} />
//             <Route path="/logout" element={<Logout />} />
//             <Route path="/chat/" element={<Chats />} />
//             <Route path="/send_chat/" element={<Sendchat />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;




































// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Registration from './pages/Registration';
// import Header from './components/Header';
// import './Css/Homepage.css'; // Import your CSS file
// import './App.css';
// import Forgotpassword from './pages/Forgotpassword';
// import Changepassword from './pages/Changepassword';
// import HostEvent from './pages/HostEvent';
// import EventById from './pages/EventById';
// import BookTicket from './pages/BookTicket';
// import UpdateEvent from './pages/UpdateEvent';
// import Ticket from './pages/Ticket';
// import CreateTicket from './pages/CreateTicket';
// import Invite from './pages/Invite';
// import Notification from './pages/Notification';
// import Rsvp from './pages/Rsvp';
// import Messages from './pages/Messages';
// import Sendmessage from './pages/Sendmessage';
// import Feedback from './pages/Feedback';
// import Logout from './pages/Logout';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <Router>
//       <div>
//         {isLoggedIn && <Header className="header" />} {/* Render Header only if user is logged in */}
//         <div className="page-container"> {/* Apply page container styles */}
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//             <Route path="/registration" element={<Registration />} />
//             <Route path="/forgot_password/" element={<Forgotpassword />} />
//             <Route path="/event_management/change_password/:token/" element={<Changepassword />} />
//             {isLoggedIn && <Route path="/create_event/" element={<HostEvent />} />}
//             <Route path="/event/:event_id/" element={<EventById />} />
//             <Route path="/book_ticket/:event_id/" element={<BookTicket />} />
//             {isLoggedIn && <Route path="/update_event/:event_id/" element={<UpdateEvent />} />}
//             <Route path="/ticket/:event_id/" element={<Ticket />} />
//             {isLoggedIn && <Route path="/create_ticket/" element={<CreateTicket />} />}
//             {isLoggedIn && <Route path="/invite/" element={<Invite />} />}
//             {isLoggedIn && <Route path="/notification/" element={<Notification />} />}
//             <Route path="/event_management/rsvp/:event_id/" element={<Rsvp />} />
//             {isLoggedIn && <Route path="/messages/" element={<Messages />} />}
//             {isLoggedIn && <Route path="/send_messages/" element={<Sendmessage />} />}
//             {isLoggedIn && <Route path="/feedback/:event_id/" element={<Feedback />} />}
//             {isLoggedIn && <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />}
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;































// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Registration from './pages/Registration';
// import Header from './components/Header';
// import './Css/Homepage.css'; // Import your CSS file
// import './App.css';
// import Forgotpassword from './pages/Forgotpassword';
// import Changepassword from './pages/Changepassword';
// import HostEvent from './pages/HostEvent';
// import EventById from './pages/EventById';
// import BookTicket from './pages/BookTicket';
// import UpdateEvent from './pages/UpdateEvent';
// import Ticket from './pages/Ticket';
// import CreateTicket from './pages/CreateTicket';
// import Invite from './pages/Invite';
// import Notification from './pages/Notification';
// import Rsvp from './pages/Rsvp';
// import Messages from './pages/Messages';
// import Sendmessage from './pages/Sendmessage';
// import Feedback from './pages/Feedback';
// import Logout from './pages/Logout';

// function App() {
//   return (
//     <Router>
//       <div>
//         <Header className="header" /> {/* Apply header styles */}
//         <div className="page-container"> {/* Apply page container styles */}
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/registration" element={<Registration />} />
//             <Route path="/forgot_password/" element={<Forgotpassword />} />
//             <Route path="/event_management/change_password/:token/" element={<Changepassword />} />
//             <Route path="/create_event/" element={<HostEvent />} />
//             <Route path="/event/:event_id/" element={<EventById />} />
//             <Route path="/book_ticket/:event_id/" element={<BookTicket />} />
//             <Route path="/update_event/:event_id/" element={<UpdateEvent />} />
//             <Route path="/ticket/:event_id/" element={<Ticket />} />
//             <Route path="/create_ticket/" element={<CreateTicket />} />
//             <Route path="/invite/" element={<Invite />} />
//             <Route path="/notification/" element={<Notification />} />
//             <Route path="/event_management/rsvp/:event_id/" element={<Rsvp />} />
//             <Route path="/messages/" element={<Messages />} />
//             <Route path="/send_messages/" element={<Sendmessage />} />
//             <Route path="/feedback/:event_id/" element={<Feedback />} />
//             <Route path="/logout" element={<Logout />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;




































// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Registration from './pages/Registration';
// import Header from './components/Header';
// import './Css/Homepage.css'; // Import your CSS file
// import './App.css';
// import Forgotpassword from './pages/Forgotpassword';
// import Changepassword from './pages/Changepassword';
// import HostEvent from './pages/HostEvent';
// import EventById from './pages/EventById';
// import BookTicket from './pages/BookTicket';
// import UpdateEvent from './pages/UpdateEvent';
// import Ticket from './pages/Ticket';
// import CreateTicket from './pages/CreateTicket';
// import Invite from './pages/Invite';
// import Notification from './pages/Notification';
// import Rsvp from './pages/Rsvp';
// import Messages from './pages/Messages';
// import Sendmessage from './pages/Sendmessage';
// import Feedback from './pages/Feedback';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   return (
//     <Router>
//       <div>
//         <Header className="header" isAuthenticated={isAuthenticated} /> {/* Pass isAuthenticated to Header */}
//         <div className="page-container"> {/* Apply page container styles */}
//           {!isAuthenticated && <Navigate to="/" />} {/* Redirect to home if not authenticated */}
//           <Routes>
//             {/* Visible to everyone */}
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
//             {/* Only visible after login */}
//             {isAuthenticated && (
//               <>
//                 <Route path="/registration" element={<Registration />} />
//                 <Route path="/forgot_password/" element={<Forgotpassword />} />
//                 <Route path="/event_management/change_password/:token/" element={<Changepassword />} />
//                 <Route path="/create_event/" element={<HostEvent />} />
//                 <Route path="/event/:event_id/" element={<EventById />} />
//                 <Route path="/book_ticket/:event_id/" element={<BookTicket />} />
//                 <Route path="/update_event/:event_id/" element={<UpdateEvent />} />
//                 <Route path="/ticket/:event_id/" element={<Ticket />} />
//                 <Route path="/create_ticket/" element={<CreateTicket />} />
//                 <Route path="/invite/" element={<Invite />} />
//                 <Route path="/notification/" element={<Notification />} />
//                 <Route path="/event_management/rsvp/:event_id/" element={<Rsvp />} />
//                 <Route path="/messages/" element={<Messages />} />
//                 <Route path="/send_messages/" element={<Sendmessage />} />
//                 <Route path="/feedback/:event_id/" element={<Feedback />} />
//               </>
//             )}
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;










// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Registration from './pages/Registration';
// import Header from './components/Header';
// import './Css/Homepage.css'; // Import your CSS file
// import './App.css';
// import Forgotpassword from './pages/Forgotpassword';
// import Changepassword from './pages/Changepassword';
// import HostEvent from './pages/HostEvent';
// import EventById from './pages/EventById';
// import BookTicket from './pages/BookTicket';
// import UpdateEvent from './pages/UpdateEvent';
// import Ticket from './pages/Ticket';
// import CreateTicket from './pages/CreateTicket';
// import Invite from './pages/Invite';
// import Notification from './pages/Notification';
// import Rsvp from './pages/Rsvp';
// import Messages from './pages/Messages';
// import Sendmessage from './pages/Sendmessage';
// import Feedback from './pages/Feedback';

// function App() {
//   return (
//     <Router>
//       <div>
//         <Header className="header" /> {/* Apply header styles */}
//         <div className="page-container"> {/* Apply page container styles */}
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/registration" element={<Registration />} />
//             <Route path="/forgot_password/" element={<Forgotpassword />} />
//             <Route path="/event_management/change_password/:token/" element={<Changepassword />} />
//             <Route path="/create_event/" element={<HostEvent />} />
//             <Route path="/event/:event_id/" element={<EventById />} />
//             <Route path="/book_ticket/:event_id/" element={<BookTicket />} />
//             <Route path="/update_event/:event_id/" element={<UpdateEvent />} />
//             <Route path="/ticket/:event_id/" element={<Ticket />} />
//             <Route path="/create_ticket/" element={<CreateTicket />} />
//             <Route path="/invite/" element={<Invite />} />
//             <Route path="/notification/" element={<Notification />} />
//             <Route path="/event_management/rsvp/:event_id/" element={<Rsvp />} />
//             <Route path="/messages/" element={<Messages />} />
//             <Route path="/send_messages/" element={<Sendmessage />} />
//             <Route path="/feedback/:event_id/" element={<Feedback />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;













// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Registration from './pages/Registration';
// import Header from './components/Header';
// import './Css/Homepage.css'; // Import your CSS file
// import './App.css';
// import Forgotpassword from './pages/Forgotpassword';
// import Changepassword from './pages/Changepassword';
// import HostEvent from './pages/HostEvent';
// import EventById from './pages/EventById';
// import BookTicket from './pages/BookTicket';
// import UpdateEvent from './pages/UpdateEvent';
// import Ticket from './pages/Ticket';
// import CreateTicket from './pages/CreateTicket';
// import Invite from './pages/Invite';
// import Notification from './pages/Notification';
// import Rsvp from './pages/Rsvp';
// import Messages from './pages/Messages';
// import Sendmessage from './pages/Sendmessage';
// import Feedback from './pages/Feedback';

// function App() {
//   return (
//     <Router>
//       <div>
//         <Header className="header" /> {/* Apply header styles */}
//         <div className="page-container"> {/* Apply page container styles */}
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/registration" element={<Registration />} />
//             <Route path="/forgot_password/" element={<Forgotpassword />} />
//             <Route path="/event_management/change_password/:token/" element={<Changepassword />} />
//             <Route path="/create_event/" element={<HostEvent />} />
//             <Route path="/event/:event_id/" element={<EventById />} />
//             <Route path="/book_ticket/:event_id/" element={<BookTicket />} />
//             <Route path="/update_event/:event_id/" element={<UpdateEvent />} />
//             <Route path="/ticket/:event_id/" element={<Ticket />} />
//             <Route path="/create_ticket/" element={<CreateTicket />} />
//             <Route path="/invite/" element={<Invite />} />
//             <Route path="/notification/" element={<Notification />} />
//             <Route path="/event_management/rsvp/:event_id/" element={<Rsvp />} />
//             <Route path="/messages/" element={<Messages />} />
//             <Route path="/send_messages/" element={<Sendmessage />} />
//             <Route path="/feedback/:event_id/" element={<Feedback />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;


































// import React from 'react';
// import 
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Registration from './pages/Registration';
// import Header from './components/Header';

// function App() {
//   return (
//     <Router>
//       <div>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/registration" element={<Registration />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;





























// import React from 'react';
// import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
// import Homepage from './Pages/Homepage';
// import Login from './Pages/Login'; // Import your login page component
// // import Registration from './Pages/Registration';

// function App() {
//   return (
//     <Router>
//       <div>
//         <Link to="/">Home</Link>
//         <Link to="/login">Login</Link>
//       </div>
//       <Switch>
//         <Route exact path="/" component={Homepage} />
//         <Route path="/login" component={Login} />
//         {/* console.log("login call"); */}
//       </Switch>
//     </Router>
//   );
// }

// export default App;

































// // import React from 'react';
// // import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// // import Homepage from './Pages/Homepage';
// // import Login from './Pages/Login'; // Import your login page component

// // function App() {
// //   return (
// //     <Router>
// //       <Switch>
// //         <Route exact path="/" component={Homepage} />
// //         <Route exact path="/login" component={Login} />
// //       </Switch>
// //     </Router>
// //   );
// // }

// // export default App;




























// // // // import logo from './logo.svg';
// // // import './App.css';

// // // function App() {
// // //   return (
// // //     <div className="App">
// // //       <h1>Hello Manish</h1>
// // //     </div>
// // //   );
// // // }

// // // export default App;
