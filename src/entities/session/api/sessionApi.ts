import { API_BASE_URL } from '@/shared/config/api'
import type { Session, SessionDetails } from '../model/types'
import type { FilterState } from '@/features/filters/model/store'

export const fetchSessions = async (
  filters?: Partial<FilterState>
): Promise<Session[]> => {
  const url = new URL(`${API_BASE_URL}/sessions`)

  if (filters) {
    if (filters.selectedAgeRatings && filters.selectedAgeRatings.length > 0) {
      filters.selectedAgeRatings.forEach((rating) => {
        url.searchParams.append('ageRating', String(rating))
      })
    }
    if (filters.searchTerm && filters.searchTerm.trim() !== '') {
      url.searchParams.append('movieTitle_like', filters.searchTerm.trim())
    }
    if (filters.dateRange?.start) {
      url.searchParams.append(
        'dateTime_gte',
        `${filters.dateRange.start}T00:00:00Z`
      )
    }
    if (filters.dateRange?.end) {
      url.searchParams.append(
        'dateTime_lte',
        `${filters.dateRange.end}T23:59:59Z`
      )
    }
  }

  url.searchParams.append('_sort', 'dateTime')
  url.searchParams.append('_order', 'asc')

  try {
    console.log('Requesting URL:', url.toString())
    const response = await fetch(url.toString())
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data: Session[] = await response.json()

    let filteredData = data
    if (filters?.selectedGenres && filters.selectedGenres.length > 0) {
      const selectedGenresSet = new Set(filters.selectedGenres)
      filteredData = filteredData.filter((session) =>
        session.genres.some((genre) => selectedGenresSet.has(genre))
      )
    }
    return filteredData
  } catch (error) {
    console.error('Failed to fetch sessions:', error)
    throw error
  }
}

export const fetchSessionDetailsById = async (
  sessionId: string
): Promise<SessionDetails | null> => {
  const url = new URL(`${API_BASE_URL}/session-details`)
  url.searchParams.append('id', sessionId)

  try {
    const response = await fetch(url.toString())

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: SessionDetails[] = await response.json()

    if (data.length === 0) {
      return null
    }

    return data[0]
  } catch (error) {
    console.error(`Failed to fetch session details for ID ${sessionId}:`, error)
    throw error
  }
}
