import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToMyList , removeFromMyList , getMyList , addToFavorites , removeFromFavorites , getFavorites } from "../../services/storage";
 import "./MovieCard.css";
import { IterationCcw } from "lucide-react";

interface MovieCardProps { movieId: number; title: string; poster: string; rating: number;type?: "movie" | "tv"; }

function MovieCard( {movieId, title, poster, rating, type="movie"} : MovieCardProps) {
    const navigate = useNavigate();

    const [inMyList, setInMyList] = useState(
    getMyList().some(
        (item) => item.id === movieId && item.type === type 
    )
);

const [isFavorite, setIsFavorite] = useState(
    getFavorites().some(
        (item) => item.id === movieId && item.type === type
    )
);

const movie = { id: movieId,  title: title, poster_path: poster, vote_average: rating, type: type };

const handleMyList = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (inMyList) {
        removeFromMyList(movieId, type);
        setInMyList(false);
    } else {
        addToMyList(movie);
        setInMyList(true);
    }
};

const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isFavorite) {
        removeFromFavorites(movieId, type);
        setIsFavorite(false);
    } else {
        addToFavorites(movie);
        setIsFavorite(true);
    }
};
    
    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${poster}`} alt={title}/>
                <div className="card-actions">

    <button type="button" className={isFavorite ? "favorite active" : "favorite"}  onClick={handleFavorite}>
        {isFavorite ? "♥" : "♡"} </button>

    <button type="button" className={inMyList ? "my-list active" : "my-list"} onClick={handleMyList} >
        {inMyList ? "✓" : "+"} </button>

</div>
                <div className="poster-info">
                    <h3>{title}</h3>
                    <span>★ {rating.toFixed(1)}</span>
                </div>
                <div className="poster-overlay">
    <button type="button" onClick={(e) => {
        e.stopPropagation();
         if (type === "tv") {
                navigate(`/tv/${movieId}`);
            } else {
                navigate(`/movie/${movieId}`);
            }
        }} >Peek </button>
    </div>
            </div>
            
        </div>
    )
}
export default MovieCard;
