import axiosInstance from '@/utils/axiosInstance';

export class AuthApi {
   
    public static async login(email: string, password: string) {
        try {
            const response = await axiosInstance.post(`${import.meta.env.VITE_APP_API_URL}/login`, { email, password });
            return response.data;
        } catch (error: unknown) {
            console.error('Login failed:', error);
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('An unexpected error occurred during login.');
        }
    }
}
 