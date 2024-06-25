// Importing Company class from the same file

import { Company } from "src/app/company/classes/company";


export class CompanyMembers {
  memberId: number;
  memberName: string;
  username: string;
  password: string;
  memberEmail: string;
  memberContact: string;
  company: Company; // Referencing the Company class directly
  active: boolean;


  constructor(
    memberId: number,
    memberName: string,
    username: string,
    password: string,
    memberEmail: string,
    memberContact: string,
    company: Company, // Using Company type directly
    active: boolean,

  ) {
    this.memberId = memberId;
    this.memberName = memberName;
    this.memberEmail = memberEmail;
    this.memberContact = memberContact;
    this.company = company; // Assigning directly to the company property
    this.active = active;
    this.username = username;
    this.password = password;
  }
}

