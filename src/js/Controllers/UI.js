export class UI {
  utils
  _rootElement = null
  eventHandlers = {}
  _controllers = {}
  _viewModels = {}
  _exludeList = []
  fieldSets = null
  _viewModel
  pages = []
  _eventTypes = ['click', 'input', 'submit', 'BuildList-order']
  _customEvents = ['BuildList-order']
  uiInputs = {
    account: [],
    order: [],
    stock: [],
    report: []
  }

  constructor(rootElement, addMember, addStock, ut, acc, stk, ord) {
    this._rootElement = rootElement
    this._viewModels['stock'] = addStock
    this._viewModels['account'] = addMember
    this.utils = ut
    this._labelsRefs = []
    this._exludeList = ['required', 'val', 'controller', 'action', '_manager']
    this._controllers['account'] = acc
    this._controllers['stock'] = stk
    this._controllers['order'] = ord

    this._viewModel = ""
    this.eventHandlers.click = this.click
    this.eventHandlers.input = this.input

    this.displayDataEvent = new Event('BuildList-order')
  }

  Init(def) {
    this.fieldSets = this._rootElement.querySelectorAll('fieldset')
    this.fieldSets.forEach(x => {
      this.AffectElement(x, "css", "hide", true)
    })

    this.GetInputs("#stock", "stock")
    this.GetInputs("#account", "account")
    this.GetInputs("#order", "order")
    this.GetInputs("#report", "report")
    this.GetPages(document.querySelectorAll("li"))
    this.GetLabels()

    this.SetAttributesMulti("input", "autocomplete", "no")
    // this.SetAttributesMulti("input", "required", "")

    this.AffectElement(def, "css", "show", true)

    this._eventTypes.forEach(x => {
      this._rootElement.addEventListener(x, ev => {
        this.Process(ev)
      })
    })

  }

  Process(ev) {
    if (this.pages.indexOf(ev.target.id) === -1 &&
      this._eventTypes.indexOf(ev.type) === -1 &&
      this._customEvents.indexOf(ev.type) === -1)
      return this._viewModel = this._viewModels[this.GetController(ev.target.id)]

    // console.log("PST: ", ev)

    switch (ev.type) {
      case 'submit':
        ev.preventDefault()
        this._viewModel = this._viewModels[this.GetController(ev.submitter.id)]
        this._viewModel.controller = this.GetController(ev.submitter.id)
        this._viewModel.action = this.GetAction(ev.submitter.id)
        let res = this._controllers[this.GetController(ev.submitter.id)][this.GetAction(ev.submitter.id)](this._viewModel)

        switch (this._viewModel.action) {
          case "Add":
            if (res.length > 0) { // FAILED
              res.forEach(x => {
                let field = document.getElementById(x.field)
                field.classList.add("fieldWarning")
                field.value = ""
                field.placeholder = x.message
              })
              this.Popup('warning', `The following were incorrect: ${this.ResultsString(res)}`)

            } else {
              this.Popup('success', this.ResultMessage(this._viewModel) + " successfully added.")
              this._viewModel.Reset()
              this.ClearForm(ev.target.id)
            }
            break;
          case "GetAll":
            console.table(res)
          default:
            break;
        }

        break;

      case 'click':
        // Check for click event that references a form/page title
        if (this.pages.indexOf(ev.srcElement.id) !== -1) {
          document.querySelectorAll('fieldset').forEach(x => this.AffectElement(x, 'css', 'hide', true))

          let tmpElement = document.getElementById(ev.target.dataset.target)

          if (ev.target.dataset.target) {
            this.AffectElement(tmpElement, "css", "show", true)
          }
        }

        // Check for UI interaction requiring other actions
        // Process data attributes
        if (ev.target.dataset && ev.target.dataset.click) {
          const evt = ev.target.dataset
          let res = []

          let controller = this.GetController(evt.click)
          let action = this.GetAction(evt.click)

          let vm = this._viewModels[controller]
          vm.action = action
          vm.controller = controller

          res = this._controllers[controller][action](vm)

          switch (ev.target.localName) {
            case 'select':
              if (ev.target.childNodes.length > 0) this.utils.RemoveChildren(ev.target)

              let tmpOptionDefault = document.createElement('option')

              tmpOptionDefault.textContent = ` - SELECT - `
              tmpOptionDefault.setAttribute('value', "")
              ev.target.appendChild(tmpOptionDefault)

              res.sort((a, b) => {
                if (a.fName < b.fName) return -1
                return 1
              }).forEach(x => {
                  let tmpOption = document.createElement('option')
                  tmpOption.textContent = `${x.fName} ${x.lName}`
                  tmpOption.setAttribute('value', x.ID)
                  ev.target.appendChild(tmpOption)
                })

              // Set the first Option to be selected by default
              tmpOptionDefault.setAttribute('selected', true)

              break
          }
        }

        break;

      case 'input':
        // Populate viewmodel with data from input event
        this.GetViewModelFromInputEvent(ev)
        if (!this._viewModel) {
          this._viewModel = this._viewModels[this.GetController(ev.target.dataset.click)]
        }
        this._viewModel[ev.target.id] = ev.target.value
        console.log("Add Input Value: ", ev.target.id, ev.target.value)
        console.table(this._viewModel)
        break;
    }
  }

  GetLabels() {
    this._rootElement.querySelectorAll('label').forEach(x => {
      this._labelsRefs.push({ id: `${x.getAttribute('for')}`, text: `${x.innerText.trim()}` })
    })
  }

  ResultsString(r) {
    let text = []
    r.forEach(x => {
      text.push(`<span class="errorItems">${this._labelsRefs.find(y => y.id === x.field).text}</span>`)
    })

    return text.join(', ') + "."
  }

  ResultMessage(vm) {
    let message = "Parts "

    let filtered = Object.keys(vm).filter(x => this._exludeList.indexOf(x) === -1)
    console.log(filtered)

    filtered.forEach(x => {
      message += `<span class="successItems">${this._labelsRefs.find(y => y.id === x).text}: ${vm[x]}</span> `
    })

    return message
  }

  GetController(str) {
    if (str) return str.split('-')[0]
  }

  GetViewModelFromInputEvent(e) {
    e.path.forEach(x => {
      let ind = Object.keys(this._viewModels).indexOf(x.id)
      if (ind !== -1) this._viewModel = this._viewModels[x.id]
    })
  }

  GetAction(str) {
    if (str) return str.split('-')[1]
  }

  GetInputs(par, grp) {
    let parentEl = document.querySelector(par)
    let tmpEls = parentEl.querySelectorAll("input")
    this.uiInputs[grp].push(tmpEls)
    this._viewModel = this._viewModels[grp]
  }

  GetPages(els) {
    this.FindChildByType(els, 'button')
  }

  ClearForm(frm) {
    const form = document.querySelector(`#${frm}`)
    form.querySelectorAll("input").forEach(x => {
      x.value = ""
      x.placeholder = ""
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
    }, 4500);
    document.getElementById("ui").appendChild(pu)
    setTimeout(() => {
      document.getElementById("ui").removeChild(pu)
    }, 5500);
  }
}