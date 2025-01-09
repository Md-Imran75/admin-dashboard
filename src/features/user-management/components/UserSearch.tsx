import { Search } from '@/components/custom/search';
import { useUserContext } from '../hooks/useUserContext';
import { ChangeEvent, useEffect, useState, useTransition } from 'react';
import { debounce } from '@/utils/debounce';

const debouncedQuery = debounce(
	(query: string, setQuery: (q: string) => void) => {
		setQuery(query);
	},
	500
);

export const UserSearch = () => {

	const {state,setQuery} = useUserContext();

	const [query, setQuerys] = useState(state.query || '');

	const [, startTransition] = useTransition();

	useEffect(() => {
		setQuerys(state.query || '');
	}, [state.query]);

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setQuery(value);
		startTransition(() => {
			debouncedQuery(value, setQuery);
		});
	};

	return (
		<div>
			<Search
				placeholder='Search users'
				value={query}
				onChange={handleSearch}
			/>
		</div>
	);
};