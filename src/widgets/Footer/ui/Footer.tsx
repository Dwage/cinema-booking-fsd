import React from 'react'
import styles from './Footer.module.scss'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          © {currentYear} Cinema-Sessions. All rights are protected.
        </p>
      </div>
    </footer>
  )
}
