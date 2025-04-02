import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchSessionDetailsById, SessionDetails } from '@/entities/session'
import { Spinner } from '@/shared/ui/Spinner/Spinner'
import { MovieInfo } from '@/widgets/MovieInfo'
import { TrailerViewer } from '@/widgets/TrailerViewer'
import { BookingWidget } from '@/widgets/SessionBookingWidget'
import { Button, ButtonVariant, ButtonSize } from '@/shared/ui/Button/Button'
import styles from './SessionDetailPage.module.scss'
import { ErrorMessage } from '@/shared/ui/ErrorMessage/ErrorMessage'
import { formatSessionDateTime } from '@/shared/lib/helpers/formatSessionDateTime'

export const SessionDetailPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>()
  const [details, setDetails] = useState<SessionDetails | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  useEffect(() => {
    if (!sessionId) {
      setError('Session ID not found in URL.')
      setIsLoading(false)
      return
    }
    const loadDetails = async () => {
      setIsLoading(true)
      setError(null)
      setDetails(null)
      try {
        const data = await fetchSessionDetailsById(sessionId)
        if (data) {
          setDetails(data)
        } else {
          setError(`Session details not found for ID: ${sessionId}`)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown loading error')
      } finally {
        setIsLoading(false)
      }
    }
    loadDetails()
  }, [sessionId])

  const handleOpenBookingModal = () => setIsBookingModalOpen(true)
  const handleCloseBookingModal = () => setIsBookingModalOpen(false)

  if (isLoading) {
    return <Spinner size="large" />
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <ErrorMessage message={error} />
        <Link to="/" className={styles.backLink}>
          ← Back to list
        </Link>
      </div>
    )
  }

  if (!details) {
    return (
      <div className={styles.errorContainer}>
        <p>Session details could not be loaded or not found.</p>
        <Link to="/" className={styles.backLink}>
          ← Back to list
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.pageContainer}>
      <Link to="/" className={styles.backLink}>
        ← Back to list
      </Link>
      <header className={styles.pageHeader}>
        <h1>{details.movieDetails.title}</h1>
        <p className={styles.sessionTime}>
          {formatSessionDateTime(details.dateTime)} in {details.hallInfo.name}
        </p>
      </header>

      <section className={`${styles.section} ${styles.trailerSection}`}>
        <h2>Trailer</h2>
        <TrailerViewer
          url={details.trailerUrl}
          title={details.movieDetails.title + ' Trailer'}
        />
      </section>

      <section className={styles.section}>
        <h2>Movie Details</h2>
        <MovieInfo details={details.movieDetails} />
      </section>

      <section className={`${styles.section} ${styles.bookingTriggerSection}`}>
        <h2>Tickets</h2>
        <p>Select your seats and book tickets.</p>
        <Button
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.LARGE}
          onClick={handleOpenBookingModal}
        >
          Book Now
        </Button>
      </section>

      {sessionId && (
        <BookingWidget
          isOpen={isBookingModalOpen}
          onClose={handleCloseBookingModal}
          hallInfo={details.hallInfo}
          sessionId={sessionId}
          sessionTitle={details.movieDetails.title}
          sessionTime={formatSessionDateTime(details.dateTime)}
        />
      )}
    </div>
  )
}
