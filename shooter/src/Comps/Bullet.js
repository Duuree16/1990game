import styles from './extra/design.module.css'

export const Bullet = ({posX, posY, direction}) => {
  return (
    <div
      className={[styles.bullet]}
      style={{ top: posY + 'px', left:posX + 'px' }}
    ></div>
  )
}
