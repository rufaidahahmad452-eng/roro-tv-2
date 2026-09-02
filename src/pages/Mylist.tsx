import { useEffect ,useState } from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import { getMyList } from "../services/storage";
import { useNavigate } from "react-router-dom";
import "./Mylist.css";

function Mylist() {
    const [activeFilter , setActiveFilter] = useState("All");
    const [mylist , setmylist] = useState<any[]>([]);
    const navigate = useNavigate ();
    useEffect(() => {
        setmylist(getMyList());
    } , []);

    const filteredList = mylist.filter((item) => {
    if (activeFilter === "Movies") { return item.type === "movie"; }
    if (activeFilter === "TV Shows") { return item.type === "tv"; }
    return true;
});

    return (
        <main className="mylist-page">
             <section className="mylist-header">
                <h1>My List</h1>
                <p>Tour saved movies and TV shows.</p>
                <div className="mylist-filters">

                    <button className={activeFilter ===  "All"?"active" :""}  onClick={() => setActiveFilter("All")}> All </button>
                    <button className={activeFilter === "Movies" ? "active" : ""}  onClick={() => setActiveFilter("Movies")}> Movies </button>
                    <button className={activeFilter === "TV Shows" ? "active" : ""} onClick={() => setActiveFilter("TV Shows")}> TV Shows </button>
                    <button className="watched-page-button" onClick={() => navigate("/watched")} > ✓ Watched </button>

                </div>
             </section>
             <section className="mylist-content">

    {filteredList.length > 0 ? (

        <div className="mylist-grid">

            {filteredList.map((item) => (

    <MovieCard key={`${item.type}-${item.id}`}  movieId={item.id}  title={item.title || item.name}
        poster={item.poster_path} rating={item.vote_average}  type={item.type}/>

))}
        </div>

    ) : (
        <div className="empty-list">
            <h2>Your list is empty</h2>
            <p> Add movies or TV shows to your list and they will appear here. </p>
        </div>
    )}
</section>
        </main>
    )
}
export default Mylist;