import { useQuery, useMutation } from '@apollo/client';
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from '../queries/queries';
import { randomID } from '../utils/utils';

export const AddBook = () => {
    const { data } = useQuery(GET_AUTHORS);
    const [addBook, { loading, error }] = useMutation(ADD_BOOK, {
        refetchQueries: [GET_BOOKS], //* This help React update UI every time we make a mutation request
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const name = form.get('name');
        const genre = form.get('genre');
        const author = form.get('author');
        addBook({ variables: { name, genre, authorID: author, id: randomID() } });
    };

    if (loading) return <h1>Submitting...</h1>;
    if (error) return <h1>{`Submission error! ${error.message}`}</h1>;

    return (
        <>
            <form id='add-book' onSubmit={handleSubmit}>
                <div className='field'>
                    <label>Book name:</label>
                    <input type='text' name='name' />
                </div>
                <div className='field'>
                    <label>Genre:</label>
                    <input type='text' name='genre' />
                </div>
                <div className='field'>
                    <label>Author:</label>
                    <select name='author' title='select author'>
                        <option>Select author</option>
                        {data &&
                            data.authors.map((item) => {
                                return (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <button>+</button>
            </form>
        </>
    );
};
