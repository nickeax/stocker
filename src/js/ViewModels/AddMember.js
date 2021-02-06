export class AddMember {
  fName
  lName
  email
  mobile
  state
  city
  address
  number

  constructor() {
    this.fName = ""
    this.lName = ""
    this.email = ""
    this.mobile = ""
    this.state = ""
    this.city = ""
    this.address = ""
    this.number = ""
  }

  Reset() {
    let me = this
    Object.keys(this).forEach(x => {
      me[x] = ""
    })
  }
}