import { Routes, Route } from 'react-router-dom'
import { SessionListPage } from '@/pages/MainPage'
import { SessionDetailPage } from '@/pages/SessionDetailPage'
import { MainLayoutWithSidebar } from './layouts/MainLayoutWithSidebar'
import { SimpleLayout } from './layouts/SimpleLayout'

function App() {
  return (
    <Routes>
      <Route element={<MainLayoutWithSidebar />}>
        <Route path="/" element={<SessionListPage />} />
      </Route>

      <Route element={<SimpleLayout />}>
        <Route path="/session/:sessionId" element={<SessionDetailPage />} />
      </Route>
    </Routes>
  )
}

export default App
