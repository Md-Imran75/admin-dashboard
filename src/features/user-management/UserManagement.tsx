import { Pagination } from '@/components/custom/pagination';
import { PageHeader } from './components/PageHeader.tsx';
import { ResetButton } from './components/ResetButton.tsx';
import { UserFilter } from './components/UserFilter.tsx';
import { UserSearch } from './components/UserSearch.tsx';
import { UserTable } from './components/UserTable.tsx';
import { UserProvider } from './UserProvider';
import { useUserContext } from './hooks/useUserContext.tsx';

import { UserAPI } from '@/apis/userApi.ts';



export const UserManagement = () => {
	return (
		
		<UserProvider>
			<UserManagementContent />
		</UserProvider>
	
	);
};

UserManagement.displayName = 'UserManagement';

const UserManagementContent = () => {
	
	const {state, setPage, setLimit} = useUserContext();
	const {data, error, isLoading} : any = UserAPI.useUsers(state);
    
	return (
		<div className='mb-40'>
			<PageHeader />
			<div className='mt-6' />
			<div className='space-y-6'>
				<div className='space-y-2'>
					<UserFilter />
					<div className='flex gap-2 items-center'>
						<div className='flex-1'>
							<UserSearch />
						</div>
						<div>
							<ResetButton />
						</div>
					</div>
				</div>
				<UserTable
					users={data?.data}
					isLoading={isLoading}
					error={ error?.message ? error.message : ""}
				/>
				<Pagination
					key={`${data?.metaData.currentPage}-${data?.metaData.limit}`}
					totalPages={data?.metaData.totalPages}
					currentPage={data?.metaData.currentPage}
					onPageChange={setPage}
					onPageSizeChange={setLimit}
					pageSize={data?.metaData.limit}
					disabled={isLoading}
				/>
			</div>
		</div>
	);
};

UserManagementContent.displayName = 'UserManagementContent';