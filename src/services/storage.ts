export interface ListItem { id: number; title: string; name?: string;
    poster_path: string; vote_average: number; type: "movie" | "tv"; }

export const getMyList = (): ListItem[] => {
    const saved = localStorage.getItem("myList");

    if (!saved) { return []; }
    return JSON.parse(saved);
};

export const addToMyList = (item: ListItem) => {

    const currentList = getMyList();
    const alreadyExists = currentList.some(  (movie) => movie.id === item.id && movie.type === item.type);
    if (alreadyExists) {
        return;
    }

    localStorage.setItem( "myList", JSON.stringify([...currentList, item]));
};

export const removeFromMyList = (id: number, type: "movie" | "tv") => {
    const currentList = getMyList();

    const updatedList = currentList.filter( (item) => !(item.id === id && item.type === type));
    localStorage.setItem( "myList", JSON.stringify(updatedList));
};

export const getFavorites = (): ListItem[] => {
    const saved = localStorage.getItem("favorites");

    if (!saved) {
        return [];
    }

    return JSON.parse(saved);
};

export const addToFavorites = (item: ListItem) => {
    const currentFavorites = getFavorites();

    const alreadyExists = currentFavorites.some(
        (movie) => movie.id === item.id && movie.type === item.type
    );

    if (alreadyExists) {
        return;
    }

    localStorage.setItem(
        "favorites",
        JSON.stringify([...currentFavorites, item])
    );
};

export const removeFromFavorites = (
    id: number,
    type: "movie" | "tv"
) => {
    const currentFavorites = getFavorites();

    const updatedFavorites = currentFavorites.filter(
        (item) => !(item.id === id && item.type === type)
    );

    localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
    );
};


export const getWatched = (): ListItem[] => {
    const saved = localStorage.getItem("watched");

    if (!saved) { return []; }
    return JSON.parse(saved);
};

export const addToWatched = (item: ListItem) => {
    const currentWatched = getWatched();

    const alreadyExists = currentWatched.some(
        (movie) => movie.id === item.id && movie.type === item.type
    );

    if (alreadyExists) {  return; }

    localStorage.setItem( "watched",
        JSON.stringify([...currentWatched, item])
    );
};

export const removeFromWatched = (
    id: number,
    type: "movie" | "tv"
) => {
    const currentWatched = getWatched();

    const updatedWatched = currentWatched.filter(
        (item) => !(item.id === id && item.type === type)
    );

    localStorage.setItem(
        "watched",
        JSON.stringify(updatedWatched)
    );
};

export interface UserData {
    email: string;
    password: string;
}

const USER_KEY = "currentUser";

export const getCurrentUser = (): UserData | null => {
    const savedUser = localStorage.getItem(USER_KEY);

    if (!savedUser) {
        return null;
    }

    try {
        return JSON.parse(savedUser);
    } catch {
        localStorage.removeItem(USER_KEY);
        return null;
    }
};

export const loginUser = (
    email: string,
    password: string
) => {
    const user = {
        email,
        password,
    };

    localStorage.setItem(
        USER_KEY,
        JSON.stringify(user)
    );

    window.dispatchEvent(new Event("authChanged"));

    return user;
};

export const logoutUser = () => {
    localStorage.removeItem(USER_KEY);

    window.dispatchEvent(new Event("authChanged"));
};