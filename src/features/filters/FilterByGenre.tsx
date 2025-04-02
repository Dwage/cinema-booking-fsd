import React from 'react'
import {
  useFilterStore,
  selectSelectedGenres,
} from '@/features/filters/model/store'
import { ALL_GENRES } from '@/shared/config/filters'
import MultiSelectCheckbox from '@/shared/ui/MultiSelectCheckbox/MultiSelectCheckbox'
import type { GenreValue } from '@/shared/config/filters'

export const FilterByGenre: React.FC = () => {
  const selectedGenres = useFilterStore(selectSelectedGenres)
  const setGenres = useFilterStore((state) => state.setGenres)

  const handleGenreChange = (newValues: (string | number)[]) => {
    setGenres(newValues as GenreValue[])
  }

  return (
    <MultiSelectCheckbox
      label="Genres"
      options={ALL_GENRES}
      value={selectedGenres}
      onChange={handleGenreChange}
      placeholder="Choose genres..."
    />
  )
}
