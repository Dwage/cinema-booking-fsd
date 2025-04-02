import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'
import styles from './SimpleLayout.module.scss'

export const SimpleLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.contentWrapper}>
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
