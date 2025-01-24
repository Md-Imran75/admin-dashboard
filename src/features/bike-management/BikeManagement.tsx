import { Pagination } from '@/components/custom/pagination';
import { PageHeader } from './components/PageHeader.tsx';
import { ResetButton } from './components/ResetButton.tsx';
import { BikeFilter} from './components/BikeFilter.tsx';
import { BikeSearch} from './components/BikeSearch.tsx';
import { BikeTable} from './components/BikeTable.tsx';

import { BikeProvider } from './BikeProvider.tsx';
import { useBikeContext } from './hooks/useBikeContext.tsx';
import { BikeAPI } from '@/apis/bikeApi.ts';



export const BikeManageMent = () => {
	return (
		
		<BikeProvider>
			<BikeManagementContent />
		</BikeProvider>
	
	);
};

BikeManageMent.displayName = 'BikeManageMent';

const BikeManagementContent = () => {
	
	const {state, setPage, setLimit} = useBikeContext();
	const {data, error, isLoading} : any = BikeAPI.useBikes(state);
    console.log(data)
	return (
		<div className='mb-40'>
			<PageHeader />
			<div className='mt-6' />
			<div className='space-y-6'>
				<div className='space-y-2'>
					<BikeFilter />
					<div className='flex gap-2 items-center'>
						<div className='flex-1'>
							<BikeSearch />
						</div>
						<div>
							<ResetButton />
						</div>
					</div>
				</div>
				<BikeTable
					bikes={data?.data}
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

BikeManagementContent.displayName = 'BikeManagementContent';