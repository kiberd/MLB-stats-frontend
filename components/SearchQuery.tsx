import React from 'react';

interface SearchQueryProps{
    prefix: string,
    query: string,
    count: number | undefined
}

const SearchQuery: React.FC<SearchQueryProps> = ({ prefix, query, count }) => {
    return (
        <div>
            <span className="text-gray-500">{prefix}</span>
            <span className="mr-2 font-bold text-gray-600">{query}</span>
            { count &&  <span className="text-gray-400">({count} 건)</span>}
        </div>
    );
};

export default SearchQuery;