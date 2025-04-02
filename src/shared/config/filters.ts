import { SelectOption } from '@/shared/types/common'

export const ALL_GENRES: SelectOption[] = [
  { value: 'action', label: 'Action' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'drama', label: 'Drama' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'horror', label: 'Horror' },
  { value: 'sci-fi', label: 'Sci-fi' },
  { value: 'thriller', label: 'Thriller' },
]

export const ALL_AGE_RATINGS: SelectOption[] = [
  { value: '0+', label: '0+' },
  { value: '6+', label: '6+' },
  { value: '12+', label: '12+' },
  { value: '16+', label: '16+' },
  { value: '18+', label: '18+' },
]

export type GenreValue = Extract<string, (typeof ALL_GENRES)[number]['value']>
export type AgeRatingValue = Extract<
  string,
  (typeof ALL_AGE_RATINGS)[number]['value']
>
