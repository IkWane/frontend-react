import { useEffect, useRef, useState } from 'react'
import bookCover from '../../assets/moby-dick.png'
import BookCard from '../../components/BookCard/BookCard'
import styles from './Home.module.css'
import { searchBooks } from '../../api/books';

export default function Home() {
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('')
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tries, setTries] = useState(0);
    const [error, setError] = useState('');
    const currentFetchRef = useRef(0);
    const searchRef = useRef(null);
    
    function handleSubmit(e) {
        e.preventDefault();
        setQuery(search.length > 0 ? search : '');
    }

    function handleClear(e) {
        setSearch('');
        searchRef.current.value = '';
        searchRef.current.focus();
    }

    useEffect(() => {
        async function handleQuery() {
            setBooks([])
            setLoading(true);
            currentFetchRef.current++;
            const result = await searchBooks(query, setTries, currentFetchRef);
            if (result) {
                setLoading(false);
                if (result.totalItems > 0) {
                    setBooks(result.items);
                } else {
                    setError('No results found for query.');
                }
            }
        }
        handleQuery();
    }, [query])
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Bibliothèque</h1>
      <p className={styles.description}>
        Bienvenue dans notre bibliothèque. Découvrez notre{' '}
        <strong>sélection de romans d’aventure</strong> et consultez la fiche
        d’un livre pour en savoir plus. Cette sélection vous invite à explorer
        des récits d’aventure et des univers imaginaires.{' '}
        <em>Quel sera votre prochain voyage ?</em>
      </p>

      <form action="index.html" method="get" onSubmit={handleSubmit}>
        <div className={styles.searchField}>
          <input
            type="search"
            name="q"
            id="book-name"
            aria-label="Rechercher un livre"
            placeholder="Rechercher un titre, un auteur..."
            onChange={(e) => setSearch(e.target.value)} 
            ref={searchRef}
          />
          <button type='button' aria-label='Effacer' onClick={handleClear}>X</button>
          <button type="submit" aria-label="Rechercher">
            <span className="material-symbols-outlined" aria-hidden="true">
              search
            </span>
          </button>
        </div>
        <span>{query}</span>
      </form>

      <section className={styles.catalogue}>
        <h2>Les livres de la bibliothèque</h2>

        <ul className={styles.bookList}>
            {loading ? 
                <span>Loading... ({tries} tries)</span> : 
                books.map(book => 
                    <li key={book.id}>
                        <BookCard book={book}/>
                    </li>
                )}
        </ul>
      </section>
    </main>
  )
}
