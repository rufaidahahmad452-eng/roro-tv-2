import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import { getWatched } from "../services/storage";
import "./Watch.css";

function Watched() {
    const [watched, setWatched] = useState<any[]>([]);
    const [activeFilter, setActiveFilter] = useState("All");

    useEffect(() => {
        setWatched(getWatched()) }, []);

    const filteredList = watched.filter((item) => {

        if (activeFilter === "Movies") { return item.type === "movie"; }
        if (activeFilter === "TV Shows") { return item.type === "tv"; }
        return true;
    });

    return (
        <main className="watched-page">
            <section className="watched-header">
                <h1>Watched</h1>
                <p>Movies and TV shows you've watched </p>
                <div className="watched-filters">

                    <button className={activeFilter === "All" ? "active" : ""} onClick={() => setActiveFilter("All")}>All</button>
                    <button className={activeFilter === "Movies" ? "active" : ""} onClick={() => setActiveFilter("Movies")}> Movies</button>
                    <button className={activeFilter === "TV Shows" ? "active" : ""} onClick={() => setActiveFilter("TV Shows")}>TV Shows</button>
                </div>
            </section>

            <section className="watched-content">
                {filteredList.length > 0 ? (
                    <div className="watched-grid">
                        {filteredList.map((item) => (
                            <MovieCard key={`${item.type}-${item.id}`} movieId={item.id}
                                title={item.title || item.name} poster={item.poster_path}
                                rating={item.vote_average}
                            />
                        ))}

                    </div>

                ) : (

                    <div className="empty-watched">
                        <h2>No watched movies yet</h2>
                        <p> Movies and TV shows you watch will appear here.</p>
                    </div>

                )}
            </section>
        </main>
    );
}

export default Watched;