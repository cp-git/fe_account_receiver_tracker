
export class Company {
    companyId?: number;
    companyName: string;
    companyAddress: string;
    companyContact: string;
    companyPerson: string;
    active: boolean;
  
    constructor(
      companyId: number,
      companyName: string,
      companyAddress: string,
      companyContact: string,
      companyPerson: string,
      active: boolean
    ) {
      this.companyId = companyId;
      this.companyName = companyName;
      this.companyAddress = companyAddress;
      this.companyContact = companyContact;
      this.companyPerson = companyPerson;
      this.active = active;
    }
  }
  
  