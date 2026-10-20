const MAX_TRIES = 20;

export async function searchBooks(query, setTriesFunc, currentFetchRef) {
    if (!query) {
        return {totalItems: 0};
    }
    const url = new URL('https://www.googleapis.com/books/v1/volumes');
    url.searchParams.set('q', query);
    url.searchParams.set('key', import.meta.env.VITE_GOOGLE_BOOKS_API_KEY);
    url.searchParams.set('maxResults', 12);

    let tries = MAX_TRIES;
    let id = currentFetchRef.current;

    let response;
    do {
        response = await fetch(url);
        setTriesFunc(MAX_TRIES - tries + 1);
        tries--;
    } while (!response.ok && tries > 0 && currentFetchRef.current === id)
    if (currentFetchRef.current !== id) {
        return false;
    }
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Fetch request to https://www.googleapis.com/books/v1/volumes failed');
    }
}

export async function searchBook(bookId, setTriesFunc) {
    const url = new URL("https://www.googleapis.com/books/v1/volumes/" + bookId);
    url.searchParams.set('key', import.meta.env.VITE_GOOGLE_BOOKS_API_KEY);

    let tries = MAX_TRIES;

    let response;
    do {
        response = await fetch(url);
        setTriesFunc(MAX_TRIES - tries + 1);
        tries--;
    } while (response.status !== 200 && tries > 0)
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Fetch request to https://www.googleapis.com/books/v1/volumes failed');
    }
}
