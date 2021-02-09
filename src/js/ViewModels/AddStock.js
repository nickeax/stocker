export class AddStock {
  constructor(man) {
    this._manager = man // Validator object
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
    return this._manager.Validate(this)
  }

  Reset() {
    this._manager.Reset(this)
  }
}