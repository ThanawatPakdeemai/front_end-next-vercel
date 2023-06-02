export interface INotificationProps {
  id: string
  title: string
  createdAt: Date
  description?: string
  handleClick?: () => void
}
