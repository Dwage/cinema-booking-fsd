import { useState } from 'react'
import { SessionCard } from './SessionCard'
import { Session } from '../model/types'

interface SessionListProps {}

export const SessionList = () => {
  const [sessionDetailsList, setSessionDetailsList] = useState<Session[]>([])
  return (
    <div>
      {sessionDetailsList.map((session: Session) => (
        <SessionCard session={session} />
      ))}
    </div>
  )
}
