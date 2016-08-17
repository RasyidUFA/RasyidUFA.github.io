
function validEmail(email) { // see:
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	return re.test(email);
}
// get all data in form and return object
function getFormData() {
	var elements = document.getElementById("gform").elements; // all form elements
	var fields = Object.keys(elements).map(function(k) {
		if(elements[k].name !== undefined) {
			return elements[k].name;
		}
		}).filter(function(item, pos, self) {
		return self.indexOf(item) == pos && item;
	});
	var data = {};
	fields.forEach(function(k){
		data[k] = elements[k].value;
	});
	console.log(data);
	return data;
}

function handleFormSubmit(event) {  // handles form submit withtout any jquery
	event.preventDefault();           // we are submitting via xhr below
	var data = getFormData();         // get the values submitted in the form
	if( !validEmail(data.email) ) {   // if email is not valid show error
		document.getElementById('email-invalid').style.display = 'block';
		return false;
		} else {
		var url = event.target.action;  //
		var xhr = new XMLHttpRequest();
		xhr.open('POST', url);
		// xhr.withCredentials = true;
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = function() {
			console.log( xhr.status, xhr.statusText )
			console.log(xhr.responseText);
			document.getElementById('gform').style.display = 'none'; // hide form
			document.getElementById('thankyou_message').style.display = 'block';
			return;
		};
		// url encode form data for sending as post data
		var encoded = Object.keys(data).map(function(k) {
			return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
		}).join('&')
		xhr.send(encoded);
	}
}
function loaded() {
	console.log('contact form submission handler loaded successfully');
	// bind to the submit event of our form
	var form = document.getElementById('gform');
	form.addEventListener("submit", handleFormSubmit, false);
};
document.addEventListener('DOMContentLoaded', loaded, false);

function checkform(theform){
	var why ="";
	
	if(theform.txtInput.value ==""){
		why += "- You have to enter human verification.n";
	}
	if(theform.txtInput.value != ""){
		if(ValidCaptcha(theform.txtInput.value) == false){
			why += "- Wrong answer.n";
		}
	}
	if(why != ""){
		alert(why);
		return false;
	}
}

//Generates the captcha function
var a = Math.ceil(Math.random() * 9)+ "";
var b = Math.ceil(Math.random() * 9)+ "";
var c = Math.ceil(Math.random() * 9)+ "";
var d = Math.ceil(Math.random() * 9)+ "";
var e = Math.ceil(Math.random() * 9)+ "";

var code = a + b + c + d + e;
document.getElementById('txtCaptcha').value = code;
document.getElementById('txtCaptchaDiv').innerHTML = code;

// Validate the Entered input aganist the generated security code function
function ValidCaptcha(){
	var str1 = removeSpaces(document.getElementById('txtCaptcha').value);
	var str2 = removeSpaces(document.getElementById('txtInput').value);
	if (str1 == str2){
		return true;
		}else{
		return false;
	}
}

// Remove the spaces from the entered and generated code
function removeSpaces(string){
	return string.split(' ').join("");
} 