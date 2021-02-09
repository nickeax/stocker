export class AddMember {
  constructor(man) {
    this._manager = man
    this.fName = ""
    this.lName = ""
    this.email = ""
    this.mobile = ""
    this.state = ""
    this.city = ""
    this.address = ""
    this.number = ""
    this.required = [{ fName: "text" },
    { lName: "text" },
    // { email: "email" },
    // { mobile: "number" },
    // { city: "text" },
    // { address: "text" },
    // { number: "number" }
  ]
    this.controller = ""
    this.action = ""
  }

  Validate() {
    return this._manager.Validate(this)
  }

  Reset() {
    this._manager.Reset(this)
  }
}