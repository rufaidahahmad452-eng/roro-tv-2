import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getCurrentUser,
    loginUser,
    logoutUser,
    type UserData,
} from "../services/storage";
import "./Profile.css";

function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState<UserData | null>(getCurrentUser());

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const handleAuthChange = () => {
            setUser(getCurrentUser());
        };

        window.addEventListener("authChanged", handleAuthChange);

        return () => {
            window.removeEventListener("authChanged", handleAuthChange);
        };
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            return;
        }

        const loggedUser = loginUser(
            email.trim(),
            password
        );

        setUser(loggedUser);
        setEmail("");
        setPassword("");
    };

    const handleLogout = () => {
        logoutUser();
        setUser(null);
    };

    if (!user) {
        return (
            <main className="profile-page">
                <div className="profile-card login-card">
                    <div className="profile-icon">👤</div>

                    <h1>Welcome Back</h1>
                    <p>Login to your RORO TV account</p>

                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label>Email</label>
                            <input type="email" placeholder="Enter your email" value={email}
                                    onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input type="password" placeholder="Enter your password" value={password} 
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>

                        <button type="submit" className="login-button"> Login</button>
                    </form>
                </div>
            </main>
        );
    }

    return (
        <main className="profile-page">

            <div className="profile-card">
                <div className="profile-icon">👤</div>
                <h1>My Profile</h1>
                <p className="profile-subtitle"> Welcome to RORO TV</p>

                <div className="user-info">
                    <div className="info-item">
                        <span>Email</span>
                        <strong>{user.email}</strong>
                    </div>

                    <div className="info-item">
                        <span>Status</span>
                        <strong className="logged-in"> ● Logged in </strong>
                    </div>
                </div>

                <button className="logout-button" onClick={handleLogout} > Logout</button>
                <button className="home-button"onClick={() => navigate("/")}> Back to Home </button>
            </div>
        </main>
    );
}

export default Profile;