import React from 'react'
import styles from './news_card.module.css'

//只有文字的
export default function NewsCardA(props) {
  return (
      <div className={styles.newsContainerA}>
        <div className={styles.newsTitle}>
          {props.title}
        </div>
        <div className={styles.newsBottom}>
          <span>{props.source}</span>
          <span>{props.datetime}</span>
        </div>
      </div>
  )
}
