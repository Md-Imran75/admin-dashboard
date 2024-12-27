import { clsx } from 'clsx';
import { SVGIconType } from './type';

export const ErrorInfoIcon = ({
	className,
	size = 15,
	strokeWidth = 2,
}: SVGIconType) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={strokeWidth}
			className={clsx(className)}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
			/>
		</svg>
	);
};