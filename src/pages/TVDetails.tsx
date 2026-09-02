import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTVDetails, getTVSeason, getSimilarTVShows } from "../services/api";
import { addToMyList, removeFromMyList, getMyList,  addToFavorites, removeFromFavorites,getFavorites, addToWatched, removeFromWatched, getWatched} from "../services/storage";
import MovieCard from "../components/MovieCard/MovieCard";
import "./TVDetails.css";

function TVDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [show, setShow] = useState<any>(null);
    const [season, setSeason] = useState<any>(null);
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [similarShows, setSimilarShows] = useState<any[]>([]);
    const [showAll, setShowAll] = useState(false);
    const [inList, setInList] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [watched, setWatched] = useState(false);

    useEffect(() => {
        if (id) {
            getTVDetails(id).then((data) => {
                setShow(data);
                setInList( getMyList().some( (item) => item.id === data.id && item.type === "tv" ));
                setFavorite( getFavorites().some( (item) => item.id === data.id && item.type === "tv" ));
                setWatched( getWatched().some( (item) => item.id === data.id && item.type === "tv" ));
            });

            getSimilarTVShows(id).then((data) => {
                setSimilarShows(data);
            });
        } }, [id]);

    useEffect(() => {
        if (id) {
            getTVSeason(id, selectedSeason).then((data) => {
                setSeason(data);
            });
        } }, [id, selectedSeason]);

    if (!show) { return <p>Loading...</p>; }

    const seasons = show.seasons?.filter(
        (season: any) => season.season_number > 0 );

    const tvItem = { id: show.id, title: show.name, poster_path: show.poster_path, vote_average: show.vote_average, type: "tv" as const };

    const handleMyList = () => {
        if (inList) {
            removeFromMyList(show.id, "tv");
            setInList(false);
        } else {
            addToMyList(tvItem);
            setInList(true);
        }
    };

    const handleFavorite = () => {
        if (favorite) {
            removeFromFavorites(show.id, "tv");
            setFavorite(false);
        } else {
            addToFavorites(tvItem);
            setFavorite(true);
        }
    };

    const handleWatched = () => {
        if (watched) {
            removeFromWatched(show.id, "tv");
            setWatched(false);
        } else {
            addToWatched(tvItem);
            setWatched(true);
        }
    };

    const episodes = showAll ? season?.episodes : season?.episodes.slice(0, 4);

    return (
        <div className="tv-details" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${show.backdrop_path})`}}>
            <button className="back-button" onClick={() => navigate(-1)} > ‹ </button>
            <section className="tv-hero">
                <img className="tv-poster" src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} />
                <div className="tv-info">
                    <h1>{show.name}</h1>
                    <div className="tv-meta">
                        <span>⭐ {show.vote_average?.toFixed(1)}</span>
                        <span>{show.first_air_date?.slice(0, 4)}</span>
                        <span>{seasons?.length} Seasons</span>
                        <span>TV-MA</span>
                    </div>

                    <div className="genres"> {show.genres?.map((genre: any) => (
                        <span key={genre.id}> {genre.name} </span> ))}
                    </div>
                    <p className="overview"> {show.overview}</p>
                    <div className="actions">

                        <button className="watch"> ▶ Watch Now </button>
                        <button onClick={handleMyList}> {inList ? "✓ My List" : "♡ My List"} </button>
                        <button onClick={handleFavorite}> {favorite ? "♥ Favorites" : "♡ Favorites"} </button>
                        <button onClick={handleWatched}>  {watched ? "✓ Watched" : "Mark as Watched"} </button>
                    </div>
                </div>
            </section>
            <section className="seasons-section">
                <h2>Seasons</h2>
                <div className="seasons"> {seasons?.map((item: any) => (
                        <div className={ selectedSeason === item.season_number? "season active": "season" } 
                             key={item.id} onClick={() => setSelectedSeason(item.season_number)} >

                            <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.name} />
                            <h3> Season {item.season_number} </h3>
                            <p> {item.episode_count} Episodes </p>
                        </div>
                    ))}
                </div>
            </section>

            {season && (

                <section className="episodes-section">
                    <div className="episodes-title">
                        <h2>{season.name}</h2>
                        <span> {season.episodes.length} Episodes</span>
                    </div>

                    {episodes.map((episode: any) => (

                        <div className="episode" key={episode.id} >
                            <span className="episode-number"> {episode.episode_number}</span>
                            <img src={ episode.still_path ? `https://image.tmdb.org/t/p/w500${episode.still_path}`: ""} alt={episode.name}/>
                            <div className="episode-info">
                                <h3> Episode {episode.episode_number} </h3>
                                <p> {episode.overview} </p>
                            </div>
                            <span> {episode.runtime || "--"} min </span>
                            <b>2K</b>
                            <span>⋮</span>
                        </div>
                    ))}

                    {season.episodes.length > 4 && (
                        <button className="more-episodes"  onClick={() => setShowAll(!showAll)} > {showAll? "Show Less Episodes ↑": "Show More Episodes ↓"} </button>
                    )}
                </section>
            )}

            <section className="similar-shows">
                <h2>Similar Shows</h2>
                <div className="similar-grid">
                    {similarShows.slice(0, 6).map((show) => (
                        <MovieCard key={show.id} movieId={show.id} title={show.name} poster={show.poster_path}
                            rating={show.vote_average} type="tv" />
                            ))}
                </div>
            </section>
        </div>
    );
}
export default TVDetails;