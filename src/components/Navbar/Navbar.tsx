import { NavLink , useNavigate} from "react-router-dom";
import { Search , User , Menu } from "lucide-react";
import "./Navbar.css"
import {  useEffect , useState , useRef } from "react";
import { getCurrentUser , logoutUser ,type  UserData } from "../../services/storage";
function Navbar() {

    const [isMenuopen , setIsMenuOpen] = useState (false);
    const [isSearchOpen , setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const searchRef = useRef<HTMLDivElement>(null);
    const [isUserOpen , setIsUserOpen] = useState(false);
    const userRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutsida = (event: MouseEvent) => {
            if (
                searchRef.current && 
                !searchRef.current.contains(event.target as Node)
            ){
                setIsSearchOpen(false)
            }
        };
        document.addEventListener("mousedown" , handleClickOutsida);
        return () => { document.removeEventListener("mousedown" , handleClickOutsida); }; 
    } , []);

    useEffect(() => {
        const handleUserClickOutside = (event: MouseEvent) => {
        if (
            userRef.current &&
            !userRef.current.contains(event.target as Node)
        ) {
            setIsUserOpen(false);
        }
    };
    document.addEventListener("mousedown", handleUserClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleUserClickOutside); };
}, []);
    const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    navigate(`/movies?search=${encodeURIComponent(searchQuery.trim())}`);

    setIsSearchOpen(false);
    setSearchQuery("");
};


    return (
        <nav className="navbar">

            <div className="logo"> 
                <span className="logo-main"> RORO</span>
                <span className="logo-tv"> TV</span>
            </div>
            <div className={`nav-links ${isMenuopen ? "open" : ""}`}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/movies">Movies</NavLink>
                <NavLink to="/tv-shows">TV Shows</NavLink>
                <NavLink to="/my-List">My List</NavLink>
                 <NavLink to="/favorites">Favorites</NavLink>
            </div>

            {isMenuopen && ( <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}/> )}

            <div className="nav-actions">
                <div ref={searchRef} className="search-container">
                    <button onClick={() => setIsSearchOpen(!isSearchOpen)}><Search /></button>
                    {isSearchOpen && (
                        <form onSubmit={handleSearch}>
                            <input type="text" placeholder="Search..." className="search-input" value={searchQuery}
                                   onChange={(e) => setSearchQuery(e.target.value)} autoFocus/>
                        </form>
                    )}
                </div>
            <div ref={userRef} className="user-container">
                <button onClick={() => { 
                    console.log("USER CLICKED");
                    setIsUserOpen(!isUserOpen);
                    }}>
                <User />
                </button>
                 {isUserOpen && (
                    <div className="user-menu">
                        <NavLink to="/profile">Profile</NavLink>
                    </div>
                 )}
                 </div>
            </div>
            <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuopen)}><Menu/></button>
        </nav>
    )
}
export default Navbar;
