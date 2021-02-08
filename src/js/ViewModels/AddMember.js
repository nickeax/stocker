export class AddMember {
  constructor(val) {
    this.val = val
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
    return this.val.Val(this.required, this)
  }

  Reset() {
    let me = this
    Object.keys(this).forEach(x => {
      if (x !== "required") me[x] = ""
    })
  }
}