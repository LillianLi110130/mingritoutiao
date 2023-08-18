import React from 'react'
import styles from './news_card.module.css'

//一张小图
export default function NewsCardB(props) {
  return (
    <div className={styles.newsContainerB}>
      <img src={props.img} alt='img'/>
      <div>
        <div className={styles.newTitle}>
          {props.title}
        </div>
        <div className={styles.newsBottom}>
          <span>{props.source}</span>
          <span>{props.datetime}</span>
        </div>
      </div>

    </div>
  )
}
