import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard/MovieCard";
import { searchMulti } from "../services/api";
import "./Movies.css";

interface Movie { id: number; title?: string; name?: string; poster_path: string; vote_average: number; media_type?: "movie" | "tv";}

function Movies() {

    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    const [movies, setMovies] = useState<Movie[]>([]);
    const [activeFilter, setActiveFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


    useEffect(() => { setCurrentPage(1);}, [searchQuery]);
    useEffect(() => {
        setLoading(true);

        if (searchQuery.trim()) {

            searchMulti(searchQuery, currentPage)
                .then((data) => {
                    setMovies(data.results);
                    setTotalPages(data.total_pages);

                })
                .catch((error) => {

                    console.error("Search error:", error);
                    setMovies([]);
                    setTotalPages(1);

                })
                .finally(() => {
                    setLoading(false);
                });

            return;
        }

        let endpoint = "";
        if (
            activeFilter === "All" || activeFilter === "Popular") {
                endpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`;}

        if (activeFilter === "Top Rated") {
            endpoint = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${currentPage}`;}

        if (activeFilter === "Now Playing") {
            endpoint = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${currentPage}`;}

        if (activeFilter === "Upcoming") {
            endpoint = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${currentPage}`;}


        fetch(endpoint)

            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results || []);
                setTotalPages(
                    Math.min(data.total_pages || 1, 500)
                );
            })

            .catch((error) => {
                console.error(
                    "Error fetching movies:",
                    error
                );
                setMovies([]);
            })

            .finally(() => {
                setLoading(false);
            });

    }, [ searchQuery, activeFilter, currentPage, API_KEY ]);

    const clearSearch = () => {
        setSearchParams({});
        setCurrentPage(1);
    };

    return (

        <main className="movies-page">
            <section className="movies-header">
                <h1> {searchQuery? `Search Results`: "Movies"}</h1>
                <p>  {searchQuery ? `Results for "${searchQuery}"` : "Discover your next favorite movie."} </p>

                {!searchQuery && (

                    <div className="movies-filters">
                        <button className={ activeFilter === "All" ? "active" : "" } onClick={() => {
                                setActiveFilter("All");
                                setCurrentPage(1);
                            }} > All </button>

                        <button className={ activeFilter === "Popular" ? "active" : "" } onClick={() => {
                                setActiveFilter("Popular");
                                setCurrentPage(1);
                            }} > Popular </button>

                        <button
                            className={ activeFilter === "Top Rated"? "active": "" } onClick={() => {
                                setActiveFilter("Top Rated");
                                setCurrentPage(1);
                            }} > Top Rated </button>

                        <button className={ activeFilter === "Now Playing"? "active": "" } onClick={() => {
                                setActiveFilter("Now Playing");
                                setCurrentPage(1);
                            }} > Now Playing </button>

                        <button className={ activeFilter === "Upcoming"? "active": "" } onClick={() => {
                            setActiveFilter("Upcoming");
                            setCurrentPage(1);
                            }} > Upcoming </button>
                    </div>
                )}

                {searchQuery && (
                    <button className="clear-search"  onClick={clearSearch} > ✕ Clear Search </button>
                )}
            </section>

            <section className="movies-grid">

                {loading ? (
                    <div className="search-status"> Searching...</div>

                ) : movies.length > 0 ? (
                    movies.map((item) => (

                        <MovieCard key={`${item.media_type}-${item.id}`} movieId={item.id} title={ item.title || item.name || ""} poster={item.poster_path} 
                                   rating={item.vote_average || 0 } type={ item.media_type === "tv" ? "tv" : "movie" }/>
                    ))

                ) : (

                    <div className="search-status">
                        <h2>No results found</h2>
                        <p> Try another movie or TV show name.</p>
                    </div>
                )}
            </section>

            {movies.length > 0 && (

                <div className="pagination">

                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} > ‹ </button>

                    {Array.from(
                        { length:Math.min(5, totalPages )}, (_, index) => { const page = index + 1;

                            return (
                                <button key={page} className={ currentPage === page? "active": ""} onClick={() =>
                                    setCurrentPage( page )} > {page} </button>
                            );
                        }
                    )}
                    <button disabled={ currentPage === totalPages} onClick={() => setCurrentPage( currentPage + 1)}> › </button>
                </div>
            )}
        </main>
    );
}
export default Movies;