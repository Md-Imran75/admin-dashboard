import { EditPencilIcon, TrashIcon } from '@/components/icons';
import { EyeIcon } from '@/components/icons';
import { IconButton } from '@/components/custom/iconButton';
import { memo, useState, } from 'react';
import { UpdateUserForm } from './updateForm';
import { Link } from 'react-router-dom';

export const UserRowActions = memo(({ data }: any) => {
	const [isEditButtonOpen, setIsEditButtonOpen] = useState(false);
	const classes = `hover:bg-zinc-200 p-1`;

	return (
		<>
			<Link to={`/user/${data?._id}`} >
				<IconButton icon={EyeIcon} size={15} className={classes} />
			</Link>

			{
				!isEditButtonOpen && <IconButton onClick={() => setIsEditButtonOpen(!isEditButtonOpen)} icon={EditPencilIcon} size={15} className={classes} />
			}

			{
				isEditButtonOpen && <UpdateUserForm data={data} />
			}


			<IconButton
				icon={TrashIcon}
				size={15}
				className={`${classes} text-red-500`}
			/>

		</>
	);
});

UserRowActions.displayName = 'UserRowActions';