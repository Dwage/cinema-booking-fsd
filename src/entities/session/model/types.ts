export interface Session {
  id: string
  movieTitle: string
  posterUrl: string
  genres: string[]
  ageRating: string
  dateTime: string
  hallName: string
}

export interface MovieDetails {
  director: string
  screenwriter: string
  actors: string[]
  synopsis: string
  title: string
}

export interface HallLayout {
  rows: number
  seatsPerRow: number
}

export interface HallInfo {
  id: number
  name: string
  totalSeats: number
  layout: HallLayout
  baseTicketPrice: number
  bookedSeats: number[]
}

export interface SessionDetails {
  id: string
  dateTime: string
  movieDetails: MovieDetails
  trailerUrl: string
  hallInfo: HallInfo
}
