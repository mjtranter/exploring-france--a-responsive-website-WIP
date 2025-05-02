import Navbar from './components/navbar/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Film from './pages/film/film';
import Music from './pages/music/music';
import Events from './pages/events/events';
import Attractions from './pages/attractions/attractions';
import Itineraries from './pages/itineraries/itineraries';
import ThingsToKnow from './pages/things-to-know/things-to-know';
import Experience from './pages/experience/experience';
import { useState, useEffect, createContext } from 'react';

const CountryCodeContext = createContext();

export {CountryCodeContext};

export default function App() {
    const [countryCode, setCountryCode] = useState("gb");

    useEffect(() => {
      //set country code to query parameter if it exists
      const countryParam = new URLSearchParams(window.location.search).get("countrySim");
      if (countryParam) setCountryCode(countryParam.toLowerCase());
      else {
        //call serverless function to get country code
        fetch("/api/fetchCountryCode")
          .then(response => response.json())
          .then(data => {
            console.log(data.countryCode);
            setCountryCode(data.countryCode.toLowerCase())
          })
          .catch(error => console.log("There was an error fetching country code!"));
      }
    }, []);

    return (
      <CountryCodeContext.Provider value={countryCode}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/film" element={<Film />} />
            <Route path="/music" element={<Music />} />
            <Route path="/things-to-know" element={<ThingsToKnow />} />
            <Route path="/events" element={<Events />} />
            <Route path="/attractions" element={<Attractions />} />
            <Route path="/itineraries" element={<Itineraries />} />
            <Route path="/experience" element={<Experience />} />
          </Routes>
        </BrowserRouter>
      </CountryCodeContext.Provider>
    )
}

