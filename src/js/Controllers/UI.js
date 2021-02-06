import { Customer } from "../Models/Customer.js";
import { AddMember } from "../ViewModels/AddMember.js";
export class UI {
  _rootElement = null
  eventHandlers = {}
  accounts
  fieldSets = null
  memberViewModel = new AddMember()

  pages = []
  accountsInputs = {
    accounts: [],
    sales: [],
    items: [],
    reports: []
  }

  constructor(rootElement) {
    this._rootElement = rootElement

    this.eventHandlers.click = this.click
    this.eventHandlers.input = this.input
    this.accounts = []
  }

  Init(def) {
    this.fieldSets = this._rootElement.querySelectorAll('fieldset')
    this.fieldSets.forEach(x => {
      this.AffectElement(x, "css", "hide", true)
    })

    this.GetInputs("#accounts", "accounts")
    this.GetInputs("#sales", "sales")
    this.GetInputs("#sales", "sales")
    this.GetInputs("#reports", "reports")
    this.GetPages(document.querySelectorAll("li"))

    this.SetAttributesMulti("input", "autocomplete", "no")
    // this.SetAttributesMulti("input", "required", "")

    this.AffectElement(def, "css", "show", true)

    this._rootElement.addEventListener('click', ev => {
      this.Process(ev)
    })

    this._rootElement.addEventListener('input', ev => {
      this.Process(ev)
    }
    )
    this._rootElement.addEventListener('submit', ev => {
      this.Process(ev)
    })
  }

  Process(ev) {
    if(this.pages.indexOf(ev.target.id) === -1 && ev.type !== 'submit' && ev.type !== 'input') return
    
    switch (ev.type) {
      case 'submit':
        ev.preventDefault()
        this.accounts.push(new Customer(this.memberViewModel))
        this.memberViewModel.Reset()
        console.log(this.accounts)

        break;

        case 'click':
        document.querySelectorAll('fieldset').forEach(x => this.AffectElement(x, 'css', 'hide', true))

        let tmpElement = document.getElementById(ev.target.dataset.target)

        if (ev.target.dataset.target) {
          this.AffectElement(tmpElement, "css", "show", true)
        }
        break;

        case 'input':
          this.memberViewModel[ev.target.id] = ev.target.value
          break;
    }
  }

  GetInputs(par, grp) {
    let parentEl = document.querySelector(par)
    let tmpEls = parentEl.querySelectorAll("input")
    this.accountsInputs[grp].push(tmpEls)
  }

  GetPages(els) {
    this.FindChildByType(els, 'button')
  }

  FindChildByType(nodeList, type) {
    nodeList.forEach(x => {
      if(x.children[0].nodeName.toUpperCase() === 'BUTTON') {
        this.pages.push(x.children[0].id)
      }
    })
  }

  SetAttribute(elem, att, val) {
    elem.SetAttribute(att, val)
  }

  SetAttributesMulti(grp, att, val="") {
    document.querySelectorAll(grp).forEach(x => x.setAttribute(att, val))
  }

  AffectElement(el, type, effect, mode = true) {
    el.classList = ""
    this._effectType[type](el, effect, mode)
  }

  _effectType = {
    css: (el, val, mode) => mode ? this._affectMode['addClass'](el, val) : this._affectMode['removeClass'](el, val),
    attribute: (el, val, mode) => console.log(`Attribute function being executed.`)
  }

  _affectMode = {
    addClass: (el, val) => el.classList.add(val),
    removeClass: (el, val) => el.classList.remove(val),
  }

}