import React from 'react'
import {
  useFilterStore,
  selectSearchTerm,
} from '@/features/filters/model/store'
import styles from './FilterByTitle.module.scss'

export const FilterByTitle: React.FC = () => {
  const searchTerm = useFilterStore(selectSearchTerm)
  const setSearchTerm = useFilterStore((state) => state.setSearchTerm)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className={styles.container}>
      <label htmlFor="filter-title" className={styles.label}>
        Movie Title
      </label>
      <input
        id="filter-title"
        type="search"
        className={styles.searchInput}
        placeholder="Enter title..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  )
}
