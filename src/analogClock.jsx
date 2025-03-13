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
      setClock(prev => {
        return {
          ...prev,
          hour: hour % 12,
          minute: minute % 60,
          second: second % 60,
          secondHand: second * 6,
          minuteHand: minute * 6,
          hourHand: (hour * 30) + (minute / 2)
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
            transform: `rotate(${30 * number}deg)`,
            fontSize: `${number % 3 == 0 ? '32px' : '24px'}`,
          }
        }
      >
        <span
          style={
            {
              transform: `rotate(${-30 * number}deg)`,
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
  let height = '100px'
  let backgroundColor = '#333'
  let width = '8px'
  if (type === 'hour') {
    height = '100px'
    backgroundColor = '#333'
  }
  if (type ==='minute') {
    height = '200px'
    backgroundColor = '#666',
    width = '4px'
  }
  if (type ==='second') {
    height = '240px'
    backgroundColor = '#aa2b2b'
    width = '2px'
  }
  return <div className="hand">
    <span className='hand-item' style={
      {
        transform: `rotate(${deg}deg)`,
        height: height,
        width: width,
        backgroundColor: backgroundColor,
      }
    }></span>
  </div>
}