import React, { useState, useEffect } from 'react'
import './analogClock.css'

export const AnalogClock = () => {
  const [clock, setClock] = useState(
    {
      hour: 0,
      minute: 0,
      second: 0,
      secondHand: 0,
      minuteHand: 0,
      hourHand: 0,
    }
  )

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date()
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()
      console.log(hour, minute, second);
      setClock(prev => {
        return {
          ...prev,
          hour: hour,
          minute: minute,
          second: second,
          secondHand: second * 6,
          minuteHand: minute * 6, // mỗi bước nhảy mất 6 deg
          hourHand: (hour * 30) + (minute / 2) // mỗi giờ mất 30deg, 60 phút mất 30deg (1 phút mất 0.5deg)      
        }
      })

    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  console.log('clock', clock)

  return (
    <div className='clock'>
      <div className="clock__wrapper">
        <div className="dot-center"></div>
        <HandItem type={'hour'} deg={clock.hourHand} />
        <HandItem type={'minute'} deg={clock.minuteHand} />
        <HandItem type={'second'} deg={clock.secondHand} />
        <ItemSecond deg={6} numbers={60} />
        <NumberClock />

      </div>
    </div>
  )
}

const NumberClock = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  return <>
    {numbers.map((number, index) => (
      <div key={index} className='number'
        style={
          {
            transform: `rotate(${30 * number}deg)`, // mỗi số cách nhau 30 độ (360/12) => cách số 12 theo 30.n
            fontSize: `${number % 3 == 0 ? '32px' : '24px'}`,
          }
        }
      >
        <span
          style={
            {
              transform: `rotate(${-30 * number}deg)`, // xoay chữ lại theo số độ 30n cho thẳng đứng số
            }
          }
        >{number}</span>
      </div>
    ))}
  </>
}

const ItemSecond = ({ deg, numbers }) => {
  return (
    <>
      {
        [...Array(numbers)].map((item, index) => {
          const style = {
            position: 'absolute',
            textAlign: 'center',
            top: '10px',
            left: '10px',
            right: '10px',
            bottom: '10px',
            transform: `rotate(${deg * index}deg)`, // each mark is 6 deg apart
          }
          return <div key={index} className='item-second' style={style}>
            <span style={
              {
                height: `${index % 5 == 0 ? '16px' : '10px'}`,
                width: `${index % 5 == 0 ? '4px' : '1px'}`,
                backgroundColor: '#333',
                display: 'inline-block'
              }
            }></span>
          </div>
        })
      }
    </>
  )
}

const HandItem = ({ type, deg }) => {
  let backgroundColor = '#666';
  if (type === 'minute') { backgroundColor = '#999'; }
  if (type === 'second') { backgroundColor = 'red'; }
  return <div className="hand">
    <span className={`hand-item ${type}`} style={
      {
        transform: `rotate(${deg}deg)`,
        backgroundColor: backgroundColor,
      }
    }></span>
  </div>
}