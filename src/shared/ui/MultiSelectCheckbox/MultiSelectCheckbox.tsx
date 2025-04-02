import React, { useState, useEffect, useRef } from 'react'
import styles from './MultiSelectCheckbox.module.scss'
import { SelectOption } from '@/shared/types/common'

interface MultiSelectCheckboxProps {
  options: SelectOption[]
  value: (string | number)[]
  onChange: (selected: (string | number)[]) => void
  label?: string
  placeholder?: string
  searchPlaceholder?: string
  className?: string
  id?: string
}

const MultiSelectCheckbox: React.FC<MultiSelectCheckboxProps> = ({
  options,
  value = [],
  onChange,
  label,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  className,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const internalId = id || `multiselect-${React.useId()}`

  const handleToggle = () => setIsOpen(!isOpen)

  const handleCheckboxChange = (optionValue: string | number) => {
    const newSelectedValues = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue]
    onChange(newSelectedValues)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getTriggerText = () => {
    if (value.length === 0) {
      return placeholder
    }
    if (value.length === 1) {
      const selectedOption = options.find((opt) => opt.value === value[0])
      return selectedOption ? selectedOption.label : placeholder
    }
    return `${value.length} selected`
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      className={`${styles.container} ${className || ''}`}
      ref={containerRef}
    >
      {label && (
        <label htmlFor={internalId} className={styles.label}>
          {label}
        </label>
      )}
      <button
        type="button"
        id={internalId}
        className={`${styles.trigger} ${isOpen ? styles.open : ''}`}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {getTriggerText()}
        <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="listbox">
          <input
            type="text"
            className={styles.search}
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={handleSearchChange}
            aria-label="Filter options"
          />
          <ul className={styles.optionsList}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li key={option.value} className={styles.optionItem}>
                  <label className={styles.optionLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={value.includes(option.value)}
                      onChange={() => handleCheckboxChange(option.value)}
                      aria-labelledby={`${internalId}-option-${option.value}`}
                    />
                    <span id={`${internalId}-option-${option.value}`}>
                      {option.label}
                    </span>
                  </label>
                </li>
              ))
            ) : (
              <li className={styles.noOptions}>No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default MultiSelectCheckbox
