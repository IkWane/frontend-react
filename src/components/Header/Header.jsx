import styles from './Header.module.css'
import { Link } from 'react-router'

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <li><Link to="/">Bibliothèque</Link></li>
          <li><Link to="/">Contact</Link></li>
        </ul>
      </nav>
    </header>
  )
}
