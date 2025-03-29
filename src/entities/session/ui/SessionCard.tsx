import { Session } from '../model/types'

interface SessionCardProps {
  session: Session
}

export const SessionCard = ({ session }: SessionCardProps) => {
  return <div>{session.title}</div>
}
