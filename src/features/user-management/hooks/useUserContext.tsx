import { use } from 'react';
import { UserContext } from '../UserProvider';
import { Role, State, Status, User } from '../types';


export const useUserContext = () => {

	const { state, dispatch } = use(UserContext);


	// Handle Page Change
	const setPage = (page: number) => dispatch({ type: "SET_PAGE", payload: page });
	const setLimit = (limit: number) => dispatch({ type: "SET_LIMIT", payload: limit });
	const setSort = (sortBy: keyof User, sortDirection: "asc" | "desc") =>
	  dispatch({ type: "SET_SORT", payload: { sortBy, sortDirection } });
	const setFilter = (role?: Role, status?: Status) =>
	  dispatch({ type: "SET_FILTER", payload: { role, status } });
	const setQuery = (query: string) => dispatch({ type: "SET_QUERY", payload: query });
	const resetFilter = () => dispatch({ type: "RESET"});


	return {
		state, setPage, setLimit, setSort, setFilter, setQuery, resetFilter
	};
};