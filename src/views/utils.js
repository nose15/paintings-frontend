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

function validatePhoneNumber(phoneNumber) {
    if (phoneNumber.length == 9) {
        return true;
    }

    return "Niepoprawny numer telefonu";
}

function validateCity(city) {
    if (city.length > 0) {
        return true;
    }

    return "Podaj miasto";
}

function validateHouseNumber(house_number) {
    if (house_number.length > 0) {
        return true;
    }

    return "Podaj numer domu";
}

function validateZipCode(zipCode) {
    const regex = /^[0-9]{2}-[0-9]{3}$/;

    if (regex.test(zipCode)) {
        return true;
    }

    return "Podano błędny kod pocztowy";
}

function validateNip(nip) {
    if (nip.length == 10) {
        return true;
    }
    if (nip.length == 0) {
        return "Proszę podać nip";
    }

    return "Błędny nip"
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

export { validateEmail, validateName, validatePassword, validatePhoneNumber, validateHouseNumber, validateZipCode, validateCity, validateNip };