import { UI } from './Controllers/UI.js'
import { Utils } from './Utils/Utils.js'
import { Customer } from "./Models/Customer.js"

const ui = new UI(document.querySelector('#ui'))
const defaultElement = document.querySelector('#accounts')
const utils = new Utils()

ui.Init(defaultElement)

let id = utils.GUID("xxx-xxxxx-xxxxx-xxx")

let customer1 = new Customer({
  id: id,
  fName: "Nick",
  lName: "Fletcher",
  email: "nickeax@gmail.com",
  mobile: "0418519027",
  state: "VIC",
  city: "Melbourne",
  street: "Dobell Drive",
  number: "Unit 12, 1"
})