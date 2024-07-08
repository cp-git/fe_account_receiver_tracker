
export class Company {
    companyId?: number;
    companyName: string;
    companyAddress: string;
    companyContact: string;
    companyPerson: string;
    active: boolean;
  
    constructor(

      companyName: string,
      companyAddress: string,
      companyContact: string,
      companyPerson: string,
      active: boolean
    ) {
   
      this.companyName = companyName;
      this.companyAddress = companyAddress;
      this.companyContact = companyContact;
      this.companyPerson = companyPerson;
      this.active = active;
    }
  }
  
  