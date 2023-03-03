import { AppDispatch } from './../store';
import { userActions } from '../slices/user';
import axios from 'axios';
import { User } from '../../types/types';

export function editNameThunk(user: User, name: string) {
    return async (dispatch: AppDispatch) => {
        const result = await axios.put("https://betsy-backend.onrender.com/users/" + user._id , {"name": name})
        dispatch(userActions.changeName(result.data));
    }
} 

export function editAvatar(user: User, avatar: string) {
    return async (dispatch: AppDispatch) => {
        const result = await axios.put("https://betsy-backend.onrender.com/users/" + user._id , {"avatar": avatar})
        dispatch(userActions.changeAvatar(result.data));
    }
} 
