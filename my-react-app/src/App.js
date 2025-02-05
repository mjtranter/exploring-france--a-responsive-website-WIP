import Navbar from './components/navbar/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Film from './pages/film/film';
import Music from './pages/music/music';
import Events from './pages/events/events';
import Attractions from './pages/attractions/attractions';
import Itineraries from './pages/itineraries/itineraries';

export default function App() {
    return (
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
    )
}