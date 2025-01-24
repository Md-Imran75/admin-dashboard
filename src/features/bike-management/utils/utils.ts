import { Bike } from "../types";

export const getBikeStatusColor = (status: Bike['status']) => {
    switch (status) {
        case 'active':
            return 'text-green-500';
        case 'rejected':
            return 'text-orange-500';
        case 'pending':
            return 'text-yellow-500';
        default:
            return 'text-gray-500';
    }
};