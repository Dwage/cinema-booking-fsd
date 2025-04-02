import React from 'react'
import {
  FilterByGenre,
  FilterByDate,
  FilterByAgeRating,
  FilterByTitle,
  ResetFilters,
} from '@/features/filters'
import { Button, ButtonVariant } from '@/shared/ui/Button/Button'
import styles from './FilterSidebar.module.scss'

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  className,
}) => {
  const sidebarClasses = [
    styles.sidebar,
    isOpen ? styles.open : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ')

  const overlayClasses = `${styles.overlay} ${isOpen ? styles.visible : ''}`

  return (
    <>
      <div
        className={overlayClasses}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <aside className={sidebarClasses}>
        <div className={styles.header}>
          <h3 className={styles.title}>Filters</h3>
          <Button
            onClick={onClose}
            variant={ButtonVariant.GHOST}
            className={styles.closeButton}
            aria-label="Close filters"
          >
            ×
          </Button>
        </div>

        <div className={styles.content}>
          <div className={styles.filterGroup}>
            <FilterByTitle />
          </div>
          <div className={styles.filterGroup}>
            <FilterByGenre />
          </div>
          <div className={styles.filterGroup}>
            <FilterByAgeRating />
          </div>
          <div className={styles.filterGroup}>
            <FilterByDate />
          </div>

          <ResetFilters />
        </div>
      </aside>
    </>
  )
}
