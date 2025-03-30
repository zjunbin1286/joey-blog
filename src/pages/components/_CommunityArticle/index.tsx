import React from 'react'
import { listData } from './data'
import styles from './styles.module.scss';

/**
 * 社区转发
 * @returns 
 */
export default function CommunityArticle() {
  return (
    <div className={styles.CommunityArticleContent}>
      {listData.map((item, index) => (
        <div key={item.url} className={styles.item}>
          <div className={styles.title}>
            <a href={item.url}>{item.title}</a>
          </div>
          <div className={styles.bottom}>
            <span className={styles.time}>时间：{item.createDate}</span>
            <span className={styles.from}>来源：{item.from}</span>
          </div>
        </div>
      ))}
    </div>
  )
}