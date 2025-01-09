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

const createUserSchema = z.object({
  userName: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username should be at most 20 characters').nonempty('User Name is required'),
  fullName: z.string().min(3, 'Full Name must be at least 3 characters').max(20, 'Full Name should be at most 20 characters').nonempty('Full Name is required'),
  email: z.string().email('Invalid email format').nonempty('Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters').nonempty('Password is required'),
  phone: z.string().min(14, 'Phone number must be 14 digits').max(14, 'Phone number should be 14 digits').nonempty('Phone number is required'),
  role: z.string().nonempty('Role is required'),
  status: z.string().nonempty('Role is required'),

});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;

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
  const { loading, message : apiMessage} = useSelector((state: RootState) => state.userManagement);
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
          validationSchema={toFormikValidationSchema(createUserSchema)}
          onSubmit={onSubmit}
        >
          {() => (
            <Form className="mt-5">
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
