import apiClient from "./apiClient";

export const signUpRequest = async (userData) => {
    const response = await apiClient.post('/auth/signup', userData)

    return response.data
}