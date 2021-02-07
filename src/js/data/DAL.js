export class DAL {
  constructor() { 
    this.accountsPrefix = "stocker-acc"
    this.ordersPrefix = "stocker-ord"
    this.stockPrefix = "stocker-stk"
  }

  // ACCOUNTS
  AddMember(mem) {
    console.log(`Adding member ${mem.fName} ${mem.lName} with ID ${mem.ID} to Local Storage`)
    let key = this.BuildKey([this.accountsPrefix, mem.ID])
    localStorage.setItem(key, JSON.stringify(mem))
  }

  // ORDERS
  GetOrders() {
    let deseriObjects = []
    for(let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)
      if(key.split('-').indexOf('acc') !== -1) {
        deseriObjects.push(JSON.parse(localStorage.getItem(key)))
      }
    }
    return deseriObjects
  }

  GetOrder(id) {
    return this.GetOrders().filter(x => x.ID === id)
  }

  BuildKey(arr) {
    return arr.join('-')
  }
}