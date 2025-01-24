import { Select } from '@/components/custom/select';
import type { Verified,  State, Status, Bike } from '../types';
import { useBikeContext } from '../hooks/useBikeContext';

export const BikeFilter = () => {
	
	const {state, setSort, setFilter,  } = useBikeContext();

	return (
		<div className='flex gap-2'>
			<Select
				label='Verified'
				options={[
					{ text: 'All', value: '' },
					{ text: 'Self', value: 'self' },
					{ text: 'Online', value: 'online' },
					{ text: 'Offline', value: 'offline' },

				]}
				value={state.verified ?? ''}
				key={state.verified ?? 'default_role'}
				onChange={(value) => setFilter(value as Verified, state.status)}
			/>
			<Select
				label='status'
				options={[
					{ text: 'All', value: '' },
					{ text: 'Active', value: 'active' },
					{ text: 'Rejected', value: 'rejected' },
					{ text: 'Pending', value: 'pending' },
				]}
				value={state.status ?? ''}
				key={state.status ?? 'default_status'}
				onChange={(value) => setFilter(state.verified, value as Status)}
			/>
			<Select
				label='Sort By'
				options={[
					{ text: 'Id', value: '_id' },
					{ text: 'Model', value: 'bikeModel' },
					{ text: 'Brand', value: 'brand' },
					{ text: 'Verified', value: 'verified' },
					{ text: 'Status', value: 'status' },
				]}
				value={state.sortBy ?? ''}
				key={state.sortBy ?? 'default_column'}
				onChange={(value) => setSort(value as keyof Bike, state.sortDirection)}
			/>

			<Select
				label='Order By'
				options={[
					{ text: 'Ascending', value: 'asc' },
					{ text: 'Descending', value: 'desc' },
				]}
				value={state.sortDirection}
				key={state.sortDirection?? 'default_direction'}
				onChange={(value) => setSort(state.sortBy , value as "asc" | "desc")}
			/>
		</div>
	);
};