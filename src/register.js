const name = document.querySelector("#first_name, #last_name")
const email = document.querySelector("#email")
const pass = document.querySelector("#password")
const cpass = document.querySelector("#confirm_password")
const visiblity_j = document.querySelector("#s");
const visiblity = document.querySelector("#r");
const form = document.querySelector("form");
const error = document.querySelector(".err_msg");
const special_chars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', ',', '.', '?', '"', ':', '{', '}', '|', '<', '>'];
const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const printables = ['!', '#', '$', '%', '&', "'", '*', '+', '-', '/', '=', '?', '^', '_', '`', '{', '|', '}', '~']
const userData = []

let nameInput 
let emailInput 
let passInput 
let cpassInput 


let validemail = false
let validPassword = false
let passwordMatch = false
let validForm =false
let validName = false

visiblity.addEventListener('click', function(){
    console.log('click')
    if (pass.type === 'text') {
        pass.type = 'password';
        visiblity.textContent = "visibility_off"
    }
    else{
        pass.type = 'text'
        visiblity.textContent = "visibility"
    }
})

visiblity_j.addEventListener('click', function(){
    console.log('click')
    if(cpass.type === 'text'){
        cpass.type = 'password';
        visiblity_j.textContent = "visibility_off"
    }
    else{
        cpass.type = 'text'
        visiblity_j.textContent = "visibility"
    }
})



function validateName(event){
    nameInput = event.target.value
    if(nameInput.length<3){
        validName = false
        error.textContent = "Your name should be atleast 3 characters long"
    } else{
        validName = true
        error.textContent = ""
    }
}

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
// map, find, filter,   
}

function PasswordMatch(event){
    cpassInput = event.target.value
    if (cpassInput === passInput) {
        passwordMatch = true
        error.textContent = ""
    }
    else{
        passwordMatch = false
        error.textContent = "Passwords do not match"
    }
}

function validateEmail(event){
    emailInput = event.target.value
    const AsciiGraphic = [uppercase + lowercase + numbers + printables]
    const arrayAscii = AsciiGraphic[0].split(",");
    const Arrayemail = emailInput.split("")
    const emailArray = emailInput.split('@')
    let localPart = emailArray[0]
    let domain = emailArray[1]
    const Atarray = Arrayemail.filter((item)=> item === "@")
    let asciiExist = Arrayemail.some((item)=> arrayAscii.includes(item))


    if(Arrayemail.indexOf("@") == 0 || Arrayemail.indexOf('@') >=emailInput.length-1){
        console.log("The index of @ is invalid")
        validemail = false;
    }

    if(Atarray.length != 1){
        console.log("Only one @ is allowed")
        validemail = false;
    }
    
    if(localPart.length>64){
        console.log("Email is too long");
        validemail = false;
    }

    if(localPart.startsWith('"') && localPart.endsWith('"')){
        localPart = localPart.slice(1, -1);
        for (let i = 0; i < localPart.length; i++) {
            const char = localPart.charAt(i);
            if (char === '\\') {
                const nextChar = localPart.charAt(i + 1);
                if (!(nextChar === '\t' || nextChar === ' ' || asciiExist)) {
                  // Skip the next character since it is a quoted-pair
                  i++;
                  console.log("");
                  validemail = false;
                } 
            }
            else if (!asciiExist && char !== ' ') {
                validemail = false;
            }
        }
    } else{
        for (let i = 0; i < localPart.length; i++) {
            const char = localPart.charAt(i);
            if (!asciiExist) {
                console.log("If the character is not AsciiGraphic then, invalid email");
                validemail = false;
            }
        }
    }

    
    // Check if . exists
    if(domain.indexOf('.') == -1){
        console.log("Dot not found");
        validemail = false;
    }
    
    if(domain.startsWith("-") || domain.endsWith("-")){
        console.log("Email cannot start nor end with a hyphen")
        validemail = false;
    }

    if(domain.includes("_")){
        console.log("Underscore is not allowed in domain")
        validemail = false;
    }
    
    if(emailInput.startsWith('.') || emailInput.endsWith('.')) {
        console.log("Only one . is allowed")
        validemail = false;;
    }

    else{
        console.log("");
        validemail = true;
    }
}

function validateForm(event){
    event.preventDefault();
    if (!nameInput || !passInput || !emailInput || !cpassInput) {
        alert("Fill in all the fields");
    }
    if(validName === true && validemail === true && validPassword === true && passwordMatch === true){
        form.submit();
        error.textContent = ""
        validForm = true;
    } else{
        validForm = false;
        alert("Name or password or email is invalid");
    }
}