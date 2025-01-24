import { Button } from '@/components/custom/button';
import { useBikeContext } from '../hooks/useBikeContext';

export const ResetButton = () => {
	const { resetFilter } = useBikeContext();
	return (
		<Button variant='outline' onClick={resetFilter}>
			Reset
		</Button>
	);
};