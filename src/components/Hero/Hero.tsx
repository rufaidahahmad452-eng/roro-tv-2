import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovieDetails } from "../../services/api";
import "./Hero.css";

interface HeroProps { movies: any[];}

function Hero({ movies }: HeroProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [movieDetails, setMovieDetails] = useState<any>(null);
    const navigate = useNavigate();
    const featureedMovies = movies.slice(0, 5);
    const movie = featureedMovies[currentIndex];

    useEffect(() => {
        if (movie?.id) {
            setMovieDetails(null);
            getMovieDetails(movie.id).then((data) => {
                setMovieDetails(data);
            });
        } }, [movie?.id]);

    if (movies.length === 0) { 
        return <section className="hero"></section>; }

    const nextMovie = () => {
        setCurrentIndex(  (prev) => (prev + 1) % featureedMovies.length ); };

    const previousMovie = () => {
        setCurrentIndex( (prev) => (prev - 1 + featureedMovies.length) % featureedMovies.length ); };

    const runtime = movieDetails?.runtime;
    const formattedRuntime = runtime ? `${Math.floor(runtime / 60)}h ${runtime % 60}m`: "";
    const country = movieDetails?.production_countries?.[0]?.iso_3166_1 || "";

    return (
        <section className="hero" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`, }} >
            <div className="hero-content">
                <span className="featured">FEATURED</span>
                <h1>{movie.title}</h1>
                <div className="hero-meta">

                    ⭐{movie.vote_average.toFixed(1)} {" | "} {movie.release_date?.slice(0, 4)}
                    {country && ( <> {" • "} {country} </>)}
                    {formattedRuntime && ( <> {" • "} {formattedRuntime} </> )}
                </div>

                <p> {movie.overview?.length > 180 ? movie.overview.slice(0, 180) + "..." : movie.overview} </p>
                <button onClick={() => navigate(`/movie/${movie.id}`)} > ▶ Watch Now </button>

            </div>

            <div className="hero-controls">

                <button onClick={previousMovie}>‹</button>
                <span> {currentIndex + 1} / {featureedMovies.length} </span>
                <button onClick={nextMovie}> ›</button>

            </div>
        </section>
    );
}

export default Hero;