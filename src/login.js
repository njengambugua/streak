let pass = document.querySelector("#psw");
const username = document.querySelector("#name");
const visiblity = document.querySelector(".material-icons");
const visiblity_j = document.querySelector("#p");
const visiblity_off = document.querySelector("#r");
const form = document.querySelector("form");
const error = document.querySelector(".err_msg");
const userData = JSON.parse(localStorage.getItem("allUsersData"));
const special_chars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', ',', '.', '?', '"', ':', '{', '}', '|', '<', '>'];
const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

let usernameinput
let passInput = pass.value
let currentUser

let validUsername = false
let validPassword = false
let Login = false

visiblity_off.addEventListener('click', function(){
  console.log('click')
  if (pass.type === 'text') {
      pass.type = 'password';
      visiblity_j.style.cssText = "z-index:1000;"
  }
  else{
      pass.type = 'text'
      visiblity_j.style.cssText = "z-index:0;"
  }
})

visiblity_j.addEventListener('click', function(){
  console.log('click')
  if (pass.type === 'password') {
      pass.type = 'text';
      visiblity_j.style.cssText = "z-index:0;"
  }
  else{
      pass.type = 'password'
      visiblity_j.style.cssText = "z-index:1000;"
  }
})

username.addEventListener("change", (event)=>{
  console.log(event.target.value)

  usernameinput = event.target.value
  if(usernameinput.length > 2 || usernameinput < 16){
    validUsername = true
    error.textContent = ""
  } else{
    validUsername = false
    error.textContent = "Use 6 to 16 characters for username"
  }
})

function validatePassword(event){
  passInput = event.target.value

  var passArray = passInput.split("")
  var special_char_exist = passArray.some((item)=> special_chars.includes(item))
  console.log(special_char_exist);

  var number_exist = passArray.some((item)=> numbers.includes(item))
  console.log(number_exist);

  var uppercase_exist = passArray.some((item)=> uppercase.includes(item))
  console.log(uppercase_exist);

  if(passInput.length>=8){
      validPassword = true
      error.textContent = ""
      if(special_char_exist){
          validPassword = true
          error.textContent = ""
          if(number_exist){
              validPassword = true
              error.textContent = ""
              if(uppercase_exist){
                  validPassword = true
                  error.textContent = ""
              } else{
              validPassword = false
              error.textContent = "Must atleast have one uppercase letter"
              }
          } else{
              validPassword =false
              error.textContent = "Password must have atleast one digit"
          }
      } else{
          validPassword =false
          error.textContent = "Password must have atleast one special character"
      }
  } else{
      validPassword = false
      error.textContent = "Password must have atleast 8 characters"
  } 
}

function validateForm(event){
  event.preventDefault()
  console.log("click")
  if (!usernameinput || !passInput) {
    alert("Fill in all the fields");
  }
  if (validUsername === true && validPassword === true) {
    form.submit()
    error.textContent = ""
    Login = true
  } else{
    Login = false
    alert("Username or password is incorrect");
  }
}