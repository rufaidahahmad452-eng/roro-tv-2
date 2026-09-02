import { useEffect , useState } from "react";
import { useNavigate , useParams } from "react-router-dom";
import { getMovieDetails, getSimilarMovies } from "../services/api";
import { addToWatched, removeFromWatched, getWatched, addToMyList, removeFromMyList, getMyList, addToFavorites,removeFromFavorites,getFavorites} from "../services/storage";
import MovieCard from "../components/MovieCard/MovieCard";
import "./MovieDetails.css";

function MovieDetails() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [movie , setMovie] = useState<any>(null);
    const [similarMovies , setSimilarMovies] = useState<any[]>([]);
    const [isWatched , setIsWatched] = useState (false);
    const [isInMyList, setIsInMyList] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (id) { getMovieDetails(id).then((data) => {
            setMovie(data);
            setIsFavorite(
                getFavorites().some(
                    (item) =>
                        item.id === data.id &&
                        item.type === "movie"
                    )
);
        });
        getSimilarMovies(id).then((data) => {
            setSimilarMovies(data);
        });
        }
    }, [id]);

    useEffect(() => {
    if (movie) {
        const myList = getMyList();
        const exists = myList.some(
            (item) => item.id === movie.id && item.type === "movie"
        );

        setIsInMyList(exists);
    }
}, [movie]);

    useEffect(() => {
    if (movie) {
        const watched = getWatched();
        const exists = watched.some(
            (item) => item.id === movie.id && item.type === "movie" );
        setIsWatched(exists);
    }
}, [movie]);

    if(!movie) { return <p>Loading...</p>}
    console.log("MovieID:" , id);

    const handleMyList = () => {
    const movieItem = { id: movie.id, title: movie.title, poster_path: movie.poster_path,
        vote_average: movie.vote_average, type: "movie" as const };

    if (isInMyList) {
        removeFromMyList(movie.id, "movie");
        setIsInMyList(false);
    } else {
        addToMyList(movieItem);
        setIsInMyList(true);
    }
};

    const handleWatched = () => {
    const movieItem = { id: movie.id, title: movie.title, poster_path: movie.poster_path,
        vote_average: movie.vote_average, type: "movie" as const };

    if (isWatched) {
        removeFromWatched(movie.id, "movie");
        setIsWatched(false);
    } else {
        addToWatched(movieItem);
        setIsWatched(true);
    }
};

const movieItem = {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
    type: "movie" as const
};

const handleFavorite = () => {
    if (isFavorite) {
        removeFromFavorites(movie.id, "movie");
        setIsFavorite(false);
    } else {
        addToFavorites(movieItem);
        setIsFavorite(true);
    }
};


  return (
    <div className="movie-page" style={{backgroundImage:`url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` , }}>
        <button className="back-button" onClick={() => navigate(-1)}> ‹ </button>
  <div className="movie-details">

    <div className="details-content">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="details-poster"/>
        <div className="details-info">
        <h1>{movie.title}</h1>
        <p>⭐ {movie.vote_average?.toFixed(1)}</p>
        <p className="movie-meta">
            {movie.release_date?.slice(0, 4)} •{" "} {movie.production_countries[0]?.iso_3166_1} •{" "} 
            {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
        </p>
        <div className="genres"> {movie.genres.map((genre: any) => (
            <span key={genre.id}>{genre.name}</span>))}
        </div>
        <p className="overview">{movie.overview}</p>
        <div className="movie-actions">
            <button className="watch-button"> ▶ Watch Now</button>
            <button className="list-button" onClick={handleMyList} > {isInMyList ? "✓ In My List" : "☰ My List"}</button>
            <button className="list-button" onClick={handleFavorite} > {isFavorite ? "♥ Favorites" : "♡ Favorites"} </button>
            <button className="list-button" onClick={handleWatched} > {isWatched ? "✓ Watched" : " Mark as Watched"} </button>
        </div>
      </div>

    </div>
  </div>
  <section className="similar-movies" >
  <h2>Similar Movies</h2>
  <div className="movies-grid">
    {similarMovies.slice(0, 6).map((movie) => (
      <MovieCard key={movie.id} movieId={movie.id} title={movie.title}
        poster={movie.poster_path} rating={movie.vote_average}/>
    ))}
  </div>
</section>
  </div>

  );
}

export default MovieDetails;