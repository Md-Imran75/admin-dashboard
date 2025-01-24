import { EditPencilIcon, TrashIcon } from '@/components/icons';
import { EyeIcon } from '@/components/icons';
import { IconButton } from '@/components/custom/iconButton';
import { memo, useEffect } from 'react';
import { UpdateUserForm } from './updateForm';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/store';
import { useToast } from "../../../hooks/use-toast";
import { clearMessage, deleteUserById } from '@/app/features/userManagement/user.management,slice';

interface User {
    _id: string;
    [key: string]: any;
}

export const BikeRowActions = memo(({ data }: { data: User }) => {
    const { toast } = useToast();
    const dispatch = useDispatch<AppDispatch>();
    const { message } = useSelector((state: RootState) => state.userManagement);

    const id: string = data?._id;

    const deleteUser = () => {
        dispatch(deleteUserById({ id }));
    };

    useEffect(() => {
        if (message) {
            toast({
                title: message,
            });
            dispatch(clearMessage());
        }
    }, [toast, message, dispatch]);

    const classes = `hover:bg-zinc-200 p-1`;

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <IconButton icon={EditPencilIcon} size={15} />
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update User</DialogTitle>
                        <DialogDescription>Fill all the fields carefully.</DialogDescription>
                    </DialogHeader>

                    {/* update form */}
                    {/* <UpdateUserForm data={data} /> */}
                </DialogContent>
            </Dialog>

            <Link to={`/user/${data?._id}`}>
                <IconButton icon={EyeIcon} size={15} className={classes} />
            </Link>

            <IconButton
                onClick={deleteUser}
                icon={TrashIcon}
                size={15}
                className={`${classes} text-red-500`}
            />
        </>
    );
});

BikeRowActions.displayName = 'BikeRowActions';
