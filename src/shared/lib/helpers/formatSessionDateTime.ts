export const formatSessionDateTime = (isoDateString: string): string => {
  try {
    const date = new Date(isoDateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    })
  } catch (e) {
    console.error('Error formatting date:', isoDateString, e)
    return isoDateString
  }
}
