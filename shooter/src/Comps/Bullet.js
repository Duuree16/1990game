import styles from './extra/design.module.css'

export const Bullet = (posX, posY, direction, velocity) => {
  return (
    <div
      className={[styles.bullet, styles[direction]].join('')}
      style={{ top: posY * 10 + 'px', left:posX * 10 + 'px' }}
    ></div>
  )
}
