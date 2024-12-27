import { Button } from '@/components/custom/button';
import { useUserContext } from '../hooks/useUserContest';

export const ResetButton = () => {
	const { resetFilter } = useUserContext();
	return (
		<Button variant='outline' onClick={resetFilter}>
			Reset
		</Button>
	);
};