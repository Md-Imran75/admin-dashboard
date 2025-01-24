import { use } from 'react';
import { Bike, State, Status, Verified, } from '../types';
import { BikeContext } from '../BikeProvider';


export const useBikeContext = () => {

    const { state, dispatch } = use(BikeContext);


    // Handle Page Change
    const setPage = (page: number) => dispatch({ type: "SET_PAGE", payload: page });
    const setLimit = (limit: number) => dispatch({ type: "SET_LIMIT", payload: limit });
    const setSort = (sortBy: keyof Bike, sortDirection: "asc" | "desc") =>
      dispatch({ type: "SET_SORT", payload: { sortBy, sortDirection } });
    const setFilter = (verified?: Verified, status?: Status) =>
      dispatch({ type: "SET_FILTER", payload: { verified, status } });
    const setQuery = (query: string) => dispatch({ type: "SET_QUERY", payload: query });
    const resetFilter = () => dispatch({ type: "RESET"});

    return {
        state, setPage, setLimit, setSort, setFilter, setQuery, resetFilter
    };
};