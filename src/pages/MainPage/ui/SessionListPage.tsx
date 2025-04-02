import React, { useState, useEffect } from 'react'
import { useFilterStore } from '@/features/filters'
import { fetchSessions, Session, SessionCard } from '@/entities/session'
import { Spinner } from '@/shared/ui/Spinner/Spinner'
import styles from './SessionListPage.module.scss'
import { ErrorMessage } from '@/shared/ui/ErrorMessage/ErrorMessage'

export const SessionListPage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const selectedGenres = useFilterStore((state) => state.selectedGenres)
  const dateRange = useFilterStore((state) => state.dateRange)
  const selectedAgeRatings = useFilterStore((state) => state.selectedAgeRatings)
  const searchTerm = useFilterStore((state) => state.searchTerm)

  useEffect(() => {
    const loadSessions = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const currentFilters = {
          selectedGenres,
          dateRange,
          selectedAgeRatings,
          searchTerm,
        }
        const data = await fetchSessions(currentFilters)
        setSessions(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown loading error')
      } finally {
        setIsLoading(false)
      }
    }

    loadSessions()
  }, [selectedGenres, dateRange, selectedAgeRatings, searchTerm])

  return (
    <div className={styles.sessionListContainer}>
      <h2 className={styles.title}>Session List</h2>

      {isLoading && <Spinner size="large" />}
      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && sessions.length === 0 && (
        <p>No sessions found matching your criteria.</p>
      )}

      {!isLoading && !error && sessions.length > 0 && (
        <div className={styles.sessionGrid}>
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      )}
    </div>
  )
}
