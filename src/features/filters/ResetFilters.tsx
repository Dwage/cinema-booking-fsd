import React from 'react'
import {
  useFilterStore,
  selectIsAnyFilterActive,
} from '@/features/filters/model/store'
import { Button, ButtonVariant } from '@/shared/ui/Button/Button'

export const ResetFilters: React.FC = () => {
  const resetFilters = useFilterStore((state) => state.resetFilters)
  const isAnyFilterActive = useFilterStore(selectIsAnyFilterActive)

  if (!isAnyFilterActive) {
    return null
  }

  return (
    <Button
      onClick={resetFilters}
      variant={ButtonVariant.OUTLINE}
      style={{ width: '100%', marginTop: '1rem' }}
    >
      Reset all filters
    </Button>
  )
}
