import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Button } from '@/components/custom/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/custom/input';

import FormikSelect from './FormikSelect';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { createUser } from '@/app/features/auth/user.management,slice';
import { useToast } from "../../../hooks/use-toast"
import { useEffect, useState } from 'react';
import { UserSchema } from '../utils';



export type CreateUserFormValues = z.infer<typeof UserSchema>;

const roleOptions = [
  { value: 'user', text: 'User' },
  { value: 'seller', text: 'Seller' },
  { value: 'manager', text: 'Manager' },
  { value: 'technician', text: 'Technician' },
];

const statusOptions = [
  { value: 'pending', text: 'Pending' },
  { value: 'active', text: 'Active' },
  { value: 'rejected', text: 'Rejected' },
  { value: 'blocked', text: 'Blocked' },
];

const initialValues: CreateUserFormValues = {
  userName: '',
  fullName: '',
  email: '',
  password: '',
  phone: '',
  role: '',
  status: ''
};

export function CreateUserForm() {
  const { toast } = useToast()
  const dispatch: AppDispatch = useDispatch();
  const { loading} = useSelector((state: RootState) => state.userManagement);
  const [ message, setMessage] = useState("");
  
  const onSubmit = async (
    values: CreateUserFormValues,
    { resetForm }: FormikHelpers<CreateUserFormValues>
  ) => {
    try {
      const result = await dispatch(createUser(values)).unwrap(); // Use `unwrap` to handle async result
      setMessage(result.message || "User created successfully!"); // Set success message
      resetForm();
    } catch (error: any) {
      setMessage(error.response.data.errorMessage || "Failed to create user."); // Set error message
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
        <Button variant="outline">Add User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>Fill all the fields carefully.</DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(UserSchema)}
          onSubmit={onSubmit}
        >
          {() => (
            <Form className="mt-5 overflow-y-scroll h-[500px] custom-scrollbar">
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
                required
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

              <FormikSelect
                label="Role"
                name="role"
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
                  { loading ? 'Creating...' : 'Create User'}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
