export interface SearchGames {
  count: number
  next: any
  previous: any
  results: Result[]
  user_platforms: boolean
}

export interface Result {
  slug: string
  name: string
  playtime: number
  platforms: Platform[]
  stores?: Store[]
  released?: string
  tba: boolean
  background_image: string
  rating: number
  rating_top: number
  ratings: any[]
  ratings_count: number
  reviews_text_count: number
  added: number
  added_by_status?: AddedByStatus
  metacritic: any
  suggestions_count: number
  updated: string
  id: number
  score: string
  clip: any
  tags: Tag[]
  esrb_rating?: EsrbRating
  user_game: any
  reviews_count: number
  community_rating: number
  saturated_color: string
  dominant_color: string
  short_screenshots: ShortScreenshot[]
  parent_platforms: ParentPlatform[]
  genres: Genre[]
}

export interface Platform {
  platform: Platform2
}

export interface Platform2 {
  id: number
  name: string
  slug: string
}

export interface Store {
  store: Store2
}

export interface Store2 {
  id: number
  name: string
  slug: string
}

export interface AddedByStatus {
  toplay: number
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
  name_en: string
  name_ru: string
}

export interface ShortScreenshot {
  id: number
  image: string
}

export interface ParentPlatform {
  platform: Platform3
}

export interface Platform3 {
  id: number
  name: string
  slug: string
}

export interface Genre {
  id: number
  name: string
  slug: string
}
