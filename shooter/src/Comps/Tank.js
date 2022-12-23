import styles from './extra/design.module.css'
import image from './extra/tank.png'
import { useEffect, useRef, useState } from 'react'
import { Bullet } from './Bullet'

export const Tank = () => {
  const [dir, setDir] = useState('none')
  const [look, setLook] = useState('none')
  const [position, setPosition] = useState({ x: 1, y: 0 })
  const [bullets, setBullets] = useState([
    { posX: 3, posY: 4, direction: 'up', velocity: 10 },
  ])
  const gunPoint = useRef()
  const tankref = useRef()
  const vel = 1
  useEffect(() => {
    const downHandle = (e) => {
      switch (e.key) {
        case 'w':
          if (dir === 'up') break
          setDir('up')
          console.log('w')
          setLook('up')
          break
        case 'a':
          if (dir === 'left') break
          setLook('left')
          console.log('a')
          setDir('left')
          break
        case 's':
          if (dir === 'down') break
          setLook('down')
          console.log('s')
          setDir('down')
          break
        case 'd':
          if (dir === 'right') break
          setLook('right')
          console.log('d')
          setDir('right')
          break
        default:
          break
      }
    }

    document.addEventListener('keydown', downHandle)

    const upHandle = (e) => {
      switch (e.key) {
        case 'w':
          if (dir === 'up') {
            setDir('none')
          }

          break
        case 'a':
          if (dir === 'left') {
            setDir('none')
          }
          break
        case 's':
          if (dir === 'down') {
            setDir('none')
          }
          break
        case 'd':
          if (dir === 'right') {
            setDir('none')
          }
          break
        default:
          break
      }
    }

    document.addEventListener('keyup', upHandle)

    const ints = setInterval(() => {
      var placehldr = { ...position }
      switch (dir) {
        case 'up':
          placehldr.y -= vel
          break
        case 'down':
          placehldr.y += vel
          break
        case 'right':
          placehldr.x += vel
          break
        case 'left':
          placehldr.x -= vel
          break
        default:
          break
      }
      setPosition(placehldr)
    }, 50)

    return () => {
      clearInterval(ints)
      document.removeEventListener('keyup', upHandle)
      document.removeEventListener('keydown', downHandle)
    }
  }, [position])

  return (
    <>
      <div
        className={[styles.tankOuter, styles[look]].join(' ')}
        style={{ top: position.y * 5, left: position.x * 5 }}
      >
        <div className={styles.pointer} ref={gunPoint}></div>
        <img src={image} ref={tankref} className={styles.tank} />
      </div>
      {bullets.map((el,ind) => (
        <Bullet key={`x${el.posX}id${ind}`} posX={el.posX} posY={el.posY} direction={look} />
      ))}
    </>
  )
}
