import { UserDocument } from "../models/User";
import User from '../models/User';


const createUser = async (user: UserDocument): Promise<UserDocument> => {
    return User.create(user)
}

const getUser = async (id: string): Promise<UserDocument | null > => {
    return User.findById(id);
}

const getUsers = async (): Promise<UserDocument[] | null> => {
    return User.find();
}

const deleteUser = async (id: string): Promise<UserDocument | null> => {
    return User.findByIdAndDelete(id);
}

const updateUser = async (id: string): Promise<UserDocument | null> => {
    return User.findByIdAndUpdate(id)
}

export default {createUser, getUser, getUsers, deleteUser, updateUser}