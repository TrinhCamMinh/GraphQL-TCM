import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../queries/queries';

export const BookList = () => {
    const { loading, error, data } = useQuery(GET_BOOKS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{`Error! ${error.message}`}</p>;

    return (
        <>
            <ul id='book-list'>
                {data.books.map((item) => {
                    return (
                        <li key={item.name}>
                            {item.name} - {item.author.name} - {item.id} - {item.genre}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
