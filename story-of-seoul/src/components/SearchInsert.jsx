import React from 'react';

const SearchInsert = () => {
    return (
        <form className="SearchInsert">
            <input type="text" placeholder='검색어를 입력하세요' />
            <button type='submit'>검색</button>
        </form>
    );
};

export default SearchInsert;