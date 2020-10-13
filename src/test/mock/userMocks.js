exports.token = {
    admin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjAyNzg3MjM2LCJleHAiOjE2MTA1NjMyMzZ9.8rqcIFLjL1bICvBTVmqyXBUI2jwgS5hJpQS-pNXwhRE",
    operator: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAyNzY4MTI2LCJleHAiOjE2MTA1NDQxMjZ9.dUgTrvRha8iW8qa5o9YjkcVwMx-3gs-l4zwkL7rfD5c",
    NotCorrect: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjAyNTkyMzU1LCJleHAiOjE2MTAzNjgzNTV9.jaTYL-S7lkBdrsG-_tVYwzVxwjj4ClevfbC14UNdjrw`
}
exports.NotExistEmail = {
    email: "ncuti@gmail.com",
    role: "operator"
}
exports.isNotInSystem = {
    email: "ncuti@gmail.com",
    password:"password",
    confirmPassword:"password"
}
exports.InvalidEmail = {
    email: "ncutigmail.com"
}
exports.requiredRole = {
    email: "emmanuelnkubito2@gmail.com"
}

exports.roleNotIncluded = {
    email: "emmanuelnkubito2@gmail.com",
    role: "pointer"
}

exports.rightInput = {
    email: "emmanuelnkubito2@gmail.com",
    role: "operator"
}

exports.requiredEmail = {
    role: "pointer"
}

exports.rightEmail ={
    email: "emmanuelnkubito2@gmail.com"
}

exports.invalidPassword ={
    password: "asd"
}
exports.shortPassword ={
    email:"emmanuelnkubito2@gmail.com",
    password: "asd"
}
exports.validPasswords ={
    password: "password",
    confirmPassword: "password"
}
exports.unMatchedPasswords ={
    password: "password",
    confirmPassword: "passwordryus"
}
exports.confirmPassword ={
    confirmPassword: "password"
}
exports.emptyconfirmPassword ={
    password:"password",
    confirmPassword: ""
}
exports.emptyPassword ={
    email:"emmanuelnkubito2@gmail.com",
    password:""
 }
exports.emptyEmail ={
   email:""
}
 exports.isNotRegistared ={
    email:"karigirwa@yahoo.fr"
 }
 exports.correctInfo = {
    email: "admin@phantom.com",
    password:"admin"
 }
 exports.inCorrectInfo = {
    email: "emmanuelnkubito2@gmail.com",
    password:"adminds"
 }
