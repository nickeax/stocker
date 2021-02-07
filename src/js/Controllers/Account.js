import { Member } from "../Models/Member.js";

export class Account {
  accounts
  utils

  constructor(ut) {
    this.accounts = []
    this.utils = ut
  }

  Add(mem) {
    let memberValidity = false

    if(memberValidity = this.ValidMember(mem)) {
      this.accounts.push(new Member(this.utils.GUID("xxx-xxxx-xxxx"), mem))
      console.log(this.accounts)
    }
    //return memberValidity
  }

  ValidMember(m) {
    // The AddMember ViewModel knows which fields are required
    // It can return a list of invalid fields as strings
    // If returned string is empty, the ViewModel is valid
    return m.Validate().length === 0 
  }
}