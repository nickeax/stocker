export class Utils {
  ALPHANUM = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  PATTERN = "xxx-xxxx-xxxx"
  RandomRange(lower, upper) {
    return Math.floor((Math.random() * upper - lower) + lower)
  }

  GUID(pattern) {
    let patternArr = pattern.split('-')
    let tmpArr = []

    patternArr.forEach((x, i) => {
      let tmp = ""
      for(let j = 0; j < x.length; j++) {
        tmp += this.ALPHANUM[this.RandomRange(0, this.ALPHANUM.length)].toUpperCase()
      }
      
      tmpArr.push(tmp)
    })
    return tmpArr.join('-')
  }
}