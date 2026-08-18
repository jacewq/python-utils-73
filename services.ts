import { Request, Response } from 'express';
import { getData, postData } from './utils';

export const fetchData = async (req: Request, res: Response) => {
    try {
        const data = await getData(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

export const createData = async (req: Request, res: Response) => {
    try {
        const newData = await postData(req.body);
        res.status(201).json(newData);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create data' });
    }
};

export const updateData = async (req: Request, res: Response) => {
    try {
        const updatedData = await postData(req.body, req.params.id);
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update data' });
    }
};