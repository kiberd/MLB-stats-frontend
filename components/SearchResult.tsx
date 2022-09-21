import React from 'react';
import SearchQuery from './SearchQuery';
import SearchResultCard from './SearchResultCard';

interface SearchResultProps{
    query: string,
    data: any
}

const SearchResult: React.FC<SearchResultProps> = ({ query, data }) => {


    return (
        <div className="container min-h-full p-10 mx-auto bg-transparent">

            
            <div className="my-4">
                <SearchQuery prefix="Results for " query={query} count={data?.total.value}/>
            </div>
            
            {
                data && data.hits.map((player: any, index: any) => (
                    <SearchResultCard player={player}  key={`${player._source.player.playerid}`} />
                ))
            }
        </div>
    );
};

export default SearchResult;