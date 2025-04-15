const {writeFileSync} = require('node:fs')
const names = require('./names.json')

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const randomName = () => {
  return names[getRandomInt(names.length)];
}

const randomFullName = () => {
  return randomName()+' '+randomName()
}

const getRandomInitial = () => {
  return randomName().substring(0,1)
}

const randomPassword = (name) => {
  let password;

  if(name.split(' ')[0].length < 5) {
    password = name.split(' ')[0];
  } else {
    password = name.substring(0,5)
  }

  return password.toLowerCase() + getRandomInt(121);
}

const generateStudent = () => {
  const name = randomFullName()
  return {name: name, password: randomPassword(name)};
}

let users = []

for(let i= 0; i < 400; i++) {
  users.push(generateStudent())
}

writeFileSync('./users.json',JSON.stringify(users))



