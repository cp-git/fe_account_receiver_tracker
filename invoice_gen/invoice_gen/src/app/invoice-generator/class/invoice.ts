export class Invoice {
    id!: number;
    invoiceNo!: string;
    invoiceDate!: Date;
    invoiceAmt!: number;
    financedAmount!: number;
    setup!: number;
    interest!: number;
    paidAmt!: number;
    paidDate!: Date;
    dueDate!: Date;
    recdDate!: Date;
    balAmt!: number;
    secondPaidDate!: Date | null;
    creditDays!: number;
    statusDays!: number;
    invoiceAddedDate!: Date;
    financePercent!: number;
    intrestRate!: number;
    setdays!: any;
    intrestRecDate!: number;
}
