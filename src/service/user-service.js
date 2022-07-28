const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const MailService = require('./mail-service');


class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({email})
        if (candidate) throw new Error(`Пользователь с почтовым адресом${email} уже существует`)

        const hashPassword = await bcrypt.hash(password,3)
        const activateLink = uuid.v4()
        const user = await UserModel.create({email,password:hashPassword,activateLink})
        await MailService.sendActivationMail(email,activateLink);
    }

}

module.exports = new UserService();