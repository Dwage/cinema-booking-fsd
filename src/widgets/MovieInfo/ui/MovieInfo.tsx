import React from 'react'
import type { MovieDetails } from '@/entities/session'
import styles from './MovieInfo.module.scss'

interface MovieInfoProps {
  details: MovieDetails
}

export const MovieInfo: React.FC<MovieInfoProps> = ({ details }) => {
  return (
    <div className={styles.movieInfo}>
      <div className={styles.detailRow}>
        <strong className={styles.label}>Director:</strong>
        <span className={styles.value}>{details.director}</span>
      </div>
      <div className={styles.detailRow}>
        <strong className={styles.label}>Screenwriter:</strong>
        <span className={styles.value}>{details.screenwriter}</span>
      </div>
      {details.actors && details.actors.length > 0 && (
        <div className={styles.detailRow}>
          <strong className={styles.label}>Actors:</strong>
          <span className={styles.value}>{details.actors.join(', ')}</span>
        </div>
      )}
      <div className={styles.synopsis}>
        <strong className={styles.label}>Synopsis:</strong>
        <p className={styles.synopsisText}>{details.synopsis}</p>
      </div>
    </div>
  )
}
