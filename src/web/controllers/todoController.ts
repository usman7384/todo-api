import { Request, Response } from 'express';
import TodoService  from '../../app/services/todoService';
import { container } from '../../infra/di/inversify.config';
import CONSTANTS from "../../shared/constants";
import { TodoDTO } from '../../app/dto/TodoDTO';


const todoService = container.get<TodoService>(CONSTANTS.TodoService);

export const getTodos = async (req: Request, res: Response) => {
    try{
    const options = req.pagination;
    const todos = await todoService.getAllTodos(options);
    res.json(todos);}
    catch(error){
        res.status(500).json({ message: 'Server error', error });

    }
};

export const createTodo = async (req: Request, res: Response) => {
    try{
    const userId = req.user?.id;
    const todoDTO = TodoDTO.create(req.body);
    const todo = await todoService.createTodo(todoDTO,userId);
    res.status(201).json(todo);}
    catch(error){
        res.status(500).json({error})

    }
};
