export const allActiveUsers = [];

export const activeUsers = () => {
    return {status: true, response: allActiveUsers}
};

export const takeOutUser = (code) => {
    if (!code) {
        return {status: false, message: "O código de entrada do usuário é obrigatório."}
    }

    const codeIndex = allActiveUsers.findIndex(object => object.code === code);

    if (codeIndex === -1) {
        return {status: false, message: `Usuário '${code}' não encontrado.`}
    }

    const removedUser = allActiveUsers.splice(codeIndex, 1)[0];

    return {status: true, message: `Usuário '${removedUser.code}' removido com sucesso.`}
};