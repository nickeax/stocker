export class UI {
  _rootElement = null
  eventHandlers = {}
  fieldSets = null
  pages = []

  constructor(rootElement) {
    this._rootElement = rootElement

    this.eventHandlers.click = this.click
    this.eventHandlers.input = this.input
  }

  Init(def) {
    this.fieldSets = this._rootElement.querySelectorAll('fieldset')
    this.fieldSets.forEach(x => {
      this.AffectElement(x, "css", "hide", true)
    })

    this.GetPages(document.querySelectorAll("li"))

    this.AffectElement(def, "css", "show", true)

    this._rootElement.addEventListener('click', ev => {
      this.Process(ev)
    })

    this._rootElement.addEventListener('input', ev => {
      this.Process(ev)
    })
  }

  Process(ev) {
    ev.preventDefault()
    console.log(this.pages.indexOf(ev.target.id))
    if(this.pages.indexOf(ev.target.id) === -1) return
    
    switch (ev.type) {
      case 'click':
        document.querySelectorAll('fieldset').forEach(x => this.AffectElement(x, 'css', 'hide', true))

        let tmpElement = document.getElementById(ev.target.dataset.target)

        if (ev.target.dataset.target) {
          this.AffectElement(tmpElement, "css", "show", true)
        }

        break;
    }
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
    console.log(this.pages)
  }

  SetAttribute(elem, att, val) {
    elem.SetAttribute(att, val)
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