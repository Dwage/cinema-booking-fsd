import React from 'react'
import { useFilterStore, selectDateRange } from '@/features/filters/model/store'
import styles from './FilterByDate.module.scss'

export const FilterByDate: React.FC = () => {
  const { start, end } = useFilterStore(selectDateRange)
  const setStartDate = useFilterStore((state) => state.setDateRangeStart)
  const setEndDate = useFilterStore((state) => state.setDateRangeEnd)

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value || null)
  }

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value || null)
  }

  return (
    <div>
      <label className={styles.label}>Session date</label>
      <div>
        <span className={styles.span}>From:</span>
        <input
          className={styles.input}
          type="date"
          value={start || ''}
          onChange={handleStartDateChange}
          max={end || undefined}
          lang="en"
        />
        <span className={styles.span}>To:</span>
        <input
          className={styles.input}
          type="date"
          value={end || ''}
          onChange={handleEndDateChange}
          min={start || undefined}
          lang="en"
        />
      </div>
    </div>
  )
}
