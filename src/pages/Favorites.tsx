import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import { getFavorites } from "../services/storage";
import { useNavigate } from "react-router-dom";
import "./Favorites.css";

function Favorites() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [favorites, setFavorites] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    const filteredFavorites = favorites.filter((item) => {
        if (activeFilter === "Movies") { return item.type === "movie" }
        if (activeFilter === "TV Shows") { return item.type === "tv"; }
        return true;
    });

    return (
    
        <main className="favorites-page">
            <section className="favorites-header">
                <h1>Favorites</h1>
                <p> Your favorite movies and TV shows.</p>
                <div className="favorites-filters">

                    <button className={activeFilter === "All" ? "active" : ""} onClick={() => setActiveFilter("All")} > All </button>
                    <button className={activeFilter === "Movies" ? "active" : ""} onClick={() => setActiveFilter("Movies")} > Movies </button>
                    <button className={activeFilter === "TV Shows" ? "active" : ""} onClick={() => setActiveFilter("TV Shows")} > TV Shows </button>
                    <button className="my-list-button" onClick={() => navigate("/my-list")} > + My List </button>

                </div>
            </section>
            <section className="favorites-content">
                {filteredFavorites.length > 0 ? (
                    <div className="favorites-grid">

                        {filteredFavorites.map((item) => (
                            <MovieCard key={`${item.type}-${item.id}`}  movieId={item.id} title={item.title || item.name}
                                       poster={item.poster_path} rating={item.vote_average} type={item.type} />
                        ))}
                    </div>
                ) : (

                    <div className="empty-favorites">
                        <h2>No Favorites Yet</h2>
                        <p> Add movies or TV shows to your favorites and they will appear here.</p>
                    </div>
                )}
            </section>
        </main>
    );
}
export default Favorites;