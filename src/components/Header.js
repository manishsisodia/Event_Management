import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Css/Header.css'; // Import CSS file for styling

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const userData = JSON.parse(localStorage.getItem('userData'));
  //   if (userData) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item"><Link to="/" className="nav__link">Home</Link></li>
          {!isLoggedIn && (
            <>
              <li className="nav__item"><Link to="/login" className="nav__link">Login</Link></li>
              <li className="nav__item"><Link to="/registration" className="nav__link">Register</Link></li>
            </>
          )}
          {isLoggedIn && (
            <>
            <li className="nav__item"><Link to="/create_by_me/" className="nav__link">My Event</Link></li>
              {/* <li><input type="text" placeholder='search' ></input></li> */}
              <li className="nav__item"><Link to="/search/" className="nav__link">Search</Link></li>
              <li className="nav__item"><Link to="/create_event/" className="nav__link">Create Event</Link></li>
              <li className="nav__item"><Link to="/my_event/" className="nav__link">Invitation</Link></li>
              {/* <li className="nav__item"><Link to="/messages/" className="nav__link">Global Messages</Link></li> */}
              <li className="nav__item"><Link to="/chat/" className="nav__link">My Chats</Link></li>
              <li className="nav__item"><Link to="/logout/" className="nav__link">Logout</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;





































// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import '../Css/Header.css'; // Import CSS file for styling

// function Header() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const handleSearchInputChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleSearch = () => {
//     const token = localStorage.getItem('token')
//     // Make a GET request to your API endpoint with the search query
//     axios.get(`http://localhost:8000/event_management/search/?query=${searchQuery}`,
//   {
//     headers: {
//       'Authorization':`Bearer ${token}`
//     }
//   })
//       .then(response => {
//         // Handle successful response
//         console.log(response.data)
//         setSearchResults(response.data);
//       })
//       .catch(error => {
//         // Handle error
//         console.error('Error fetching search results:', error);
//       });
//   };

//   return (
//     <header className="header">
//       <nav className="nav">
//         <ul className="nav__list">
//           <li className="nav__item"><Link to="/" className="nav__link">Home</Link></li>
//           {!isLoggedIn && (
//             <>
//               <li className="nav__item"><Link to="/login" className="nav__link">Login</Link></li>
//               <li className="nav__item"><Link to="/registration" className="nav__link">Register</Link></li>
//             </>
//           )}
//           {isLoggedIn && (
//             <>
//               <li className="nav__item"><Link to="/create_by_me/" className="nav__link">My Event</Link></li>
//               <li><input type="text" placeholder='Search' value={searchQuery} onChange={handleSearchInputChange}></input></li>
//               <li className="nav__item"><button onClick={handleSearch} className="nav__link">Search</button></li>
//               {/* Display search results here */}
//               {/* For example, you can map through searchResults and display each result */}
//               {/* <li>{searchResults.map(result => <div key={result.id}>{result.name}</div>)}</li> */}
//               <li className="nav__item"><Link to="/create_event/" className="nav__link">Create Event</Link></li>
//               <li className="nav__item"><Link to="/my_event/" className="nav__link">Invitation</Link></li>
//               <li className="nav__item"><Link to="/messages/" className="nav__link">Global Messages</Link></li>
//               <li className="nav__item"><Link to="/chat/" className="nav__link">My Chats</Link></li>
//               <li className="nav__item"><Link to="/logout/" className="nav__link">Logout</Link></li>
//             </>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Header;





























// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import '../Css/Header.css'; // Import CSS file for styling

// function Header() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   // const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // useEffect(() => {
//   //   const userData = JSON.parse(localStorage.getItem('userData'));
//   //   if (userData) {
//   //     setIsLoggedIn(true);
//   //   }
//   // }, []);

//   return (
//     <header className="header">
//       <nav className="nav">
//         <ul className="nav__list">
//           <li className="nav__item"><Link to="/" className="nav__link">Home</Link></li>
//           {!isLoggedIn && (
//             <>
//               <li className="nav__item"><Link to="/login" className="nav__link">Login</Link></li>
//               <li className="nav__item"><Link to="/registration" className="nav__link">Register</Link></li>
//             </>
//           )}
//           {isLoggedIn && (
//             <>
//             <li className="nav__item"><Link to="/create_by_me/" className="nav__link">My Event</Link></li>
//               <li><input type="text" placeholder='search' ></input></li>
//               <li className="nav__item"><Link to="/search/" className="nav__link">Search</Link></li>
//               <li className="nav__item"><Link to="/create_event/" className="nav__link">Create Event</Link></li>
//               <li className="nav__item"><Link to="/my_event/" className="nav__link">Invitation</Link></li>
//               <li className="nav__item"><Link to="/messages/" className="nav__link">Global Messages</Link></li>
//               <li className="nav__item"><Link to="/chat/" className="nav__link">My Chats</Link></li>
//               <li className="nav__item"><Link to="/logout/" className="nav__link">Logout</Link></li>
//             </>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Header;
































// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function Header() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   return (
//     <header>
//       <nav>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           {!isLoggedIn && (
//             <>
//               <li><Link to="/login">Login</Link></li>
//               <li><Link to="/registration">Register</Link></li>
//             </>
//           )}
//           {isLoggedIn && (
//             <>
//               <li><Link to="/create_event/">Create-Event</Link></li>
//               {/* <li><Link to="/create_ticket/">Create-Ticket</Link></li> */}
//               <li><Link to="/my_event/">My-Event</Link></li>
//               {/* <li><Link to="/invite/">Invite</Link></li> */}
//               {/* <li><Link to="/notification/">Notification</Link></li> */}
//               <li><Link to="/messages/">Global Messages</Link></li>
//               <li><Link to="/chat/">My Chats</Link></li>
//               <li><Link to="/logout/">Logout</Link></li>
//             </>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Header;

































// //1st
// // components/Header.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios'

// function Header() {

//   async function getUser(){
//         const token = localStorage.getItem('token')
//         axios.get("http://localhost:8000/event_management/user_info/",{
//           headers: {
//             'Authorization':`Bearer ${token}`
//           }
//         })
//         .then(response => {
//           console.log(response.data);
//           // setCurrent(response.data.data);
//         })
//         .catch(error => {
//           console.error('Error fetching user:', error);
//         });
    
//       }

//   return (
//     <header>
//       <nav>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/login">Login</Link></li>
//           <li><Link to="/registration">Register</Link></li>
//           <li><Link to="/create_event/">Create-Event</Link></li>
//           <li><Link to="/create_ticket/">Create-Ticket</Link></li>
//           <li><Link to="/my_event/">My-Event</Link></li>
//           <li><Link to="/invite/">Invite</Link></li>
//           <li><Link to="/notification/">Notification</Link></li>
//           <li><Link to="/messages/">Global Messages</Link></li>
//           <li><Link to="/chat/">My Chats</Link></li>
//           <li><Link to="/logout/">Logout</Link></li>
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Header;




























// import axios from 'axios';
// import React from 'react';
// import { Link } from 'react-router-dom';

// function Header({ isLoggedIn }) {

//   async function getUser(){
//     axios.get("http://localhost:8000/event_management/user_info/")
//     .then(response => {
//       console.log(response.data);
//       // setCurrent(response.data.data);
//     })
//     .catch(error => {
//       console.error('Error fetching user:', error);
//     });

//   }

//   return (
//     <header>
//       <nav>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           {!isLoggedIn && (
//             <>
//               <li><Link to="/login">Login</Link></li>
//               <li><Link to="/registration">Register</Link></li>
//             </>
//           )}
//           {isLoggedIn && (
//             <>
//               <li><Link to="/create_event/">Create-Event</Link></li>
//               <li><Link to="/create_ticket/">Create-Ticket</Link></li>
//               <li><Link to="/my_event/">My-Event</Link></li>
//               <li><Link to="/invite/">Invite</Link></li>
//               <li><Link to="/notification/">Notification</Link></li>
//               <li><Link to="/messages/">Global Messages</Link></li>
//               <li><Link to="/chat/">My Chats</Link></li>
//               <li><Link to="/logout/">Logout</Link></li>
//             </>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Header;































// //1st
// // components/Header.js
// import React from 'react';
// import { Link } from 'react-router-dom';

// function Header() {
//   return (
//     <header>
//       <nav>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/login">Login</Link></li>
//           <li><Link to="/registration">Register</Link></li>
//           <li><Link to="/create_event/">Create-Event</Link></li>
//           <li><Link to="/create_ticket/">Create-Ticket</Link></li>
//           <li><Link to="/my_event/">My-Event</Link></li>
//           <li><Link to="/invite/">Invite</Link></li>
//           <li><Link to="/notification/">Notification</Link></li>
//           <li><Link to="/messages/">Global Messages</Link></li>
//           <li><Link to="/chat/">My Chats</Link></li>
//           <li><Link to="/logout/">Logout</Link></li>
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Header;































// import React from 'react';
// import { Link } from 'react-router-dom';

// function Header({ isLoggedIn }) {
//   return (
//     <header>
//       <nav>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           {!isLoggedIn && (
//             <>
//               <li><Link to="/login">Login</Link></li>
//               <li><Link to="/registration">Register</Link></li>
//             </>
//           )}
//           {isLoggedIn && (
//             <>
//               <li><Link to="/create_event/">Create-Event</Link></li>
//               <li><Link to="/create_ticket/">Create-Ticket</Link></li>
//               {/* <li><Link to="/my_event/">My-Event</Link></li> */}
//               <li><Link to="/invite/">Invite</Link></li>
//               <li><Link to="/notification/">Notification</Link></li>
//               <li><Link to="/messages/">Messages</Link></li>
//               <li><Link to="/logout/">Logout</Link></li>
//             </>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Header;






























// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// function Header() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <header>
//       <nav>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           {isLoggedIn ? (
//             <>
//               <li><Link to="/create_event/">Create Event</Link></li>
//               <li><Link to="/create_ticket/">Create Ticket</Link></li>
//               {/* Add other links that should be visible after login */}
//               <li><Link to="/invite/">Invite</Link></li>
//               <li><Link to="/notification/">Notification</Link></li>
//               <li><Link to="/messages/">Messages</Link></li>
//               <li><Link to="/logout/">Logout</Link></li>
//             </>
//           ) : (
//             <>
//               <li><Link to="/login">Login</Link></li>
//               <li><Link to="/registration">Register</Link></li>
//             </>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Header;

































// 1st
// // components/Header.js
// import React from 'react';
// import { Link } from 'react-router-dom';

// function Header() {
//   return (
//     <header>
//       <nav>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/login">Login</Link></li>
//           <li><Link to="/registration">Register</Link></li>
//           <li><Link to="/create_event/">Create-Event</Link></li>
//           <li><Link to="/create_ticket/">Create-Ticket</Link></li>
//           {/* <li><Link to="/my_event/">My-Event</Link></li> */}
//           <li><Link to="/invite/">Invite</Link></li>
//           <li><Link to="/notification/">Notification</Link></li>
//           <li><Link to="/messages/">Messages</Link></li>
//           <li><Link to="/logout/">Logout</Link></li>
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Header;
































// import React from 'react';
// import { Link } from 'react-router-dom';

// function Header({ isAuthenticated }) {
//   return (
//     <header>
//       <nav>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/login">Login</Link></li>
//           {isAuthenticated && (
//             <>
//               <li><Link to="/registration">Register</Link></li>
//               <li><Link to="/create_event/">Create Event</Link></li>
//               <li><Link to="/create_ticket/">Create Ticket</Link></li>
//               <li><Link to="/invite/">Invite</Link></li>
//               <li><Link to="/notification/">Notification</Link></li>
//               <li><Link to="/messages/">Messages</Link></li>
//             </>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Header;
































// // components/Header.js
// import React from 'react';
// import { Link } from 'react-router-dom';

// function Header() {
//   return (
//     <header>
//       <nav>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/login">Login</Link></li>
//           <li><Link to="/registration">Register</Link></li>
//           <li><Link to="/create_event/">Create-Event</Link></li>
//           <li><Link to="/create_ticket/">Create-Ticket</Link></li>
//           {/* <li><Link to="/my_event/">My-Event</Link></li> */}
//           <li><Link to="/invite/">Invite</Link></li>
//           <li><Link to="/notification/">Notification</Link></li>
//           <li><Link to="/messages/">Messages</Link></li>
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Header;
