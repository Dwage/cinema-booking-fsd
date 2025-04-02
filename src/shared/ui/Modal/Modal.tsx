import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.scss'
import { Button, ButtonVariant } from '@/shared/ui/Button/Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
  containerClassName?: string
}

const modalRoot = document.getElementById('modal-root')
if (!modalRoot) {
  const el = document.createElement('div')
  el.id = 'modal-root'
  document.body.appendChild(el)
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  containerClassName,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return ReactDOM.createPortal(
    <div
      className={`${styles.overlay} ${containerClassName || ''}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`${styles.modalContent} ${className || ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.modalHeader}>
          {title && <h2 className={styles.modalTitle}>{title}</h2>}
          <Button
            variant={ButtonVariant.GHOST}
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close modal"
          >
            ×
          </Button>
        </header>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  )
}
