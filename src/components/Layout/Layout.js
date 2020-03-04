import React from 'react'
import styles from './Layout.css'

export default function Layout(props) {
    return (
        <div className={styles.Layout}>asdf
            {props.children}
        </div>
    )
}
