import { activeUsers, takeOutUser } from "../services/userService.js";

export const getActiveUsers = (req, res) => {
    const result = activeUsers();

    const currentActiveUsers = result.response;

    return res.status(200).json({
        currentActiveUsers
    })

};

export const exitPark = (req, res) => {
    const { code } = req.body;

    const exitingUser = takeOutUser(code);

    if(!exitingUser.status) return res.status(400).json({message: exitingUser.message})

    return res.status(200).json({message: exitingUser.message})

};