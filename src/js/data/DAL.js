export class DAL {
  _store

  constructor(str) {
    this._store = str
  }

  GetOrders() {
    return {
      
    }
    return this._store.getOrders()
  }

  GetOrder(id)
}