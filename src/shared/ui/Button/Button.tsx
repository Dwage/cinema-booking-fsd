import styles from './Button.module.scss'

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  OUTLINE = 'outline',
  GHOST = 'ghost',
}

export enum ButtonSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.MEDIUM,
  loading = false,
  disabled = false,
  fullWidth = false,
  iconLeft,
  iconRight,
  className,
  onClick,
  ...rest
}) => {
  const isDisabled = disabled || loading

  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    loading ? styles.loading : '',
    isDisabled ? styles.disabled : '',
    fullWidth ? styles.fullWidth : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={isDisabled}
      onClick={onClick}
      {...rest}
    >
      {loading ? (
        <span className={styles.loader}></span>
      ) : (
        <>
          {iconLeft && <span className={styles.iconWrapper}>{iconLeft}</span>}
          {children && <span className={styles.content}>{children}</span>}
          {iconRight && <span className={styles.iconWrapper}>{iconRight}</span>}
        </>
      )}
    </button>
  )
}
