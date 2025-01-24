
import {useQuery } from "react-query";
import axiosInstance from '@/utils/axiosInstance';
import { Bike, State } from '@/features/bike-management/types';


class BikeAPI {

	private static async fetchUsers(params: State): Promise<Bike[]> {
		const response = await axiosInstance.get(`/admin/dashboard/bike-management/bikes`, { params });
		return response.data;
	}

	static useBikes = (queryParams: State) => {
		return useQuery(
			["bikes", queryParams], () => this.fetchUsers(queryParams), {
			keepPreviousData: true,
			staleTime: 5000
		}
		)
	}

}

export { BikeAPI };