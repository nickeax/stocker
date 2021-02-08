export class Item {
  constructor(id, obj) {
    this.ID = id,
    this.colour = obj.colour
    this.partNumber = obj.partNumber
    this.description = obj.description
    this.unitCost = obj.unitCost
  }
}