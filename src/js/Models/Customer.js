export class Customer {
  constructor(obj) {
    this.ID = obj.id,
    this.fName = obj.fName
    this.lName = obj.lName
    this.email = obj.email
    this.mobile = obj.mobile
    this.state = obj.state
    this.city = obj.city
    this.street = obj.street
    this.number = obj.number
  }
}