export class Invoice {
    id!: number;
    invoiceNo!: string;
    invoiceDate!: Date;
    invoiceAmt!: number;
    financedAmount!: number;
    setup!: number;
    interest!: number;
    paidAmt!: number;
    paidDate!: Date | null;
    dueDate!: Date;
    recdDate!: Date | null;
    balAmt!: number;
    secondPaidDate!: Date | null;
    creditDays!: number;
    statusDays!: number;
    invoiceAddedDate!: Date;
    financePercent!: number;
    intrestRate!: number;
    setdays!: any;
}
