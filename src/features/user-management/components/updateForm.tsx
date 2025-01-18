import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Button } from '@/components/custom/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/custom/input';

import FormikSelect from './FormikSelect';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { updateUser } from '@/app/features/auth/user.management,slice';
import { useToast } from "../../../hooks/use-toast"
import { useEffect, useState } from 'react';
import { UpdateUserSchema } from '../utils';
import { z } from 'zod';
import { IconButton } from '@/components/custom/iconButton';
import { EditPencilIcon } from '@/components/icons';
import { roleOptions, statusOptions } from '../types';



export type CreateUserFormValues = z.infer<typeof UpdateUserSchema>;



export function UpdateUserForm({ data }: any) {
  console.log(data)
  const { toast } = useToast()
  const dispatch: AppDispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.userManagement);
  const [message, setMessage] = useState("");

  const initialValues: CreateUserFormValues = {
    userName: data.userName ?? '',
    fullName: data.fullName ?? '',
    email: data.email ?? '',
    password: '',
    phone: data.phone ?? '',
    role: data.role ?? '',
    status: data.status ?? '',
    balance: data.balance ?? 0,
    id: data?._id ?? ''
  };

  const onSubmit = async (
    values: CreateUserFormValues,
    { resetForm }: FormikHelpers<CreateUserFormValues>
  ) => {
    try {
      const result = await dispatch(updateUser(values as any)).unwrap(); // Use `unwrap` to handle async result
      setMessage(result.message || "User updated successfully!"); // Set success message
      resetForm();
    } catch (error: any) {
      setMessage(error.response.data.errorMessage || "Failed to update user."); // Set error message
    }
  };

  useEffect(() => {
    if (message) {
      toast({
        title: message,
      });
      setMessage(""); // Clear the message after showing the toast
    }
  }, [message, toast]);

  return (
      <Dialog>
      <DialogTrigger asChild>
        <IconButton icon={EditPencilIcon} size={15} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>Fill all the fields carefully.</DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(UpdateUserSchema)}
          onSubmit={onSubmit}
        >
          {() => (
            <Form className="mt-5 overflow-y-scroll h-[500px] custom-scrollbar">

              <Field
                name="id"
                as={Input}
                className="mb-3"
                required
                label="User Id"
                type="text"
                disabled
              />
              <ErrorMessage name="id" component="div" className="text-red-500 text-sm mb-2" />

              <Field
                name="userName"
                as={Input}
                className="mb-3"
                placeholder="Unique username"
                required
                label="User Name"
                type="text"
              />
              <ErrorMessage name="userName" component="div" className="text-red-500 text-sm mb-2" />

              <Field
                name="fullName"
                as={Input}
                className="mb-3"
                placeholder="Full name"
                required
                label="Full Name"
                type="text"
              />
              <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mb-2" />

              <Field
                name="email"
                as={Input}
                className="mb-3"
                placeholder="Email address"
                required
                label="Email"
                type="email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mb-2" />

              <Field
                name="password"
                as={Input}
                className="mb-3"
                placeholder="Password"
                label="Password"
                type="password"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mb-2" />

              <Field
                name="phone"
                as={Input}
                className="mb-3"
                placeholder="Phone number"
                required
                label="Phone"
                type="text"
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mb-2" />

              <Field
                name="balance"
                as={Input}
                className="mb-3"
                placeholder="Balance"
                required
                label="Balance"
                type="number"
              />
              <ErrorMessage name="balance" component="div" className="text-red-500 text-sm mb-2" />

              <FormikSelect
                label="Role"
                name="role"
                className='mb-3'
                options={roleOptions}
              />
              <ErrorMessage name="role" component="div" className="text-red-500 text-sm mb-2" />

              <FormikSelect
                label="Status"
                name="status"
                options={statusOptions}
              />
              <ErrorMessage name="status" component="div" className="text-red-500 text-sm mb-2" />

              <DialogFooter>
                <Button className="mt-5" disabled={loading} type="submit">
                  {loading ? 'Updating...' : 'Update User'}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
