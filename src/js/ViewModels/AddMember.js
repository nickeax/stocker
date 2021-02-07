export class AddMember {
  constructor() {
    this.fName = ""
    this.lName = ""
    this.email = ""
    this.mobile = ""
    this.state = ""
    this.city = ""
    this.address = ""
    this.number = ""
    this.invalidList = []
    this.required = [{ fName: "text" },
    { lName: "text" },
    { email: "email" },
    { mobile: "number" },
    { state: "text" },
    { city: "text" },
    { address: "text" },
    { number: "number" }]
  }

  Validate() {
    const me = this
    let invalidList = ""
    this.required.forEach(x => {
      let fieldName = Object.keys(x)
      let fieldValue = me[fieldName]
      switch (x[fieldName]) {
        case 'text':
          if (fieldValue.length < 1) {
            this.AddInvalid(fieldName, "This field is required")
          }
          break;
        case 'email':
          if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(fieldValue)) {
            this.AddInvalid(fieldName, "Email format is invalid")
          }
          break
        case 'number':
          if (!/^[0-9]/.test(fieldValue)) {
            this.AddInvalid(fieldName, "Only numerals are valid for this field")
          }
          break
        default:
          break;
      }
    })
    let tmp = this.invalidList
    this.invalidList = []

    return tmp
  }

  AddInvalid(str, msg) {
    this.invalidList.push({field: `"${str}"`, message: `"${msg}"`})
  }

  Reset() {
    let me = this
    Object.keys(this).forEach(x => {
      if (x !== "required") me[x] = ""
    })
  }
}