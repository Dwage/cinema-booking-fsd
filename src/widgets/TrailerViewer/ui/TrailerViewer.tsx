import React from 'react'
import styles from './TrailerViewer.module.scss'

interface TrailerViewerProps {
  url: string
  title?: string
}

export const TrailerViewer: React.FC<TrailerViewerProps> = ({
  url,
  title = 'Movie Trailer',
}) => {
  const isEmbedUrl =
    url.includes('youtube.com/embed/') || url.includes('youtu.be/')

  if (!isEmbedUrl) {
    console.warn(
      'TrailerViewer: Provided URL might not be a valid embed URL:',
      url
    )
  }

  return (
    <div className={styles.trailerContainer}>
      <iframe
        className={styles.trailerFrame}
        src={url}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  )
}
