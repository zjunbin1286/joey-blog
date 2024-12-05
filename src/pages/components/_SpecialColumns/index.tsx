import React from 'react'
import { listData } from './data'
import styles from './styles.module.scss';

/**
 * 专栏
 * @returns 
 */
export default function SpecialColumns() {
  return (
    <div className='collection-content'>
      {listData.map((item, index) => (
        <div key={item.url} className={styles.collectionItem}>
          <div className={styles.coverImg}>
            <img src={item.coverPath} />
          </div>
          <div className={styles.rightText}>
            <a href={item.url}>{item.title}</a>
            <p>{item.description}</p>
            <p>{item.createDate}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
