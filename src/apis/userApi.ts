import { State, User } from '../features/user-management/types';
import {useQuery } from "react-query";
import axiosInstance from '@/utils/axiosInstance';


class UserAPI {

	private static async fetchUsers(params: State): Promise<User[]> {
		const response = await axiosInstance.get(`/admin/dashboard/user-management/all-users`, { params });
		return response.data;
	}

	static useUsers = (queryParams: State) => {
		return useQuery(
			["users", queryParams], () => this.fetchUsers(queryParams), {
			keepPreviousData: true,
			staleTime: 5000
		}
		)
	}

}

export { UserAPI };