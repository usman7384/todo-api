import { Request, Response } from 'express';
import TodoService  from '../../app/services/todoService';
import { container } from '../../infra/DI_Container/inversify.config';
import TYPES from "../../shared/types";
import { TodoDTO } from '../../app/DTOs/TodoDTO';


const todoService = container.get<TodoService>(TYPES.TodoService);

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
    const todoDTO: TodoDTO = req.body;
    // console.log("incoming",todoDTO)
    const todo = await todoService.createTodo(todoDTO,userId);
    res.status(201).json(todo);}
    catch(error){
        res.status(500).json({error})

    }
};
