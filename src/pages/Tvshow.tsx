import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import {
    getPopularTVShows,
    getTopRatedTVShows,
    getAiringTodayTVShows,
    getOnTheAirTVShows,
} from "../services/api";
import "./Tvshow.css";

interface TVShow {
    id: number;
    name: string;
    poster_path: string;
    vote_average: number;
}

function TVShows() {
    const [shows, setShows] = useState<TVShow[]>([]);
    const [activeFilter, setActiveFilter] = useState("All");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        let getShows = getPopularTVShows;

        if (activeFilter === "Top Rated") {
            getShows = getTopRatedTVShows;
        } 
        else if (activeFilter === "Airing Today") {
            getShows = getAiringTodayTVShows;
        } 
        else if (activeFilter === "On The Air") {
            getShows = getOnTheAirTVShows;
        }

        getShows(currentPage)
            .then((data) => {
                setShows(data.results);
                setTotalPages(Math.min(data.total_pages, 500));
            })
            .catch((error) => {
                console.error("Error fetching TV Shows:", error);
                setShows([]);
            });

    }, [activeFilter, currentPage]);


    const handleFilterChange = (filter: string) => {
        setActiveFilter(filter);
        setCurrentPage(1);
    };


    return (
        <main className="tv-page">

            <section className="tv-header">
                <h1>TV Shows</h1>
                <p>Discover your next favorite TV show.</p>
                <div className="tv-filters">

                    <button className={activeFilter === "All" ? "active" : ""} onClick={() => handleFilterChange("All")} > All </button>
                    <button className={activeFilter === "Popular" ? "active" : ""} onClick={() => handleFilterChange("Popular")} >Popular</button>
                    <button className={activeFilter === "Top Rated" ? "active" : ""}onClick={() => handleFilterChange("Top Rated")}>Top Rated </button>
                    <button className={activeFilter === "Airing Today" ? "active" : ""} onClick={() => handleFilterChange("Airing Today")} > Airing Today</button>
                    <button className={activeFilter === "On The Air" ? "active" : ""} onClick={() => handleFilterChange("On The Air")} > On The Air </button>

                </div>
            </section>

            <section className="tv-grid">

                {shows.map((show) => (
                    <MovieCard key={show.id} movieId={show.id} title={show.name}
                        poster={show.poster_path} rating={show.vote_average} type="tv" />
                ))}
            </section>

            <div className="pagination">

                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} > ‹ </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {const page = index + 1;

                        return (
                            <button key={page} className={ currentPage === page ? "active" : ""} onClick={() => setCurrentPage(page)}> {page}</button>
                        );
                    }
                )}
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}> › </button>
            </div>

        </main>
    );
}

export default TVShows;