// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
  //The function WritePassword + var password + function generatePassword + return password eventually links everything together. 
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//TO DO LIST:
// First attempt to try on this assignment. 
// 1. Separate arrays for numbers, lowercase, uppercase, & special characters. 
// 2. Prompt user for Password length. 
// 3. Assign for a Variable. 
// 4. Confirm password criterias from step 1. (4 varibles TBC on numbers, lowercase, uppercase, & special characters.)
// 5. Build you character array based on the user inputs. (Based on the confirmed.)
// 6. Build password with for loops. & Using the password lengths on each iteration, selects randomly on the character array.
// 7. Return key/password 

function generatePassword() {
  var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  var lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  var uppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  var specialCharacters = ["@", "%", "+", "\\", "/", "'", "!", "#", "$", "^", "?", ":", ",", ")", "(", "}", "{", "]", "[", "~", "-", "_", "."];

  var charArray = [];
  var passwordLength = prompt("What is your password length?");

  if (passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength)) {
    alert("Please enter a valid password length between 8 and 128.");
    return "";
  }

  var hasLower = confirm("Do you want Lower Case?");
  var hasUpper = confirm("Do you want Upper Case?");
  var hasNumber = confirm("Do you want Numbers?");
  var hasSpecial = confirm("Do you want Special Characters?");

  if (!hasLower && !hasUpper && !hasNumber && !hasSpecial) {
    alert("Please select at least one character type.");
    return "";
  }

  if (hasLower) {
    charArray = charArray.concat(lowercase);
  }

  if (hasUpper) {
    charArray = charArray.concat(uppercase);
  }

  if (hasNumber) {
    charArray = charArray.concat(numbers);
  }

  if (hasSpecial) {
    charArray = charArray.concat(specialCharacters);
  }

  var password = "";

  for (var i = 0; i < passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * charArray.length);
    password += charArray[randomNumber];
  }

  return password;
}
// https://www.geeksforgeeks.org/how-to-generate-a-random-password-using-javascript/
// https://dev.to/code_mystery/random-password-generator-using-javascript-6a 
// https://javascript.plainenglish.io/how-to-generate-a-random-password-using-javascript-cbeb4b72ec12