import axios from 'axios'
import{
    URL
} from './url'

export const fetchCourse = () => axios.get(`${URL}/courses`)