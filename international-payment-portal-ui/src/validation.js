export const patterns = {
    amountPattern: /^[0-9]+(\.[0-9]{1,2})?$/,
    swiftPattern: /^[A-Z]{6}[A-Z0-9]{2,5}$/,
    accountPattern: /^\d{8,12}$/,
    namePattern: /^[A-Za-z\s]+$/,
    idPattern: /^\d{13}$/, // SA ID
    passwordPattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
};

export function validateInput(value, type) {
    const pattern = patterns[type];
    return pattern ? pattern.test(value) : false;
};
