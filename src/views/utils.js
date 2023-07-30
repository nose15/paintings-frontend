function validateEmail(email) {
    if (email.length > 0) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regex.test(email)) {
            return true;
        }
        return "Niepoprawny adres email";
    }
    return "";
}

function validateName(name) {
    if (name.length > 0) {
        return true;
    }
    return "Wypełnij to pole";
}

function validatePassword(password) {
    return {
        hasUpper: hasUpperLetters(password),
        hasLower: hasLowerLetters(password),
        hasNumbers: hasNumber(password),
        hasSpecial: hasSpecialCharacter(password),
        lengthOk: isLongEnough(password)
    }
}

function isLongEnough(password) {
    return password.length >= 8 && password.length <= 30;
}

function hasUpperLetters(password) {
    return password.toLowerCase() != password;
}

function hasLowerLetters(password) {
    return password.toUpperCase() != password;
}

function hasNumber(password) {
    const regex = /\d/
    return regex.test(password);
}

function hasSpecialCharacter(password) {
    const regex = /[ `!@#$%^&*]/
    return regex.test(password);
}

export { validateEmail, validateName, validatePassword };