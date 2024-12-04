import React from 'react'
import { listData } from './data'
/**
 * 我的作品集
 * @returns 
 */
export default function Collection() {

  return (
    <div className='collection-content'>
      {listData.map((item, index) => (
        <div key={item.url} className={`p-5 rounded-md  hover:bg-[#f6f7f9]`}>
          <div className='item text-[24px] font-bold'>
            <a href={item.url} target='_blank'>{item.title}</a>
          </div>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  )
}
