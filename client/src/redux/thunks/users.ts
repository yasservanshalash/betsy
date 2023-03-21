import { AppDispatch } from './../store';
import { userActions } from '../slices/user';
import axios from 'axios';
import { User } from '../../types/types';

const token = localStorage.getItem('token')
export function editNameThunk(user: User, name: string) {
    return async (dispatch: AppDispatch) => {
        const result = await axios.put("https://betsy-backend.onrender.com/users/" + user._id , {"name": name}, { headers: {
            Authorization: `Bearer ${token}`
        }})
        dispatch(userActions.changeName(result.data));
    }
} 

export function editAvatar(user: User, avatar: string) {
    return async (dispatch: AppDispatch) => {
        const result = await axios.put("https://betsy-backend.onrender.com/users/" + user._id , {"avatar": avatar}, { headers: {
            Authorization: `Bearer ${token}`
        }})
        dispatch(userActions.changeAvatar(result.data));
    }
} 
