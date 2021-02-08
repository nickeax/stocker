export class Validate {
  Val(required, obj) {
    this.invalidList = []
    required.forEach(x => {
      let fieldName = Object.keys(x)
      let fieldValue = obj[fieldName]
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
          console.log("Member info is valid.")
          break;
      }
    })

    return this.invalidList
  }

  AddInvalid(str, msg) {
    this.invalidList.push({field: `${str}`, message: `${msg}`})
  }
}