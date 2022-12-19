import styles from './extra/design.module.css'
import image from './extra/tank.png'
import { useEffect, useRef, useState } from 'react'

export const Tank = () => {
  const [dir, setDir] = useState('none')
  const [position, setPosition] = useState({ x: 1, y: 0 })
  const tankref = useRef()
  const vel = 1
  useEffect(() => {
    const evl = document.addEventListener(
      'keydown',
      (e) => {
        switch (e.key) {
          case 'w':
            setDir('up')
            break
          case 'a':
            setDir('left')
            break
          case 's':
            setDir('down')
            break
          case 'd':
            setDir('right')
            break
          default:
            break
        }
      },
      true,
    )

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
    }, 100)
    return () => {
      clearInterval(ints)
    }
  }, [position])
  return (
    <div
      className={styles.tankOuter}
      style={{ top: position.y * 5, left: position.x * 5 }}
    >
      <img
        src={image}
        ref={tankref}
        className={`${styles.tank} ${styles[dir]}`}
      />
    </div>
  )
}
