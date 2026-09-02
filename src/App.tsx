import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Movies from "./pages/Movies";
import Mylist from "./pages/Mylist";
import Watched from "./pages/Watch";
import Favorites from "./pages/Favorites";
import TVShows from "./pages/Tvshow";
import TVDetails from "./pages/TVDetails";
import Profile from "./pages/Profile";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails/>} /> 
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/my-list" element={<Mylist/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
        <Route path="/watched" element={<Watched/>}/>
        <Route path="/tv-shows" element={<TVShows/>}/>
        <Route path="/tv/:id" element={<TVDetails />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </>
  );
}

export default App;