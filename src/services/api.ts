const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function searchMulti(query: string, page = 1) {
    const isArabic = /[\u0600-\u06FF]/.test(query);
    const language = isArabic ? "ar" : "en-US";

    const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=${language}&page=${page}&include_adult=false`);

    if (!response.ok) {
        throw new Error("Search failed");
    }

    const data = await response.json();

    return {
        results: data.results.filter(
            (item: any) => item.media_type === "movie" || item.media_type === "tv" ), total_pages: Math.min(data.total_pages || 1, 500) };
}

export async function getPopularMovies() {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}` );
  console.log("STATUS:", response.status);
  const data = await response.json();
  console.log("DATA:", data);
  return data.results;
}

export async function getMovieDetails(id:string) {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
}

export async function getSimilarMovies(id:string){
  const response = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
}

export async function getPopularTVShows(page = 1) {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
    const data = await response.json();
    return data;
}

export async function getTopRatedTVShows(page = 1) {
    const response = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`);
    const data = await response.json();
    return data;
}

export async function getAiringTodayTVShows(page = 1) {
    const response = await fetch( `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=${page}`);
    const data = await response.json();
    return data;
}

export async function getOnTheAirTVShows(page = 1) {
    const response = await fetch( `${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${page}`);
    const data = await response.json();
    return data;
}


export async function getTVDetails(id: string) {
  const response = await fetch( `${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
}



export async function getTVSeason(
    tvId: string, seasonNumber: number ) {
    const response = await fetch(`${BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US` );
    if (!response.ok) {
        throw new Error("Failed to fetch season"); }
    return response.json();
}

export async function getSimilarTVShows(id: string) {
    const response = await fetch(`${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    return data.results;
}

