import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
    title: string;
    value: number;
    type: 'income' | 'outcome';
}

class CreateTransactionService {
    private transactionsRepository: TransactionsRepository;

    constructor(transactionsRepository: TransactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }

    public execute({ title, value, type }: CreateTransactionDTO): Transaction {
        if (type === 'outcome') {
            const balanceTrans = this.transactionsRepository.getBalance();

            if (value > balanceTrans.total) {
                throw Error('transacao nao efetuada por falta de saldo');
            }
        }

        const transaction = this.transactionsRepository.create({
            title,
            value,
            type,
        });

        return transaction;
    }
}

export default CreateTransactionService;
