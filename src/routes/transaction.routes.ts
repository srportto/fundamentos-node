import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import GetTransactionService from '../services/GetTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
    try {
        //
        // const transactions = transactionsRepository.all();
        // const balance = transactionsRepository.getBalance();

        const getTransaction = new GetTransactionService(
            transactionsRepository,
        );

        const listTransactions = getTransaction.execute();

        return response.json(listTransactions);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

transactionRouter.post('/', (request, response) => {
    try {
        const { title, value, type } = request.body;

        const createAppointment = new CreateTransactionService(
            transactionsRepository,
        );

        const transaction = createAppointment.execute({
            title,
            value,
            type,
        });

        return response.json(transaction);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default transactionRouter;
