import styles from './extra/design.module.css'

export const Brick = (props) => {
    return (
        <div className={styles.brick}
             style={{top:props.y,left:props.x}}>

        </div>
        )
    }   