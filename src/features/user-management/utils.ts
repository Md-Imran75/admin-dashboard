import { User } from './types';
import { z } from 'zod';

export const getUserStatusColor = (status: User['status']) => {
	switch (status) {
		case 'active':
			return 'text-green-500';
		case 'rejected':
			return 'text-orange-500';
		case 'pending':
			return 'text-yellow-500';
		case 'blocked':
			return 'text-red-500';
		default:
			return 'text-gray-500';
	}
};

export const UserSchema = z.object({
  userName: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username should be at most 20 characters').nonempty('User Name is required'),
  fullName: z.string().min(3, 'Full Name must be at least 3 characters').max(20, 'Full Name should be at most 20 characters').nonempty('Full Name is required'),
  email: z.string().email('Invalid email format').nonempty('Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters').nonempty('Password is required'),
  phone: z.string().min(14, 'Phone number must be 14 digits').max(14, 'Phone number should be 14 digits').nonempty('Phone number is required'),
  role: z.string().nonempty('Role is required'),
  status: z.string().nonempty('Role is required'),
});

export const UpdateUserSchema = z.object({
	userName: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username should be at most 20 characters').nonempty('User Name is required'),
	fullName: z.string().min(3, 'Full Name must be at least 3 characters').max(20, 'Full Name should be at most 20 characters').nonempty('Full Name is required'),
	email: z.string().email('Invalid email format').nonempty('Email is required'),
	password: z.string().optional(),
	phone: z.string().min(14, 'Phone number must be 14 digits').max(14, 'Phone number should be 14 digits').nonempty('Phone number is required'),
	role: z.string().nonempty('Role is required'),
	status: z.string().nonempty('Role is required'),
	balance: z.number(),
	id: z.string().readonly()
  });