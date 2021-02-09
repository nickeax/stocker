import { UI } from './Controllers/UI.js'
import { Account } from './Controllers/Account.js'
import { Order } from "./Controllers/Order.js"
import { Stock } from "./Controllers/Stock.js";

import { DAL } from "./data/DAL.js";

import { Utils } from './Utils/Utils.js'
import { AddMember } from "./ViewModels/AddMember.js"
import { AddStock } from "./ViewModels/AddStock.js";
import { VMM } from './ViewModels/ViewModelManager.js'

const UTILS = new Utils()
const viewModelManager = new VMM()
const DL = new DAL()

const ui = new UI(document.querySelector('#ui'),
  new AddMember(viewModelManager),
  new AddStock(viewModelManager),
  UTILS,
  new Account(UTILS, DL),
  new Stock(UTILS, DL),
  new Order(UTILS, DL))

const defaultElement = document.querySelector('#stock')

ui.Init(defaultElement)
