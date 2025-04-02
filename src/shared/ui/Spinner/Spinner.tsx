import React from 'react'
import styles from './Spinner.module.scss'

interface SpinnerProps {
  className?: string
  size?: 'small' | 'medium' | 'large'
}

export const Spinner: React.FC<SpinnerProps> = ({
  className,
  size = 'medium',
}) => {
  const spinnerClasses = [styles.spinner, styles[size], className || '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={styles.container}>
      <div className={spinnerClasses} role="status" aria-live="polite">
        <span className={styles.visuallyHidden}>Loading...</span>
      </div>
    </div>
  )
}
