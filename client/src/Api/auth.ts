import axios from 'axios'
import { LoginData, RegisterData } from '../Types/Model/auth'
import{
    URL
} from './url'

export const postLogin = (payload:LoginData ) => axios.post(`${URL}/auth/login`,payload)
export const postRegister = (payload:RegisterData ) => axios.post(`${URL}/auth/register`,payload)