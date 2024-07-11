export class Invoicedetail {
    id!: number;
    invoiceNo!: string;
    invoiceDate!: Date;
    invoiceAmt!: number;

    financedAmount!: number;

    setup!: number;
    interest!: number;
    paidAmt!: number;
    paidDate!: any;
    creditDays!: number;
    dueDate!: any;
    recdDate!: any;
    balAmt!: number;
    secondPaidDate!: any;
    setdays!: any;
    financePercent!: number;
    intrestRate!: number;
    intrestRecDate!: number;
}
