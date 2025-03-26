import Navbar from './components/navbar/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Film from './pages/film/film';
import Music from './pages/music/music';
import Events from './pages/events/events';
import Attractions from './pages/attractions/attractions';
import Itineraries from './pages/itineraries/itineraries';
import { useState, useEffect, createContext } from 'react';

const CountryCodeContext = createContext();

export {CountryCodeContext};

export default function App() {
    const [countryCode, setCountryCode] = useState("gb");

    useEffect(() => {
      const countryParam = new URLSearchParams(window.location.search).get("countrySim");
      if (countryParam) setCountryCode(countryParam.toLowerCase());
      else {
        fetch("/api/fetchCountryCode")
          .then(response => response.json())
          .then(data => setCountryCode(data.countryCode.toLowerCase()))
          .catch(error => console.log("There was an error fetching country code!"));
      }
    }, []);

    return (
      <CountryCodeContext.Provider value={countryCode}>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/film" element={<Film />} />
            <Route path="/music" element={<Music />} />
            <Route path="/events" element={<Events />} />
            <Route path="/attractions" element={<Attractions />} />
            <Route path="/itineraries" element={<Itineraries />} />
          </Routes>
        </BrowserRouter>
      </CountryCodeContext.Provider>
    )
}

