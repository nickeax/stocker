export class Member {
  constructor(id, obj) {
    this.ID = id,
    this.fName = obj.fName
    this.lName = obj.lName
    this.email = obj.email
    this.mobile = obj.mobile
    this.state = obj.state
    this.city = obj.city
    this.address = obj.address
    this.number = obj.number
  }
}