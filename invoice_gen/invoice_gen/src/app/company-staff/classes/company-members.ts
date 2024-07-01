// Importing Company class from the same file

import { Company } from "src/app/company/classes/company";
import { LoginDetails } from "src/app/login/class/logindetails";


export class CompanyMembers {
  memberId!: number;
  memberName!: string;
  memberEmail!: string;
  memberContact!: string;
  company!: Company;
  loginDetails!: LoginDetails;
  active!: boolean;


  constructor(
    memberId: number,
    memberName: string,
    memberEmail: string,
    memberContact: string,
    company: Company, // Using Company type directly
    loginDetails: LoginDetails,
    active: boolean,

  ) {
    this.memberId = memberId;
    this.memberName = memberName;
    this.memberEmail = memberEmail;
    this.memberContact = memberContact;
    this.company = company; // Assigning directly to the company property
    this.loginDetails = loginDetails;
    this.active = active;
    
  }
}

