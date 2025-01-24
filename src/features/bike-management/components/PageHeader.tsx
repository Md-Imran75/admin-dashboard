import { Button } from '@/components/custom/button';
import { CreateUserForm } from './CreateForm';


export const PageHeader = () => {
	return (
		<div className='flex items-center justify-between'>
			<h1 className='text-2xl font-bold'>Bike Management</h1>
			{/* <CreateUserForm/> */}
		</div>
	);
};

PageHeader.displayName = 'PageHeader';