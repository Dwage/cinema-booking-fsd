import { create } from 'zustand'
import type { GenreValue, AgeRatingValue } from '@/shared/config/filters'

interface DateRange {
  start: string | null
  end: string | null
}

export interface FilterState {
  selectedGenres: GenreValue[]
  dateRange: DateRange
  selectedAgeRatings: AgeRatingValue[]
  searchTerm: string
}

interface FilterActions {
  setGenres: (genres: GenreValue[]) => void
  setDateRangeStart: (date: string | null) => void
  setDateRangeEnd: (date: string | null) => void
  setDateRange: (range: DateRange) => void
  setAgeRatings: (ratings: AgeRatingValue[]) => void
  setSearchTerm: (term: string) => void
  resetFilters: () => void
}

const initialState: FilterState = {
  selectedGenres: [],
  dateRange: { start: null, end: null },
  selectedAgeRatings: [],
  searchTerm: '',
}

export const useFilterStore = create<FilterState & FilterActions>((set) => ({
  ...initialState,
  setGenres: (genres) => set({ selectedGenres: genres }),
  setDateRangeStart: (date) =>
    set((state) => ({
      dateRange: { ...state.dateRange, start: date },
    })),
  setDateRangeEnd: (date) =>
    set((state) => ({
      dateRange: { ...state.dateRange, end: date },
    })),
  setDateRange: (range) => set({ dateRange: range }),
  setAgeRatings: (ratings) => set({ selectedAgeRatings: ratings }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  resetFilters: () => set(initialState),
}))

export const selectSelectedGenres = (state: FilterState & FilterActions) =>
  state.selectedGenres
export const selectDateRange = (state: FilterState & FilterActions) =>
  state.dateRange
export const selectSelectedAgeRatings = (state: FilterState & FilterActions) =>
  state.selectedAgeRatings
export const selectSearchTerm = (state: FilterState & FilterActions) =>
  state.searchTerm

export const selectIsAnyFilterActive = (
  state: FilterState & FilterActions
): boolean => {
  return (
    state.selectedGenres.length > 0 ||
    state.dateRange.start !== null ||
    state.dateRange.end !== null ||
    state.selectedAgeRatings.length > 0 ||
    state.searchTerm !== ''
  )
}
