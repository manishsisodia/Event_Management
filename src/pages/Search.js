import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Search() {
    const [query, setQuery] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    // const [startDatetimeFilter, setStartDatetimeFilter] = useState("");
    // const [endDatetimeFilter, setEndDatetimeFilter] = useState("");
    const [current, setCurrent] = useState([]);
    const navigate = useNavigate();

    const getFormData = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/event_management/search/?query=${query}&location=${locationFilter}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setCurrent(response.data.data);
        } catch (error) {
            console.log("failed", error);
            alert("invalid!!");
        }
    }

    return (
        <div className="App">
            <form onSubmit={getFormData}>
                <input type="text" placeholder="event name" value={query} onChange={(e) => setQuery(e.target.value)}></input>
                <input type="text" placeholder="Location" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}></input>
                {/* <input type="datetime-local" placeholder="Start Datetime (YYYY-MM-DD HH:MM:SS)" value={startDatetimeFilter} onChange={(e) => setStartDatetimeFilter(e.target.value)}></input>
                <input type="datetime-local" placeholder="End Datetime (YYYY-MM-DD HH:MM:SS)" value={endDatetimeFilter} onChange={(e) => setEndDatetimeFilter(e.target.value)}></input> */}
                <button type="submit">Search</button>
            </form>
            <div className="grid">
                {/* Display search results */}
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
        </div>
    );
}

export default Search;











































// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// function Search() {
//     const [query, setQuery] = useState("");
//     const [locationFilter, setLocationFilter] = useState("");
//     const [current, setCurrent] = useState([]);
//     const navigate = useNavigate();

//     const getFormData = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.get(`http://localhost:8000/event_management/search/?query=${query}&location=${locationFilter}`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             setCurrent(response.data.data);
//         } catch (error) {
//             console.log("failed", error);
//             alert("invalid!!");
//         }
//     }

//     return (
//         <div className="App">
//             <form onSubmit={getFormData}>
//                 <input type="text" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)}></input>
//                 <input type="text" placeholder="Location" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}></input>
//                 <button type="submit">Search</button>
//             </form>
//             <div className="grid">
//                 {/* Display search results */}
//                 {current.map((currentpost) => {
//                     const { id, name, start_datetime, end_datetime, location, description, image } = currentpost;
//                     return (
//                         <Link to={`/event/${id}/`} key={id} className="event-link">
//                             <div className="card" key={currentpost.id}>
//                                 {console.log(currentpost)}
//                                 <img className="img" src={`${image}`} alt={name} />
//                                 <h2>{name.toUpperCase()}</h2>
//                                 <h4>{start_datetime}</h4>
//                                 <h4>{end_datetime}</h4>
//                                 <h3>{location}</h3>
//                                 <p>{description.substring(0, 10)}</p>
//                             </div>
//                         </Link>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }

// export default Search;









































// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// function Search() {
//     const [query,setQuery] = useState("");
//     const [current, setCurrent] = useState([]);

//     // const [email, setEmail] = useState("");
//     // const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const getFormData = async (e) => {
//         e.preventDefault();
//         try {
//             const token=localStorage.getItem('token')
//             const response = await axios.get(`http://localhost:8000/event_management/search/?query=${query}`, {
//                 query:query
//             },{
//                 headers: {
//                     'token':`Bearer ${token}`
//                 }
//             });
//             console.log(response.data)
//             setCurrent(response.data.data);
//             // setQuery("");
//         } catch (error) {
//             console.log("failed", error);
//             alert("invalid!!");
//         }
//     }

//     return (
//         <div className="App">
//             {/* <h1>Login</h1> */}
//             <form onSubmit={getFormData}>
//                 <input type="text" placeholder="search" value={query} onChange={(e) => setQuery(e.target.value)}></input><br></br><br></br>
//                 {/* <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input><br></br><br></br> */}
//                 <button type="submit">Search</button>
//             </form>
//             <div className="grid">
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

//         </div>
//     );
// }

// export default Search;
