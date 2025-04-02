import React from 'react'
import {
  useFilterStore,
  selectSelectedAgeRatings,
} from '@/features/filters/model/store'
import { ALL_AGE_RATINGS } from '@/shared/config/filters'
import MultiSelectCheckbox from '@/shared/ui/MultiSelectCheckbox/MultiSelectCheckbox'
import type { AgeRatingValue } from '@/shared/config/filters'

export const FilterByAgeRating: React.FC = () => {
  const selectedAgeRatings = useFilterStore(selectSelectedAgeRatings)
  const setAgeRatings = useFilterStore((state) => state.setAgeRatings)

  const handleRatingChange = (newValues: (string | number)[]) => {
    setAgeRatings(newValues as AgeRatingValue[])
  }

  return (
    <MultiSelectCheckbox
      label="Age rating"
      options={ALL_AGE_RATINGS}
      value={selectedAgeRatings}
      onChange={handleRatingChange}
      placeholder="Choose rating(s)..."
    />
  )
}
