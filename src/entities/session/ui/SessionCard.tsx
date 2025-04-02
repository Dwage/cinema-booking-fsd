import React from 'react'
import { Link } from 'react-router-dom'
import type { Session } from '../model/types'
import styles from './SessionCard.module.scss'
import { formatSessionDateTime } from '@/shared/lib/helpers/formatSessionDateTime'

interface SessionCardProps {
  session: Session
  className?: string
}

export const SessionCard: React.FC<SessionCardProps> = ({
  session,
  className,
}) => {
  return (
    <Link
      to={`/session/${session.id}`}
      className={`${styles.cardLink} ${className || ''}`}
    >
      <div className={styles.posterWrapper}>
        <img src={session.posterUrl} className={styles.poster} loading="lazy" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{session.movieTitle}</h3>
        <div className={styles.details}>
          {session.genres && session.genres.length > 0 && (
            <p className={styles.detailItem}>
              <strong>Genres:</strong> {session.genres.join(', ')}
            </p>
          )}
          <p className={styles.detailItem}>
            <strong>Rating:</strong> {session.ageRating}
          </p>
          <p className={styles.detailItem}>
            <strong>When:</strong> {formatSessionDateTime(session.dateTime)}
          </p>
          <p className={styles.detailItem}>
            <strong>Where:</strong> {session.hallName}
          </p>
        </div>
      </div>
    </Link>
  )
}
