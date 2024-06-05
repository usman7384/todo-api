import { Request, Response } from 'express';
import UserService  from '../../app/services/userService';
import {container} from '../../infra/DI_Container/inversify.config'
import TYPES from "../../shared/types";


const userService = container.get<UserService>(TYPES.UserService);

export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id
        const user = await userService.getUserById(userId)
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getUsers = async (req:Request, res:Response) => {
    try{
        const options = req.pagination;
        const users = await userService.getAllUsers(options);
        res.json(users)
    }
    catch (error) {
        res.status(500).json({error})
    }

}