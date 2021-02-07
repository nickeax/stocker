import { UI } from './Controllers/UI.js'
import { Account } from './Controllers/Account.js'
import { Order } from "./Controllers/Order.js"
import { Stock } from "./Controllers/Stock.js";

import { DAL } from "./data/DAL.js";

import { Utils } from './Utils/Utils.js'
import { Member } from "./Models/Member.js"
import { AddMember } from "./ViewModels/AddMember.js"

const ui = new UI(document.querySelector('#ui'),
  new AddMember(),
  new Utils(),
  new Account(new Utils(), new DAL()),
  new Order(),
  new Stock())

const defaultElement = document.querySelector('#accounts')
const utils = new Utils()

ui.Init(defaultElement)
