import { Member } from "../Models/Member.js";

export class Account {
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
      let tmpId = this.utils.GUID(this.utils.PATTERN)
      this.accounts.push(new Member(tmpId, mem))
      this.dal.AddMember(this.GetLocal(tmpId))
    }
    return memberValidity
  }

  Get(id) {
    return this.accounts.filter(x => x.ID == id)[0]
  }

  GetLocal(id) {
    return this.accounts.filter(x => x.ID == id)[0]
  }

  GetAll(mem) {
    return this.dal.GetItems(mem.controller)
  }

  ValidMember(m) {
    // The AddMember ViewModel knows which fields are required
    // It can return a list of invalid fields as strings
    // If returned string is empty, the ViewModel is valid
    return m.Validate()
  }
}