import { Member } from "../Models/Member.js";

export class Account {
  accounts
  utils

  constructor(ut, dal) {
    this.accounts = []
    this.utils = ut
    this.dal = dal
  }

  Add(mem) {
    let val = false
    let memberValidity = this.ValidMember(mem)
    val = memberValidity.length
    
    if(!val) {
      console.log(mem)
      let tmpId = this.utils.GUID("xxx-xxxx-xxxx")
      this.accounts.push(new Member(tmpId, mem))
      this.dal.AddMember(this.Get(tmpId))
      this.dal.GetOrders()
    }
    console.log(this.accounts)
    return memberValidity
  }

  Get(id) {
    return this.accounts.filter(x => x.ID == id)[0]
  }

  ValidMember(m) {
    // The AddMember ViewModel knows which fields are required
    // It can return a list of invalid fields as strings
    // If returned string is empty, the ViewModel is valid
    return m.Validate()
  }
}