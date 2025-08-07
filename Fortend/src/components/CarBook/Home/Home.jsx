

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Home.css";

// const Home = () => {
//   const [location, setLocation] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const navigate = useNavigate();

//   const carImages = [
//     "https://freepngimg.com/download/honda/31954-5-honda-civic-transparent-image.png",
//     "https://imgd.aeplcdn.com/370x208/n/cw/ec/152681/x5-facelift-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
//     "https://www.karibueastafrica.com/wp-content/uploads/2017/05/4wd-uganda.jpg",
//     "https://www.revv.co.in/blogs/wp-content/uploads/2024/08/women-man-near-car-dog-running-beach-2-346x188.jpg",
//     "https://www.andalucia.com/sites/default/files/styles/extra_700x700_/public/Family-Roadtrip-Andalucia.jpg?itok=SNzQa1iP"
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === carImages.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 2000);

//     return () => clearInterval(intervalId);
//   }, []);

//   const handleSearch = () => {
//     if (!location) {
//       alert("Please select a location.");
//       return;
//     }
    
//     if (!startDate || !endDate) {
//       alert("Please select both start and end dates.");
//       return;
//     }
    
//     const start = new Date(startDate);
//     const end = new Date(endDate);
    
//     if (end <= start) {
//       alert("End date must be after start date.");
//       return;
//     }
    
//     navigate(`/cars?location=${location}&startDate=${startDate}&endDate=${endDate}`);
//   };

//   return (
//     <div className="home-container">
//       <header className="hero">
//         <h1>Find Your Perfect Ride </h1>
//         <p>Book the best rental cars at affordable prices.</p>
//       </header>

//       <section className="search-section">
//         <h2>Search for Your Ride</h2>
//         <div className="search-inputs">
//           <div className="input-group">
//             <label htmlFor="location">Location</label>
//             <select 
//               id="location" 
//               value={location} 
//               onChange={(e) => setLocation(e.target.value)}
//               required
//             >
//               <option value="">Select Location</option>
//               <option value="Hyderabad">Hyderabad</option>
//               <option value="Bangalore">Bangalore</option>
//             </select>
//           </div>
//           <div className="input-group">
//             <label htmlFor="start-date">Start Date</label>
//             <input
//               type="date"
//               id="start-date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               min={new Date().toISOString().split("T")[0]}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="end-date">End Date</label>
//             <input
//               type="date"
//               id="end-date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               min={startDate || new Date().toISOString().split("T")[0]}
//               required
//             />
//           </div>
//           <button onClick={handleSearch} className="search-btn">
//             Search Cars
//           </button>
//         </div>
//       </section>

//       <section className="carousel">
//         <h2>Featured Cars</h2>
//         <div className="carousel-container">
//           <img
//             src={carImages[currentIndex]}
//             alt="Featured Car"
//             className="carousel-image"
//           />
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;





// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Home.css";

// const Home = () => {
//   const [location, setLocation] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const navigate = useNavigate();

//   const carData = [
//     {
//       image: "https://freepngimg.com/download/honda/31954-5-honda-civic-transparent-image.png",
//       name: "Honda Civic"
//     },
//     {
//       image: "https://imgd.aeplcdn.com/370x208/n/cw/ec/152681/x5-facelift-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
//       name: "BMW X5"
//     },
//     {
//       image: "https://www.karibueastafrica.com/wp-content/uploads/2017/05/4wd-uganda.jpg",
//       name: "Toyota Land Cruiser"
//     },
//     {
//       image: "https://www.revv.co.in/blogs/wp-content/uploads/2024/08/women-man-near-car-dog-running-beach-2-346x188.jpg",
//       name: "Family SUV"
//     },
//     {
//       image: "https://www.andalucia.com/sites/default/files/styles/extra_700x700_/public/Family-Roadtrip-Andalucia.jpg?itok=SNzQa1iP",
//       name: "Road Trip Van"
//     }
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === carData.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 3000);

//     return () => clearInterval(intervalId);
//   }, []);

//   const handleSearch = () => {
//     if (!location) {
//       alert("Please select a location.");
//       return;
//     }
    
//     if (!startDate || !endDate) {
//       alert("Please select both start and end dates.");
//       return;
//     }
    
//     const start = new Date(startDate);
//     const end = new Date(endDate);
    
//     if (end <= start) {
//       alert("End date must be after start date.");
//       return;
//     }
    
//     navigate(`/cars?location=${location}&startDate=${startDate}&endDate=${endDate}`);
//   };

//   return (
//     <div className="home-container">
//       <header className="hero">
//         <div className="hero-content">
//           <h1>Find Your Perfect Ride</h1>
//           <p>Book premium rental cars at unbeatable prices</p>
//           <div className="hero-btns">
//             {/* <button className="cta-btn">Learn More</button> */}
//             <button 
//           className="secondary-btn1"
//           onClick={() => navigate('/special-offers')}
//         >
//           Special Offers
//         </button>
//           </div>
//         </div>
//       </header>

