import React from 'react'

const analogClock = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  return (
    <div className='clock'>
      <div className="clock__wrapper">
        <div className="dot-center"></div>
        <div className="hand"></div>
        <div className="hand"></div>
        <div className="hand"></div>
      </div>
    </div>
  )
}

export default analogClock