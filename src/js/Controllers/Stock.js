import { Item } from '../Models/Item.js'

export class Stock {
  constructor(ut, dl) {
    this.items = []
    this.utils = ut
    this.dal = dl
  }

  Add(itm) {
    let val = false
    let memberValidity =  this.ValidMember(itm)
    val = memberValidity.length
    if(!val) {
      let tmpId = this.utils.GUID(this.utils.PATTERN)
      this.items.push(new Item(tmpId, itm))
      this.dal.AddItem(this.Get(tmpId))
    }
    return memberValidity
  }

  Get(id) {
    return this.items.filter(x => x.ID == id)[0]
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