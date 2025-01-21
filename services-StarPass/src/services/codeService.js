const gate1Codes = [];
const gate2Codes = [];
const gate3Codes = [];

export const generateCode = (gate) => {
    let newCode;
    do {
        newCode = Math.floor(1000 + Math.random() * 9000).toString();
    } while ([...gate1Codes, ...gate2Codes, ...gate3Codes].includes(newCode));

    if (gate === "1") gate1Codes.push(newCode);
    if (gate === "2") gate2Codes.push(newCode);
    if (gate === "3") gate3Codes.push(newCode);

    return newCode;
};

export const validateCode = (gate, code) => {
    let isValid = false;

    switch (gate) {
        case "1":
            isValid = gate1Codes.includes(code);
            break;
        case "2":
            isValid = gate2Codes.includes(code);
            break;
        case "3":
            isValid = gate3Codes.includes(code);
            break;
        default:
            return false;
    }

    if (isValid) {
        switch (gate) {
            case "1":
                gate1Codes.splice(gate1Codes.indexOf(code), 1);
                break;
            case "2":
                gate2Codes.splice(gate2Codes.indexOf(code), 1);
                break;
            case "3":
                gate3Codes.splice(gate3Codes.indexOf(code), 1);
                break;
        }
    } else {
        return false;
    }

    return true;
};

export const gateCodes = (gate) => {
    let codes;

    switch (gate) {
        case "1":
            codes = gate1Codes;
            break;
        case "2":
            codes = gate2Codes;
            break;
        case "3":
            codes = gate3Codes;
            break;
        default:
            return null;
    }

    return codes;

};