import { Table } from '@/components/custom/table';
import { ErrorInfoIcon } from '@/components/icons/error-info';
import { titleCase } from '@/utils/text';
import clsx from 'clsx';
import { BikeRowActions} from './BikeRowAction';
import { getBikeStatusColor } from '../utils/utils';
import type { Bike } from '../types';

type BikeTableProps = {
	bikes: Bike[];
	isLoading?: boolean;
	error?: string;
};

export const BikeTable = ({ bikes, isLoading, error }: BikeTableProps) => {
	const renderTable = () => {
		if (isLoading) return <BikeTableSkeleton />;
		if (error) return <BikeTableError message={error} />;
		if (bikes.length === 0) return <BikeTableNoData />;
		return <BikeTableBody bikes={bikes} />;
	};
    
	return (
		<div>
			<Table>
				<Table.Header>
					<Table.Row>
						<Table.Cell>ID</Table.Cell>
						<Table.Cell>UserId</Table.Cell>
						<Table.Cell>Model</Table.Cell>
						<Table.Cell>Brand</Table.Cell>
						<Table.Cell>Price</Table.Cell>
						<Table.Cell className='w-[300px]'>Title</Table.Cell>
						<Table.Cell>Verified</Table.Cell>
						<Table.Cell className='w-[150px] text-right'>Status</Table.Cell>

					</Table.Row>
				</Table.Header>
				{renderTable()}
			</Table>
		</div>
	);
};

BikeTable.displayName = 'BikeTable';

const BikeTableBody = ({ bikes }: { bikes: Bike[] }) => {
	return (
		<Table.Body>
			{bikes?.map((bike) => (
				<Table.Row key={bike._id} className='group'>
					<Table.Cell>{bike._id.split('-')[0]}</Table.Cell>
					<Table.Cell className='font-medium'>{bike.userId}</Table.Cell>
					<Table.Cell className='font-medium'>{bike.bikeModel}</Table.Cell>
					<Table.Cell>{bike.brand}</Table.Cell>
					<Table.Cell>{bike.price}</Table.Cell>
					<Table.Cell>{titleCase(bike.title)}</Table.Cell>
					<Table.Cell>{titleCase(bike.verified)}</Table.Cell>
					<Table.Cell className='w-[150px] text-right'>
						<span
							className={clsx(
								'group-hover:hidden inline-block',
								getBikeStatusColor(bike.status)
							)}
						>
							{titleCase(bike.status)}
						</span>
						<div className='hidden group-hover:inline-flex justify-end items-center gap-2'>
							<BikeRowActions data={bike} />
						</div>
					</Table.Cell>
					
				</Table.Row>
			))}
		</Table.Body>
	);
};

BikeTableBody.displayName = 'BikeTableBody';

const BikeTableSkeleton = () => {
	return (
		<Table.Body>
			{Array.from({ length: 10 }).map((_, index) => (
				<Table.Row key={index}>
					<Table.Cell>
						<div className='h-4 w-8 animate-pulse rounded bg-gray-200' />
					</Table.Cell>
					<Table.Cell>
						<div className='h-4 w-8 animate-pulse rounded bg-gray-200' />
					</Table.Cell>
					<Table.Cell>
						<div className='h-4 w-8 animate-pulse rounded bg-gray-200' />
					</Table.Cell>
					<Table.Cell>
						<div className='h-4 w-32 animate-pulse rounded bg-gray-200' />
					</Table.Cell>
					<Table.Cell>
						<div className='h-4 w-8 animate-pulse rounded bg-gray-200' />
					</Table.Cell>
					<Table.Cell>
						<div className='h-4 w-20 animate-pulse rounded bg-gray-200' />
					</Table.Cell>
					<Table.Cell>
						<div className='h-4 w-16 animate-pulse rounded bg-gray-200' />
					</Table.Cell>
					<Table.Cell>
						<div className='h-4 w-16 animate-pulse rounded bg-gray-200' />
					</Table.Cell>
				</Table.Row>
			))}
		</Table.Body>
	);
};

const BikeTableNoData = () => {
	return (
		<Table.Body>
			<Table.Row className='col-span-full'>
				<Table.Cell colSpan={7}>
					<div className='p-4 text-center'>
						<h3 className='mb-2 text-lg font-semibold text-gray-600'>
							No bikes found
						</h3>
						<p className='text-gray-500'>There are no bikes to display.</p>
					</div>
				</Table.Cell>
			</Table.Row>
		</Table.Body>
	);
};

BikeTableNoData.displayName = 'BikeTableNoData';

const BikeTableError = ({ message }: { message: string }) => {
	return (
		<Table.Body>
			<Table.Row>
				<Table.Cell colSpan={7}>
					<div className='p-4 text-center'>
						<div className='mb-4 flex justify-center'>
							<ErrorInfoIcon className='text-red-600' size={48} />
						</div>
						<h3 className='mb-2 text-lg font-semibold text-red-600'>
							Error Loading bikes
						</h3>
						<p className='text-red-500'>{message}</p>
					</div>
				</Table.Cell>
			</Table.Row>
		</Table.Body>
	);
};