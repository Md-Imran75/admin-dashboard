import { Button } from '@/components/custom/button';

export const PageHeader = () => {
	return (
		<div className='flex items-center justify-between'>
			<h1 className='text-2xl font-bold'>User Management</h1>
			<Button>Add User</Button>
		</div>
	);
};

PageHeader.displayName = 'PageHeader';