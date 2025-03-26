import React from 'react'
import { listData } from './data'
import styles from './styles.module.scss';

/**
 * 专栏
 * @returns 
 */
export default function ProjectSolution() {
  return (
    <div className={styles.ProjectSolutionContent}>
      {listData.map((item, index) => (
        <div key={item.url} className={styles.item}>
          <div className={styles.title}>
            <a href={item.url}>{item.title}</a>
          </div>
          <div className={styles.bottom}>
            <span className={styles.time}>{item.createDate}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
