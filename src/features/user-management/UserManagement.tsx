import { Pagination } from '@/components/custom/pagination';
import { PageHeader } from './components/PageHeader.tsx';
import { ResetButton } from './components/ResetButton.tsx';
import { UserFilter } from './components/UserFilter.tsx';
import { UserSearch } from './components/UserSearch.tsx';
import { UserTable } from './components/UserTable.tsx';
import { UserProvider } from './UserProvider';
import { useFetchUsers } from './hooks/useFetchUsers';
import { useUserContext } from './hooks/useUserContest.tsx';

export const UserManagement = () => {
	return (
		<UserProvider>
			<UserManagementContent />
		</UserProvider>
	);
};

UserManagement.displayName = 'UserManagement';

const UserManagementContent = () => {
	const { isLoading, error } = useFetchUsers();
	const { pagination, updatePage, updatePageSize, users } = useUserContext();

	return (
		<div className='md:mx-0 mx-3 mt-5 mb-20'>
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
					users={users}
					isLoading={isLoading}
					error={error?.message ? '' : undefined}
				/>
				<Pagination
					key={`${pagination.page}-${pagination.pageSize}`}
					totalPages={pagination.totalPage}
					currentPage={pagination.page}
					onPageChange={updatePage}
					onPageSizeChange={updatePageSize}
					pageSize={pagination.pageSize}
					disabled={isLoading}
				/>
			</div>
		</div>
	);
};

UserManagementContent.displayName = 'UserManagementContent';