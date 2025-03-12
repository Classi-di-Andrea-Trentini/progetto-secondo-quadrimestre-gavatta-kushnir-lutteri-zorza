export interface InfoGioco {
    id: number
    slug: string
    name: string
    name_original: string
    description: string
    metacritic: any
    metacritic_platforms: any[]
    released: string
    tba: boolean
    updated: string
    background_image: string
    background_image_additional: string
    website: string
    rating: number
    rating_top: number
    ratings: Rating[]
    reactions: Reactions
    added: number
    added_by_status: AddedByStatus
    playtime: number
    screenshots_count: number
    movies_count: number
    creators_count: number
    achievements_count: number
    parent_achievements_count: number
    reddit_url: string
    reddit_name: string
    reddit_description: string
    reddit_logo: string
    reddit_count: number
    twitch_count: number
    youtube_count: number
    reviews_text_count: number
    ratings_count: number
    suggestions_count: number
    alternative_names: string[]
    metacritic_url: string
    parents_count: number
    additions_count: number
    game_series_count: number
    user_game: any
    reviews_count: number
    saturated_color: string
    dominant_color: string
    parent_platforms: ParentPlatform[]
    platforms: Platform2[]
    stores: Store[]
    developers: Developer[]
    genres: Genre[]
    tags: Tag[]
    publishers: any[]
    esrb_rating: EsrbRating
    clip: any
    description_raw: string
  }
  
  export interface Rating {
    id: number
    title: string
    count: number
    percent: number
  }
  
  export interface Reactions {
    "1": number
    "2": number
    "3": number
    "4": number
    "5": number
    "6": number
    "7": number
    "8": number
    "9": number
    "15": number
    "16": number
  }
  
  export interface AddedByStatus {
    yet: number
    owned: number
    beaten: number
    toplay: number
    dropped: number
    playing: number
  }
  
  export interface ParentPlatform {
    platform: Platform
  }
  
  export interface Platform {
    id: number
    name: string
    slug: string
  }
  
  export interface Platform2 {
    platform: Platform3
    released_at: string
    requirements: Requirements
  }
  
  export interface Platform3 {
    id: number
    name: string
    slug: string
    image: any
    year_end: any
    year_start: any
    games_count: number
    image_background: string
  }
  
  export interface Requirements {
    minimum?: string
  }
  
  export interface Store {
    id: number
    url: string
    store: Store2
  }
  
  export interface Store2 {
    id: number
    name: string
    slug: string
    domain: string
    games_count: number
    image_background: string
  }
  
  export interface Developer {
    id: number
    name: string
    slug: string
    games_count: number
    image_background: string
  }
  
  export interface Genre {
    id: number
    name: string
    slug: string
    games_count: number
    image_background: string
  }
  
  export interface Tag {
    id: number
    name: string
    slug: string
    language: string
    games_count: number
    image_background: string
  }
  
  export interface EsrbRating {
    id: number
    name: string
    slug: string
  }
  