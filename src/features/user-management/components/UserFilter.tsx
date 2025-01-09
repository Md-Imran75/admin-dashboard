import { Select } from '@/components/custom/select';
import { useUserContext } from '../hooks/useUserContext';
import type { Role,  State, Status, User } from '../types';

export const UserFilter = () => {
	
	const {state, setSort, setFilter,  } = useUserContext();

	return (
		<div className='flex gap-2'>
			<Select
				label='Role'
				options={[
					{ text: 'All', value: '' },
					{ text: 'User', value: 'user' },
					{ text: 'Seller', value: 'seller' },
					{ text: 'Manager', value: 'manager' },
					{ text: 'Technician', value: 'technician' },

				]}
				value={state.role ?? ''}
				key={state.role ?? 'default_role'}
				onChange={(value) => setFilter(value as Role, state.status)}
			/>
			<Select
				label='status'
				options={[
					{ text: 'All', value: '' },
					{ text: 'Active', value: 'active' },
					{ text: 'Rejected', value: 'rejected' },
					{ text: 'Pending', value: 'pending' },
					{ text: 'Blocked', value: 'blocked' },
				]}
				value={state.status ?? ''}
				key={state.status ?? 'default_status'}
				onChange={(value) => setFilter(state.role, value as Status)}
			/>
			<Select
				label='Sort By'
				options={[
					{ text: 'Id', value: 'id' },
					{ text: 'Name', value: 'name' },
					{ text: 'Email', value: 'email' },
					{ text: 'Role', value: 'role' },
					{ text: 'Status', value: 'status' },
				]}
				value={state.sortBy ?? ''}
				key={state.sortBy ?? 'default_column'}
				onChange={(value) => setSort(value as keyof User, state.sortDirection)}
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