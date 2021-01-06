const form  = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// show input error message
function showError(input,message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//  show input success message
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success'; 
}

// check if email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input);
    }else{
        showError(input,'Email is not valid');
    }
  }

//   check password match
function checkPasswordMatch(input1,input2){
    if(input.value !== input.value){
        showError(input);
    }else{
        showSuccess(input2,'Paswords do not match');
    }
}

// check required fields
function checkRequired(inputArr){
    let isRequired = false;
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input,`${getFieldName(input)} is required`);
            isRequired = true;
        }else{
            showSuccess(input);
        }
    })
    return isRequired;
}

// check length
function checkLength(input,min,max){
    if(input.value.length < min){
        showError(input,`${getFieldName(input)} must be at least ${min} characters long`)
    }else if(input.value.length > max){
        showError(input,`${getFieldName(input)} must be less than ${max} characters`)
    }else{
        showSuccess(input);
    }
}

// get field name
function getFieldName(input){
    return input.id.charAt(0).toUpperCase()+input.id.slice(1);
}

// event listeners
form.addEventListener('submit',function(e){
    e.preventDefault();
    
    if(!checkRequired([username,email,password,password2])){
        checkLength(username, 3 , 10);
        checkLength(password, 6 , 15);
        checkEmail(email);
        checkPasswordMatch(password,password2);
    }
    
    
})