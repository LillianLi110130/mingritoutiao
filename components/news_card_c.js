import React from 'react'
import styles from './news_card.module.css'

export default function NewsCardC(props) {
  const img_element = props.img.map((v, index) =>
    <img src={v.url} alt='img' key={index} />)
  
  return (
    <div className={styles.newsContainerA}>
      <div className={styles.newsTitle}>
        {props.title}
      </div>
      <div className={styles.newsImgContainer}>
        {img_element}
      </div>
      <div className={styles.newsBottom}>
        <span>{props.source}</span>
        <span>{props.datetime}</span>
      </div>
    </div>
  )
}
