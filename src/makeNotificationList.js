const moment = require('moment')

const notificationList = []

function setCharAt(str,index,chr) {
  if(index > str.length-1) return str;
  return str.substring(0,index) + chr + str.substring(index+1);
}

export const makeAMoment = (text) => {
  const words = text.split(" ")
  const currentDate = new Date()
  let day
  let originalDay
  let time = '00:00:00'
  let minutes = ':00'
  for (let i = 0; i < words.length; i++) {
    if(words[i].includes(":")){
      time = words[i]
    }
    if(words[i].includes("am")){
      const removeLetters = words[i].split('am')
      time = `${removeLetters[0]}:00`
    }
    if(words[i].includes("pm")){
      const removeLetters = words[i].split('pm')
      const secondLetter = removeLetters[0].charAt(1)
      if(!isNaN(secondLetter)){
        const firstLetter = removeLetters[0].charAt(0)
        let aB = firstLetter + secondLetter
        aB = parseInt(aB)
        const e = aB + 12
        const split = removeLetters[0].split(':')
        if(split[1]){minutes = split[1]}
        time = `${e}:${minutes}`
        console.log(`time from pm ${time}`)
      } else {
        console.log(removeLetters[0])
        const numberToChange = removeLetters[0]
        const intNow = parseInt(numberToChange)
        const newNumber = intNow + 12
        const newTime = setCharAt(removeLetters[0], 0, newNumber)
        time = `${newTime}:00`
        console.log(`time from pm ${time}`)
      }
    }
    if(words[i].includes("/")){
      originalDay = words[i]
      const splitDate = words[i].split("/")
      day = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`
    }
    if(words[i].includes("-")){
      originalDay = words[i]
      const splitDate = words[i].split("-")
      day = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`
    }
  }
  if(!day){day = moment(currentDate).format('YYYY-MM-DD'); originalDay = day}
  const myDate = `${day} ${time}`
  console.log(myDate)
  if(moment(myDate).isValid()){
    notificationList.push(moment(myDate))
    if(time === '00:00:00'){
      return`${originalDay} has been added to your notifications!`
    } else {
      return`This Date: ${originalDay} and Time: ${time} has been added to your notifications!`
    }
  } else {
    return `I think you want me to remember ${originalDay}, but it's a little complicated :(`
  }
}