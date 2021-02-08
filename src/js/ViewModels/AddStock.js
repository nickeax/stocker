export class AddStock {
  constructor(val) {
    this.val = val // Validator object
    this.colour = ""
    this.partNumber = ""
    this.description = ""
    this.required = [
      { colour: "text" },
      { partNumber: "text" },
      { description: "text" },
    ]
    this.controller = "" // For referencing
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