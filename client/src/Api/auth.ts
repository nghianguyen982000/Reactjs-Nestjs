import axios from 'axios'
import { LoginData } from '../Types/Model/login'
import{
    URL
} from './url'

export const fetchLogin = (payload:LoginData ) => axios.post(`${URL}/auth/login`,payload)