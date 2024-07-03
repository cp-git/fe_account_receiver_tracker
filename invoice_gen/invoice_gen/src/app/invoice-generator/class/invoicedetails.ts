export class Invoicedetails {
    id!: number;
    invoiceNo!: string;
    invoiceDate!: Date;
    invoiceAmt!: number;
    financedAmount!: number;
    setup!: number;
    interest!: number;
    paidAmt!: number;
    paidDate!: Date | null;
    creditDays!: number;
    dueDate!: Date;
    recdDate!: Date | null;
    balAmt!: number;
    secondPaidDate!: Date |null;
    setdays!:any;
}
