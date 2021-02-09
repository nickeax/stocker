import { Validate } from "../data/Validate.js"; 

export class VMM {
  constructor(val) {
    this.val =  new Validate() // Eventually switch to DIing this member 
  }

  Validate(vm) {
    return this.val.Val(vm.required, vm)
  }

  Reset(vm) {
    Object.keys(vm).forEach(x => {
      if (typeof vm[x] === 'string') vm[x] = ""
    })
  }
}