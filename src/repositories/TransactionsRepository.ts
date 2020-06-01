import Transaction from '../models/Transaction';

interface Balance {
    income: number;
    outcome: number;
    total: number;
}

interface CreateTransactionDTO {
    title: string;
    value: number;
    type: 'income' | 'outcome';
}

class TransactionsRepository {
    private transactions: Transaction[];

    private balance: Balance;

    constructor() {
        this.transactions = [];
        this.balance = { income: 0, outcome: 0, total: 0 };
    }

    public all(): Transaction[] {
        return this.transactions;
    }

    public getBalance(): Balance {
        const incomeTrans = this.transactions.reduce((totalAcu, item) => {
            let acumulador = totalAcu;

            if (item.type === 'income') {
                acumulador += item.value;
            }

            return acumulador;
        }, 0);

        const outcomeTrans = this.transactions.reduce((totalAcu, item) => {
            let acumulador = totalAcu;

            if (item.type === 'outcome') {
                acumulador += item.value;
            }

            return acumulador;
        }, 0);

        const totalTrans = incomeTrans - outcomeTrans;

        this.balance = {
            income: incomeTrans,
            outcome: outcomeTrans,
            total: totalTrans,
        };

        return this.balance;
    }

    public create({ title, value, type }: CreateTransactionDTO): Transaction {
        const transaction = new Transaction({ title, value, type });

        this.transactions.push(transaction);

        return transaction;
    }
}

export default TransactionsRepository;
