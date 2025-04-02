import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'
import { FilterSidebar } from '@/widgets/FilterSidebar'
import { Button, ButtonVariant } from '@/shared/ui/Button/Button'
import styles from './MainLayoutWithSidebar.module.scss'

export const MainLayoutWithSidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const openSidebar = () => setIsSidebarOpen(true)
  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <div className={styles.layout}>
      <Header />

      <Button
        onClick={openSidebar}
        className={styles.openFiltersButton}
        variant={ButtonVariant.PRIMARY}
      >
        Filters
      </Button>

      <div className={styles.contentWrapper}>
        <main className={styles.mainContent}>
          <Outlet />
        </main>

        <FilterSidebar
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          className={styles.sidebarLayout}
        />
      </div>

      <Footer />
    </div>
  )
}
