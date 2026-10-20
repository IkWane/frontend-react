import styles from './BookCard.module.css'

function BookCard({book}) {
    const bookCover = book.volumeInfo.imageLinks?.thumbnail ?? null;
    const title = book.volumeInfo.title;
    const authors = book.volumeInfo.authors ?? [];
    const date = book.volumeInfo.publishedDate;
    return ( 
        <a className={styles.bookCard} href={"book/" + book.id}>
            <img className={styles.bookCover} src={bookCover} alt={title} />
            <div className={styles.bookContent}>
            <h3 className={styles.bookTitle}>{title}</h3>
            {authors ? 
                <p className={styles.bookMeta}>
                    <span className={styles.bookAuthor}>{authors.join(', ')}</span>
                    <time dateTime={date}>{date}</time>
                </p> : 
                <></>}
            </div>
        </a>
    );
}

export default BookCard;