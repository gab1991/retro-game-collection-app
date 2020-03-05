import React from 'react'
import styles from './Navigation.css'

export default function Navigation(props) {
    return (
        <div className={styles.Navigation}>
            <nav>
                <ul>
                    <li>MENU</li>
                    <li>PROFILE</li>
                </ul>
            </nav>
        </div>
    )
}
