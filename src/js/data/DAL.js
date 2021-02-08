export class DAL {
  constructor() { 
    this.accountsPrefix = "stocker-account"
    this.ordersPrefix = "stocker-order"
    this.stockPrefix = "stocker-stock"
  }

  // ACCOUNTS
  AddMember(mem) {
    console.log(`Adding member ${mem.fName} ${mem.lName} with ID ${mem.ID} to Local Storage`)
    let key = this.BuildKey([this.accountsPrefix, mem.ID])
    localStorage.setItem(key, JSON.stringify(mem))
  }

  // ITEMS
  GetItems(VM) {
    console.log("VM: ", VM)
    let deseriObjects = []
    for(let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)
      if(key.split('-').indexOf(VM) !== -1) {
        deseriObjects.push(JSON.parse(localStorage.getItem(key)))
      }
    }
    return deseriObjects
  }

  GetItem(id) {
    return this.GetItems().filter(x => x.ID === id)
  }

  BuildKey(arr) {
    return arr.join('-')
  }
}