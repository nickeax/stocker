export class UI {
  utils
  _rootElement = null
  eventHandlers = {}
  _controllers = {}
  fieldSets = null
  memberViewModel
  pages = []
  accountsInputs = {
    accounts: [],
    sales: [],
    items: [],
    reports: []
  }

  constructor(rootElement, vm, ut, acc, stk, ord) {
    this._controllers['account'] = acc
    this._controllers['stock'] = stk
    this._controllers['order'] = ord
    this._rootElement = rootElement
    this.utils = ut
    this.memberViewModel = vm
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
    if (this.pages.indexOf(ev.target.id) === -1 && ev.type !== 'submit' && ev.type !== 'input') return

    switch (ev.type) {
      case 'submit':
        // Send ViewModel to Account controller for checking
        // IF successful, clear fields of selected form and reset ViewModel
        // ELSE highlight the entries that need amending and try again
        ev.preventDefault()
        let res = this._controllers[this.GetController(ev.submitter.id)][this.GetAction(ev.submitter.id)](this.memberViewModel)
        if (res.length > 0) { // FAILED
          res.forEach(x => {
            let field = document.getElementById(x.field)
            field.classList.add("fieldWarning")
            field.value = ""
            field.placeholder = x.message
          })
          this.Popup('warning', "Please check that all fields contain the correct information")

        } else {
          this.Popup('success', `Member ${this.memberViewModel.fName} was successfully added`)
          this.memberViewModel.Reset()
          this.ClearForm(ev.target.id)
        }
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

  GetController(str) {
    if (str) return str.split('-')[0]
  }

  GetAction(str) {
    if (str) return str.split('-')[1]
  }

  GetInputs(par, grp) {
    let parentEl = document.querySelector(par)
    let tmpEls = parentEl.querySelectorAll("input")
    this.accountsInputs[grp].push(tmpEls)
  }

  GetPages(els) {
    this.FindChildByType(els, 'button')
  }

  ClearForm(frm) {
    const form = document.querySelector(`#${frm}`)
    form.querySelectorAll("input").forEach(x => {
      x.value = ""
      x.classList.remove("fieldWarning")
    })
  }

  FindChildByType(nodeList, type) {
    nodeList.forEach(x => {
      if (x.children[0].nodeName.toUpperCase() === 'BUTTON') {
        this.pages.push(x.children[0].id)
      }
    })
  }

  SetAttribute(elem, att, val) {
    elem.SetAttribute(att, val)
  }

  SetAttributesMulti(grp, att, val = "") {
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

  Popup(type, msg) {
    let pu = document.createElement("div")
    pu.innerHTML = `<span class="${type}">${msg}</span>`
    
    switch (type) {
      case "success":
        pu.classList.add("popupSuccess")
        break
      case "warning":
        pu.classList.add("popupWarning")
        break
      case "error":
        pu.classList.add("popupError")
        break
    }

    document.getElementById("ui").appendChild(pu)
    
    pu.classList.remove('clear')
    
    setTimeout(() => {
      pu.classList.add("clear")
    }, 2500);
    document.getElementById("ui").appendChild(pu)
    setTimeout(() => {
      document.getElementById("ui").removeChild(pu)
    }, 3500);
  }
}