import React from 'react';


const Filter = ({ genres, filter, setFilter }) => {
    if (genres.loading) {
        return <div>Loading...</div>;
    }
    if (genres.error) {
        console.log(genres.error);
    }

    const handleFilter = (e) => setFilter(e.target.value);
    
    return (
        <div>
            {
                genres.data.allGenres.map(genre => <button key={genre} onClick={handleFilter} value={genre}>{genre}</button>)
            }
            <button onClick={() => setFilter('')}>All Genres</button>
        </div>
    )
}

export default Filter