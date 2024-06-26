// pages/Home.js
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import '../Css/Homepage.css';

function Home() {
  const [current, setCurrent] = useState([]);
  const [events, setEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    //fetch data for running events
    axios.get("http://localhost:8000/event_management/current_events/")
      .then(response => {
        console.log(response.data);
        setCurrent(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });

    // Fetch data for upcoming events
    axios.get("http://localhost:8000/event_management/upcoming_events/")
      .then(response => {
        console.log(response.data);
        setEvents(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });

    // Fetch data for past events
    axios.get("http://localhost:8000/event_management/past_events/")
      .then(response => {
        console.log(response.data);
        setPastEvents(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching past events:', error);
      });
  }, []); // Empty dependency array to ensure the effect runs only once
  
  return (
    <div className="home-container">
      <h1>Running Events</h1>
      <div className="grid">
        {/* Display upcoming events */}
        {current.map((currentpost) => {
          const { id, name, start_datetime, end_datetime, location, description, image } = currentpost;
          return (
            <Link to={`/event/${id}/`} key={id} className="event-link">
              <div className="card" key={currentpost.id}>
                {console.log(currentpost)}
                <img className="img" src={`${image}`} alt={name} />
                <h2>{name.toUpperCase()}</h2>
                <h4>{start_datetime}</h4>
                <h4>{end_datetime}</h4>
                <h3>{location}</h3>
                <p>{description.substring(0, 10)}</p>
              </div>
            </Link>
          );
        })}
      </div>


      <h1>Upcoming Events</h1>
      <div className="grid">
        {/* Display upcoming events */}
        {events.map((post) => {
          const { id, name, start_datetime, end_datetime, location, description, image } = post;
          return (
            <Link to={`/event/${id}/`} key={id} className="event-link">
              <div className="card" key={post.id}>
                <img className="img" src={`${image}`} alt={name} />
                <h2>{name.toUpperCase()}</h2>
                <h4>{start_datetime}</h4>
                <h4>{end_datetime}</h4>
                <h3>{location}</h3>
                <p>{description.substring(0, 10)}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Display past events */}
      <h1>Past Events</h1>
      <div className="grid">
        {pastEvents.map((pastEvent) => {
          const { id, name, start_datetime, end_datetime, location, description, image } = pastEvent;
          return (
            <Link to={`/event/${id}/`} key={id} className="event-link">
              <div className="card" key={pastEvent.id}>
                <img className="img" src={`${image}`} alt={name} />
                <h2>{name.toUpperCase()}</h2>
                <h4>{start_datetime}</h4>
                <h4>{end_datetime}</h4>
                <h3>{location}</h3>
                <p>{description.substring(0, 10)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Home;








































// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; 
// import { Link } from 'react-router-dom';
// import '../Css/Homepage.css';

// function Home() {
//   const [currentPageCurrent, setCurrentPageCurrent] = useState(1);
//   const [currentPageUpcoming, setCurrentPageUpcoming] = useState(1);
//   const [currentPagePast, setCurrentPagePast] = useState(1);
  
//   const [current, setCurrent] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [pastEvents, setPastEvents] = useState([]);
  
//   const pageSize = 5; // Number of items per page

//   useEffect(() => {
//     const fetchCurrentEvents = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/event_management/current_events/?page=${currentPageCurrent}&page_size=${pageSize}`);
//         setCurrent(response.data.data);
//         console.log("curr",response.data)
//       } catch (error) {
//         console.error('Error fetching current events:', error);
//       }
//     };

//     const fetchUpcomingEvents = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/event_management/upcoming_events/?page=${currentPageUpcoming}&page_size=${pageSize}`);
//         setEvents(response.data.data);
//         console.log("up",response.data)
//       } catch (error) {
//         console.error('Error fetching upcoming events:', error);
//       }
//     };

//     const fetchPastEvents = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/event_management/past_events/?page=${currentPagePast}&page_size=${pageSize}`);
//         setPastEvents(response.data.data);
//         console.log("past",response.data)
//       } catch (error) {
//         console.error('Error fetching past events:', error);
//       }
//     };

//     fetchCurrentEvents();
//     fetchUpcomingEvents();
//     fetchPastEvents();
//   }, [currentPageCurrent, currentPageUpcoming, currentPagePast]);
  
//   return (
//     <div className="home-container">
//       <h1>Running Events</h1>
//       <div className="grid">
//         {/* Display current page of running events */}
//         {current && current.map((currentpost) => {
//           const { id, name, start_datetime, end_datetime, location, description, image } = currentpost;
//           return (
//             <Link to={`/event/${id}/`} key={id} className="event-link">
//               <div className="card" key={currentpost.id}>
//                 <img className="img" src={`${image}`} alt={name} />
//                 <h2>{name.toUpperCase()}</h2>
//                 <h4>{start_datetime}</h4>
//                 <h4>{end_datetime}</h4>
//                 <h3>{location}</h3>
//                 <p>{description.substring(0, 10)}</p>
//               </div>
//             </Link>
//           );
//         })}
//       </div>

//       {/* Pagination for current events */}
//       <div className="pagination">
//         <button onClick={() => setCurrentPageCurrent(currentPageCurrent - 1)} disabled={currentPageCurrent === 1}>Previous</button>
//         <span>Page {currentPageCurrent}</span>
//         <button onClick={() => setCurrentPageCurrent(currentPageCurrent + 1)}>Next</button>
//       </div>

//       <h1>Upcoming Events</h1>
//       <div className="grid">
//         {/* Display current page of upcoming events */}
//         {events && events.map((post) => {
//           const { id, name, start_datetime, end_datetime, location, description, image } = post;
//           return (
//             <Link to={`/event/${id}/`} key={id} className="event-link">
//               <div className="card" key={post.id}>
//                 <img className="img" src={`${image}`} alt={name} />
//                 <h2>{name.toUpperCase()}</h2>
//                 <h4>{start_datetime}</h4>
//                 <h4>{end_datetime}</h4>
//                 <h3>{location}</h3>
//                 <p>{description.substring(0, 10)}</p>
//               </div>
//             </Link>
//           );
//         })}
//       </div>

//       {/* Pagination for upcoming events */}
//       <div className="pagination">
//         <button onClick={() => setCurrentPageUpcoming(currentPageUpcoming - 1)} disabled={currentPageUpcoming === 1}>Previous</button>
//         <span>Page {currentPageUpcoming}</span>
//         <button onClick={() => setCurrentPageUpcoming(currentPageUpcoming + 1)}>Next</button>
//       </div>

//       <h1>Past Events</h1>
//       <div className="grid">
//         {/* Display current page of past events */}
//         {pastEvents && pastEvents.map((pastEvent) => {
//           const { id, name, start_datetime, end_datetime, location, description, image } = pastEvent;
//           return (
//             <Link to={`/event/${id}/`} key={id} className="event-link">
//               <div className="card" key={pastEvent.id}>
//                 <img className="img" src={`${image}`} alt={name} />
//                 <h2>{name.toUpperCase()}</h2>
//                 <h4>{start_datetime}</h4>
//                 <h4>{end_datetime}</h4>
//                 <h3>{location}</h3>
//                 <p>{description.substring(0, 10)}</p>
//               </div>
//             </Link>
//           );
//         })}
//       </div>

//       {/* Pagination for past events */}
//       <div className="pagination">
//         <button onClick={() => setCurrentPagePast(currentPagePast - 1)} disabled={currentPagePast === 1}>Previous</button>
//         <span>Page {currentPagePast}</span>
//         <button onClick={() => setCurrentPagePast(currentPagePast + 1)}>Next</button>
//       </div>
//     </div>
//   );
// }

// export default Home;






































// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; 
// import { Link } from 'react-router-dom';
// import '../Css/Homepage.css';

// function Home() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [current, setCurrent] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [pastEvents, setPastEvents] = useState([]);
//   const pageSize = 5; // Number of items per page

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch data for current page of running events
//         const currentResponse = await axios.get(`http://localhost:8000/event_management/current_events/?page=${currentPage}&page_size=${pageSize}`);
//         setCurrent(currentResponse.data.data);
        
//         // Fetch data for current page of upcoming events
//         const eventsResponse = await axios.get(`http://localhost:8000/event_management/upcoming_events/?page=${currentPage}&page_size=${pageSize}`);
//         setEvents(eventsResponse.data.data);
        
//         // Fetch data for current page of past events
//         const pastEventsResponse = await axios.get(`http://localhost:8000/event_management/past_events/?page=${currentPage}&page_size=${pageSize}`);
//         setPastEvents(pastEventsResponse.data.data);
//       } catch (error) {
//         console.error('Error fetching events:', error);
//       }
//     };
    
//     fetchData();
//   }, [currentPage]); // Include currentPage in dependency array to trigger effect when currentPage changes
  
//   return (
//     <div className="home-container">
//       <h1>Running Events</h1>
//       <div className="grid">
//         {/* Display current page of running events */}
//         {current && current.map((currentpost) => {
//           const { id, name, start_datetime, end_datetime, location, description, image } = currentpost;
//           return (
//             <Link to={`/event/${id}/`} key={id} className="event-link">
//               <div className="card" key={currentpost.id}>
//                 <img className="img" src={`${image}`} alt={name} />
//                 <h2>{name.toUpperCase()}</h2>
//                 <h4>{start_datetime}</h4>
//                 <h4>{end_datetime}</h4>
//                 <h3>{location}</h3>
//                 <p>{description.substring(0, 10)}</p>
//               </div>
//             </Link>
//           );
//         })}
//       </div>

//       {/* Pagination for running events */}
//       <div className="pagination">
//         <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
//         <span>Page {currentPage}</span>
//         <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
//       </div>

//       {/* Upcoming Events */}
//       <h1>Upcoming Events</h1>
//       <div className="grid">
//         {/* Display current page of upcoming events */}
//         {events && events.map((post) => {
//           const { id, name, start_datetime, end_datetime, location, description, image } = post;
//           return (
//             <Link to={`/event/${id}/`} key={id} className="event-link">
//               <div className="card" key={post.id}>
//                 <img className="img" src={`${image}`} alt={name} />
//                 <h2>{name.toUpperCase()}</h2>
//                 <h4>{start_datetime}</h4>
//                 <h4>{end_datetime}</h4>
//                 <h3>{location}</h3>
//                 <p>{description.substring(0, 10)}</p>
//               </div>
//             </Link>
//           );
//         })}
//       </div>

//       {/* Pagination for upcoming events */}
//       <div className="pagination">
//         <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
//         <span>Page {currentPage}</span>
//         <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
//       </div>

//       {/* Past Events */}
//       <h1>Past Events</h1>
//       <div className="grid">
//         {/* Display current page of past events */}
//         {pastEvents && pastEvents.map((pastEvent) => {
//           const { id, name, start_datetime, end_datetime, location, description, image } = pastEvent;
//           return (
//             <Link to={`/event/${id}/`} key={id} className="event-link">
//               <div className="card" key={pastEvent.id}>
//                 <img className="img" src={`${image}`} alt={name} />
//                 <h2>{name.toUpperCase()}</h2>
//                 <h4>{start_datetime}</h4>
//                 <h4>{end_datetime}</h4>
//                 <h3>{location}</h3>
//                 <p>{description.substring(0, 10)}</p>
//               </div>
//             </Link>
//           );
//         })}
//       </div>

//       {/* Pagination for past events */}
//       <div className="pagination">
//         <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
//         <span>Page {currentPage}</span>
//         <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
//       </div>
//     </div>
//   );
// }

// export default Home;



















































// // pages/Home.js
// import { Link } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Import Axios
// import '../Css/Homepage.css';

// function Home() {
//   const [current, setCurrent] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [pastEvents, setPastEvents] = useState([]);

//   useEffect(() => {
//     //fetch data for running events
//     axios.get("http://localhost:8000/event_management/current_events/")
//       .then(response => {
//         console.log(response.data);
//         setCurrent(response.data.data);
//       })
//       .catch(error => {
//         console.error('Error fetching events:', error);
//       });

//     // Fetch data for upcoming events
//     axios.get("http://localhost:8000/event_management/upcoming_events/")
//       .then(response => {
//         console.log(response.data);
//         setEvents(response.data.data);
//       })
//       .catch(error => {
//         console.error('Error fetching events:', error);
//       });

//     // Fetch data for past events
//     axios.get("http://localhost:8000/event_management/past_events/")
//       .then(response => {
//         console.log(response.data);
//         setPastEvents(response.data.data);
//       })
//       .catch(error => {
//         console.error('Error fetching past events:', error);
//       });
//   }, []); // Empty dependency array to ensure the effect runs only once
  
//   return (
//     <div className="home-container">
//       <h1>Running Events</h1>
//       <div className="grid">
//         {/* Display upcoming events */}
//         {current.map((currentpost) => {
//           const { id, name, start_datetime, end_datetime, location, description, image } = currentpost;
//           return (
//             <Link to={`/event/${id}/`} key={id} className="event-link">
//               <div className="card" key={currentpost.id}>
//                 {console.log(currentpost)}
//                 <img className="img" src={`${image}`} alt={name} />
//                 <h2>{name.toUpperCase()}</h2>
//                 <h4>{start_datetime}</h4>
//                 <h4>{end_datetime}</h4>
//                 <h3>{location}</h3>
//                 <p>{description.substring(0, 10)}</p>
//               </div>
//             </Link>
//           );
//         })}
//       </div>


//       <h1>Upcoming Events</h1>
//       <div className="grid">
//         {/* Display upcoming events */}
//         {events.map((post) => {
//           const { id, name, start_datetime, end_datetime, location, description, image } = post;
//           return (
//             <Link to={`/event/${id}/`} key={id} className="event-link">
//               <div className="card" key={post.id}>
//                 <img className="img" src={`${image}`} alt={name} />
//                 <h2>{name.toUpperCase()}</h2>
//                 <h4>{start_datetime}</h4>
//                 <h4>{end_datetime}</h4>
//                 <h3>{location}</h3>
//                 <p>{description.substring(0, 10)}</p>
//               </div>
//             </Link>
//           );
//         })}
//       </div>

//       {/* Display past events */}
//       <h1>Past Events</h1>
//       <div className="grid">
//         {pastEvents.map((pastEvent) => {
//           const { id, name, start_datetime, end_datetime, location, description, image } = pastEvent;
//           return (
//             <Link to={`/event/${id}/`} key={id} className="event-link">
//               <div className="card" key={pastEvent.id}>
//                 <img className="img" src={`${image}`} alt={name} />
//                 <h2>{name.toUpperCase()}</h2>
//                 <h4>{start_datetime}</h4>
//                 <h4>{end_datetime}</h4>
//                 <h3>{location}</h3>
//                 <p>{description.substring(0, 10)}</p>
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Home;






































// // pages/Home.js
// import { Link } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Import Axios
// import '../Css/Homepage.css';

// function Home() {
//   const [events, setEvents] = useState([]);
//   const [pastevents, setPastEvents] = useState([]);

//   useEffect(() => {
//     // Fetch data from backend when the component mounts
//     axios.get("http://localhost:8000/event_management/event/")
//       .then(response => {
//         // Assuming your response data is an array of events
//         console.log(response.data);
//         setEvents(response.data.data);
//       })
//       .catch(error => {
//         console.error('Error fetching events:', error);
//       });
//   }, []); // Empty dependency array to ensure the effect runs only once
  
//   return (
//     <div>
//       <h1>Upcoming Events</h1>
//       <div className="grid">
//         {events.map((post)=> {
//           const {id,name, start_datetime,end_datetime, location, description, image} = post;
//           return (
//             <Link to={`/event/${id}/`} key={id} className="event-link">
//               <div className= "card" key={post.id}>
//                 <img className="img" src={`http://127.0.0.1:8000/`+image} />
//                 <h2>{name.toUpperCase()}</h2>
//                 <h4>{start_datetime}</h4>
//                 <h4>{end_datetime}</h4>
//                 <h3>{location}</h3>
//                 <p>{description.substring(0,10)}</p>
                
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Home;
