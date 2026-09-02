import Hero from "../components/Hero/Hero";
import MovieCard from "../components/MovieCard/MovieCard";
import { useEffect, useState } from "react";
import { getPopularMovies, getPopularTVShows } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
    const navigate = useNavigate();

    const [movies, setMovies] = useState<any[]>([]);
    const [tvShows, setTvShows] = useState<any[]>([]);

    useEffect(() => {
        getPopularMovies().then((data) => {
            setMovies(data);
        });

        getPopularTVShows().then((data) => {
            setTvShows(data.results || []);
        });
    }, []);

    return (
        <main className="home-page">
            <Hero movies={movies} />

            <section className="content-section">
                <div className="section-header">
                    <h2>Trending Movies</h2>
                    <button className="see-all" onClick={() => navigate("/movies")} > See all <span>›</span> </button>
                </div>

                <div className="movies-grid">
                    {movies.slice(0, 6).map((movie) => (
                        <MovieCard key={movie.id} movieId={movie.id} title={movie.title}
                            poster={movie.poster_path} rating={movie.vote_average} />
                    ))}
                </div>
            </section>
            <section className="content-section">

                <div className="section-header">
                    <h2>TV Shows</h2>
                    <button className="see-all" onClick={() => navigate("/tv-shows")}> See all <span>›</span></button>
                </div>

                <div className="movies-grid">
                    {tvShows.slice(0, 6).map((show) => (
                        <MovieCard key={show.id} movieId={show.id} title={show.name}
                                   poster={show.poster_path} rating={show.vote_average} type="tv" />
                    ))}
                </div>
            </section>
        </main>
    );
}
export default Home;