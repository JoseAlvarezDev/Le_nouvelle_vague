// TMDB API Types

export interface Movie {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genre_ids: number[];
    original_language: string;
    adult: boolean;
    video: boolean;
}

export interface MovieDetails extends Movie {
    runtime: number | null;
    genres: Genre[];
    production_countries: ProductionCountry[];
    spoken_languages: SpokenLanguage[];
    budget: number;
    revenue: number;
    tagline: string;
    status: string;
    credits?: Credits;
    images?: Images;
}

export interface Person {
    id: number;
    name: string;
    profile_path: string | null;
    known_for_department: string;
    popularity: number;
    known_for?: Movie[];
    gender?: number;
    adult?: boolean;
}

export interface PersonDetails extends Person {
    birthday: string | null;
    deathday: string | null;
    biography: string;
    place_of_birth: string | null;
    also_known_as: string[];
    gender: number;
    homepage: string | null;
    imdb_id: string;
    movie_credits?: MovieCredits;
    images?: PersonImages;
}

export interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order: number;
    cast_id: number;
    credit_id: string;
}

export interface Crew {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string | null;
    credit_id: string;
}

export interface Credits {
    cast: Cast[];
    crew: Crew[];
}

export interface MovieCredits {
    cast: MovieCast[];
    crew: MovieCrew[];
}

export interface MovieCast {
    id: number;
    title: string;
    character: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    genre_ids?: number[];
}

export interface MovieCrew {
    id: number;
    title: string;
    job: string;
    department: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    genre_ids?: number[];
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    iso_639_1: string;
    name: string;
    english_name: string;
}

export interface Image {
    file_path: string;
    width: number;
    height: number;
    aspect_ratio: number;
    vote_average: number;
    vote_count: number;
}

export interface Images {
    backdrops: Image[];
    posters: Image[];
}

export interface PersonImages {
    profiles: Image[];
}

export interface TMDBResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

export interface Video {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}

export interface VideoResponse {
    id: number;
    results: Video[];
}
