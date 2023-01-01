import styles from './extra/design.module.css'
import image from './extra/tank.png'
import { useEffect, useRef, useState } from 'react'
import { Bullet } from './Bullet'
import { Brick } from './Brick'

export const Tank = () => {
  const [dir, setDir] = useState('none')
  const [look, setLook] = useState('right')
  const [position, setPosition] = useState({ x: 1, y: 0 })
  const [bullets, setBullets] = useState([])
  const gunPoint = useRef()
  const tankref = useRef()
  const vel = 5
  const bullSpeed = 10
  const [shootable, setShootable] = useState(true)
  const [bricks, setBricks] = useState([
    {
      x: 3,
      y: 3,
      heart: 2,
    },
    {
      x: 6,
      y: 3,
      heart: 2,
    },
    {
      x: 2,
      y: 5,
      heart: 2,
    },
    {
      x: 3,
      y: 6,
      heart: 2,
    },
    {
      x: 4,
      y: 7,
      heart: 2,
    },
    {
      x: 5,
      y: 7,
      heart: 2,
    },
    {
      x: 6,
      y: 6,
      heart: 2,
    },
    {
      x: 7,
      y: 5,
      heart: 2,
    },
  ])
  const Shoot = () => {
    if (shootable) {
      setShootable(false)
      let x, y
      switch (look) {
        case 'left':
          x = position.x - 3
          y = position.y + 23
          break
        case 'right':
          x = position.x + 50
          y = position.y + 23
          break
        case 'down':
          x = position.x + 23
          y = position.y + 50
          break
        case 'up':
          x = position.x + 23
          y = position.y + 1.5
          break
        default:
          break
      }
      setBullets([
        ...bullets,
        { posX: x, posY: y, direction: look, range: 0, limit: 400 },
      ])
      setTimeout(() => {
        setShootable(true)
      }, 200)
    }
  }
  useEffect(() => {
    const downHandle = (e) => {
      switch (e.key) {
        case 'w':
          if (dir === 'up') break
          setDir('up')
          setLook('up')
          break
        case 'a':
          if (dir === 'left') break
          setLook('left')
          setDir('left')
          break
        case 's':
          if (dir === 'down') break
          setLook('down')
          setDir('down')
          break
        case 'd':
          if (dir === 'right') break
          setLook('right')
          setDir('right')
          break
        default:
          break
      }
    }
    const downHandle2 = (e) => {
      switch (e.key) {
        case ' ':
          Shoot()
          break
        default:
          break
      }
    }

    document.addEventListener('keydown', downHandle)
    document.addEventListener('keydown', downHandle2)

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
          if (placehldr.y >= 1) {
            placehldr.y -= vel
          }
          break
        case 'down':
          if (placehldr.y <= 449) {
            placehldr.y += vel
          }
          break
        case 'right':
          if (placehldr.x <= 447) {
            placehldr.x += vel
          }
          break
        case 'left':
          if (placehldr.x >= 1) {
            placehldr.x -= vel
          }
          break
        default:
          break
      }
      setPosition(placehldr)
    }, 50)

    var copiedBullets = [...bullets]
    copiedBullets.forEach((self, index) => {
      if (copiedBullets[index].range >= self.limit) {
        copiedBullets.splice(index, 1)
        return
      }
      switch (self.direction) {
        case 'up':
          copiedBullets[index].posY -= bullSpeed
          copiedBullets[index].range += 1
          break
        case 'down':
          copiedBullets[index].posY += bullSpeed
          copiedBullets[index].range += 1
          break
        case 'left':
          copiedBullets[index].posX -= bullSpeed
          copiedBullets[index].range += 1
          break
        case 'right':
          copiedBullets[index].posX += bullSpeed
          copiedBullets[index].range += 1
          break
        default:
          break
      }
    })
    setBullets(copiedBullets)

    bricks.forEach((rect1, index) => {
      bullets.forEach((rect2, index2) => {
        if (
          rect1.x * 50 < rect2.posX + 3 &&
          rect1.x * 50 + 50 > rect2.posX &&
          rect1.y * 50 < rect2.posY + 3 &&
          50 + rect1.y * 50 > rect2.posY
        ) {
          let bricks2 = bricks
          let bullets2 = bullets
          bricks2[index].heart -= 1
          if(bricks2[index].heart === 0){
            bricks2.splice(index, 1)
          }
          bullets2.splice(index2, 1)
          console.log('hi')
          setBullets(bullets2)
          setBricks(bricks2)
        }
      })
    })

    return () => {
      clearInterval(ints)
      document.removeEventListener('keyup', upHandle)
      document.removeEventListener('keydown', downHandle)
      document.removeEventListener('keydown', downHandle2)
    }
  }, [position])

  return (
    <>
      <div
        className={[styles.tankOuter, styles[look]].join(' ')}
        style={{ top: position.y, left: position.x }}
      >
        <div className={styles.pointer} ref={gunPoint}></div>
        <img src={image} ref={tankref} className={styles.tank} />
      </div>
      {bullets.map((el, ind) => (
        <Bullet
          key={`x${el.posX}id${ind}`}
          posX={el.posX}
          posY={el.posY}
          direction={look}
        />
      ))}
      {bricks.map(
        (el, ind) => el.heart > 0 && <Brick x={el.x * 50} y={el.y * 50} />,
      )}
    </>
  )
}
