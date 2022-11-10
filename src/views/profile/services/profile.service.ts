import axios from 'axios';
import { AccountByIDResponse } from '../types/account-by-id-response.interface';

const BASE_URL = import.meta.env.VITE_BASE_ENDPOINT;

export const getAccountByID = async (accountID: string | string[]): Promise<AccountByIDResponse> => {
    const { data } = await axios.get<AccountByIDResponse>(`${BASE_URL}/account/${accountID}`, {
        headers: {  
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjgwNDY1MzUsImRhdGEiOiJWemE1Rlo2cEpjOUI2VnV6TkprWiIsImlhdCI6MTY2ODA0MjkzNX0.6e1DqARyrTDyJdSz3mGIfmIhuBu_m-OSywnITS8E_Ds`,
            "Access-Control-Request-Methods": "GET",
            "Origin": "https://noba-api-web-banking-iekdhw627q-ue.a.run.app"
        }
    });
    return data;
}