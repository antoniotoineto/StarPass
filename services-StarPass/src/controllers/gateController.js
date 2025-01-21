import { generateCode, validateCode, gateCodes } from "../services/codeService.js";

export const generateEntryCode = (req, res) => {
    const { gate } = req.body;
    if (!["1", "2", "3"].includes(gate)) {
        return res.status(400).json({ error: "Portão inválido. Escolha 1, 2 ou 3." });
    }

    const code = generateCode(gate);
    console.log(`Código gerado para o portão ${gate}: ${code}`);
    return res.status(200).json({ code });
};

export const validateEntryCode = (req, res) => {
    const { gate, code } = req.body;

    const isCodeValid = validateCode(gate, code);

    if (isCodeValid.status){
        //activeUsers.push({ code });

        console.log(`Código ${code} validado no portão ${gate}.`);
        return res.status(200).json({ valid: isCodeValid.status, message: isCodeValid.message });
    } else {
        res.status(401).json({ valid: isCodeValid.status, message: isCodeValid.message });
    }
    
};

export const getGateCodes = (req, res) => {
    const { gate } = req.params;
    
    const codes = gateCodes(gate)

    if(codes.status){
        return res.status(200).json({ gate, codes: codes.response });
    } 

    return res.status(400).json({ error: codes.message });
};
