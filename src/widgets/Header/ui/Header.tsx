import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Cinema-Sessions
        </Link>
      </div>
    </header>
  )
}
