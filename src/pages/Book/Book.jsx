import { useContext, useEffect, useState } from 'react';
import { searchBook } from '../../api/books';
import styles from './Book.module.css'
import { useParams } from 'react-router'
import { useFavoriteContext } from '../../contexts/FavoriteContext';

export default function Book() {
    const id = useParams().id;
    const [loading, setLoading] = useState(false);
    const [tries, setTries] = useState(0);
    const [error, setError] = useState('');
    const [book, setBook] = useState(null);
    const { addFavorite } = useFavoriteContext();

    useEffect(() => {
        async function handle() {
            const result = await searchBook(id, setTries);
            setLoading(true);
            if (result) {
                setBook(result.volumeInfo);
                setLoading(false);
            }
        }
        handle();
    });


    return (
        <main className={styles.page}>
        {loading || !book ? 
        <span>Loading...({tries} tries)</span> :
        <div>
            <article className={styles.bookDetail}>
                <div className={styles.bookSidebar}>
                <img
                    className={styles.detailCover}
                    src={book.imageLinks?.thumbnail ?? null}
                    alt={"Couverture de " + book.title}
                    width="667"
                    height="1000"
                />
                <div className={styles.bookActions}>
                    <button
                    className={[styles.bookAction, styles.primary].join(' ')}
                    type="button"
                    command="show-modal"
                    commandFor="command-dialog"
                    >
                    <span className="material-symbols-outlined" aria-hidden="true">
                        add_circle
                    </span>
                    Commander le livre
                    </button>
                    <button onClick={() => addFavorite(book)}>

                    </button>
                </div>
                </div>

                <div className={styles.bookInformation}>
                <nav className={styles.breadcrumb} aria-label="Fil d’Ariane">
                    <ol>
                    <li><a href="index.html">Bibliothèque</a></li>
                    <li aria-current="page">{book.title}</li>
                    </ol>
                </nav>

                <h1>{book.title}</h1>
                <p className={styles.detailAuthor}>{book.authors?.join(', ') ?? Inconnue}</p>

                <dl className={styles.detailMetadata}>
                    <div>
                    <dt>
                        <span className="material-symbols-outlined" aria-hidden="true">
                        calendar_today
                    </span><span className={styles.visuallyHidden}>Première publication</span>
                    </dt>
                    <dd><time dateTime={book.publishedDate}>{book.publishedDate}</time></dd>
                    </div>
                    <div>
                    <dt>
                        <span className="material-symbols-outlined" aria-hidden="true">
                        translate
                    </span><span className={styles.visuallyHidden}>Langue originale</span>
                    </dt>
                    <dd>{book.language.toUpperCase()}</dd>
                    </div>
                </dl>

                <section className={styles.bookSummary} id="resume">
                    <h2 className={styles.visuallyHidden}>Présentation du roman</h2>
                    <div dangerouslySetInnerHTML={{__html: book.description ?? 'résumé indisponible'}} />
                </section>
            </div>
        </article>

        <dialog
            className={styles.orderDialog}
            id="command-dialog"
            aria-labelledby="dialog-title"
        >
            <h2 id="dialog-title">Commande enregistrée</h2>
            <p>Merci pour votre intérêt pour Moby-Dick.</p>
            <form method="dialog">
            <button className={[styles.bookAction, styles.primary].join(' ')} type="submit">Fermer</button>
            </form>
        </dialog>
        </div>}
        </main>
    )
}
