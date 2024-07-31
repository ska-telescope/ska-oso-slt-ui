/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export interface customAxiosResponse {
  data: object;
  status: number;
  error: string;
}

function handleAxiosError(error: object) {
  let status = 200;
  let errorMessage = null;
  type AxiosErrorType = { message: string; statusCode: number };
  if (axios.isAxiosError(error)) {
    const typedError: AxiosErrorType = {
      message: error.message,
      statusCode: error.response?.status || 500
    };
    status = typedError.statusCode;
    errorMessage = typedError.message;
  } else {
    status = 500;
    errorMessage = 'Internal Server Error';
  }
  return { status, error: errorMessage };
}

const apiService = {
  baseURL: () => "192.168.0.1:5000",

  saveStatusEntity: async (path, statusData: any): Promise<customAxiosResponse> => {
    const baseUrl = apiService.baseURL();
    const url = `${baseUrl}/${path}`;
    try {
      const result = await axios.put<JSON>(url, statusData);
      return { data: result, status: 200, error: null };
    } catch (err) {
      const errorResponse = handleAxiosError(err);
      return { data: null, status: errorResponse.status, error: errorResponse.error };
    }
  },

  getSltData: async (path: string): Promise<any> => {
    const baseUrl = apiService.baseURL();
    const url = `${baseUrl}/${path}`;
    try {
      const result = await axios.get(url);
      return { data: result.data, status: 200, error: null };
    } catch (err) {
      const errorResponse = handleAxiosError(err);
      return { data: null, status: errorResponse.status, error: errorResponse.error };
    }
  },

 
};

export default apiService;