//       <section className="search-section">
//         <div className="search-card">
//           <h2>Search for Your Ride</h2>
//           <div className="search-inputs">
//             <div className="input-group">
//               <label htmlFor="location">Location</label>
//               <select 
//                 id="location" 
//                 value={location} 
//                 onChange={(e) => setLocation(e.target.value)}
//                 required
//               >
//                 <option value="">Select Location</option>
//                 <option value="Hyderabad">Hyderabad</option>
//                 <option value="Bangalore">Bangalore</option>
//                 <option value="Mumbai">Mumbai</option>
//                 <option value="Delhi">Delhi</option>
//               </select>
//             </div>
//             <div className="input-group">
//               <label htmlFor="start-date">Start Date</label>
//               <input
//                 type="date"
//                 id="start-date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 min={new Date().toISOString().split("T")[0]}
//                 required
//               />
//             </div>
//             <div className="input-group">
//               <label htmlFor="end-date">End Date</label>
//               <input
//                 type="date"
//                 id="end-date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 min={startDate || new Date().toISOString().split("T")[0]}
//                 required
//               />
//             </div>
//             <button onClick={handleSearch} className="search-btn">
//               <span>Search Cars</span>
//               <i className="fas fa-search"></i>
//             </button>
//           </div>
//         </div>
//       </section>

//       <section className="featured-section">
//         <div className="section-header">
//           <h2>Featured Vehicles</h2>
//           <p>Our most popular rental choices</p>
//         </div>
//         <div className="carousel">
//           <div className="carousel-slide">
//             <img
//               src={carData[currentIndex].image}
//               alt={carData[currentIndex].name}
//               className="carousel-image"
//             />
//             <div className="carousel-caption">
//               <h3>{carData[currentIndex].name}</h3>
//               {/* <button className="view-btn">View Details</button> */}
//             </div>
//           </div>
//           <div className="carousel-dots">
//             {carData.map((_, index) => (
//               <span 
//                 key={index}
//                 className={`dot ${index === currentIndex ? 'active' : ''}`}
//                 onClick={() => setCurrentIndex(index)}
//               ></span>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="benefits-section">
//         <div className="benefits-grid">
//           <div className="benefit-card">
//             <i className="fas fa-tag"></i>
//             <h3>Best Prices</h3>
//             <p>Guaranteed lowest rates for all our vehicles</p>
//           </div>
//           <div className="benefit-card">
//             <i className="fas fa-shield-alt"></i>
//             <h3>Full Coverage</h3>
//             <p>Comprehensive insurance included</p>
//           </div>
//           <div className="benefit-card">
//             <i className="fas fa-headset"></i>
//             <h3>24/7 Support</h3>
//             <p>Our team is always ready to help</p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    setIsLoggedIn(!!loggedInUser);
  }, []);

  const carData = [
    {
      image: "https://freepngimg.com/download/honda/31954-5-honda-civic-transparent-image.png",
      name: "Honda Civic"
    },
    {
      image: "https://imgd.aeplcdn.com/370x208/n/cw/ec/152681/x5-facelift-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
      name: "BMW X5"
    },
    {
      image: "https://www.karibueastafrica.com/wp-content/uploads/2017/05/4wd-uganda.jpg",
      name: "Toyota Land Cruiser"
    },
    {
      image: "https://www.revv.co.in/blogs/wp-content/uploads/2024/08/women-man-near-car-dog-running-beach-2-346x188.jpg",
      name: "Family SUV"
    },
    {
      image: "https://www.andalucia.com/sites/default/files/styles/extra_700x700_/public/Family-Roadtrip-Andalucia.jpg?itok=SNzQa1iP",
      name: "Road Trip Van"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carData.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = () => {
    // Check if user is logged in
    if (!isLoggedIn) {
      alert("Please login to search for cars");
      navigate("/login", { state: { fromSearch: true } });
      return;
    }

    // Validate inputs
    if (!location) {
      alert("Please select a location.");
      return;
    }
    
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (end <= start) {
      alert("End date must be after start date.");
      return;
    }
    
    navigate(`/cars?location=${location}&startDate=${startDate}&endDate=${endDate}`);
  };

  return (
    <div className="home-container">
      <header className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Ride</h1>
          <p>Book premium rental cars at unbeatable prices</p>
          <div className="hero-btns">
            <button 
              className="secondary-btn1"
              onClick={() => navigate('/special-offers')}
            >
              Special Offers
            </button>
          </div>
        </div>
      </header>

      <section className="search-section">
        <div className="search-card">
          <h2 className="head11">Search for Your Ride</h2>
          <div className="search-inputs">
            <div className="input-group">
              <label htmlFor="location">Location</label>
              <select 
                id="location" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                required
              >
                <option value="">Select Location</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="start-date">Start Date</label>
              <input
                type="date"
                id="start-date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="end-date">End Date</label>
              <input
                type="date"
                id="end-date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || new Date().toISOString().split("T")[0]}
                required
              />
            </div>
            <button onClick={handleSearch} className="search-btn">
              <span>Search Cars</span>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Vehicles</h2>
          <p>Our most popular rental choices</p>
        </div>
        <div className="carousel">
          <div className="carousel-slide">
            <img
              src={carData[currentIndex].image}
              alt={carData[currentIndex].name}
              className="carousel-image"
            />
            <div className="carousel-caption">
              <h3>{carData[currentIndex].name}</h3>
            </div>
          </div>
          <div className="carousel-dots">
            {carData.map((_, index) => (
              <span 
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="benefits-grid">
          <div className="benefit-card">
            <i className="fas fa-tag"></i>
            <h3>Best Prices</h3>
            <p>Guaranteed lowest rates for all our vehicles</p>
          </div>
          <div className="benefit-card">
            <i className="fas fa-shield-alt"></i>
            <h3>Full Coverage</h3>
            <p>Comprehensive insurance included</p>
          </div>
          <div className="benefit-card">
            <i className="fas fa-headset"></i>
            <h3>24/7 Support</h3>
            <p>Our team is always ready to help</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;