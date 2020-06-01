import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Balance {
    income: number;
    outcome: number;
    total: number;
}

interface ListTransactionDTO {
    transactions: Transaction[];
    balance: Balance;
}

class GetTransactionService {
    private transactionsRepository: TransactionsRepository;

    private listTransaction: ListTransactionDTO;

    constructor(transactionsRepository: TransactionsRepository) {
        this.transactionsRepository = transactionsRepository;
        this.listTransaction = {
            transactions: [],
            balance: { income: 0, outcome: 0, total: 0 },
        };
    }

    public execute(): ListTransactionDTO {
        const getTransations = this.transactionsRepository.all();
        const getBalance = this.transactionsRepository.getBalance();

        // const transactionsList = transaction;
        // const balanceTrans

        this.listTransaction = {
            transactions: getTransations,
            balance: getBalance,
        };

        return this.listTransaction;
    }
}

export default GetTransactionService;
