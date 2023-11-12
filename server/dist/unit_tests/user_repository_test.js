"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const user_repository_1 = require("../repository/implementations/user_repository");
//import DataAccess from "../db/data_access";
function userRepositoryCreatesEntity() {
    return __awaiter(this, void 0, void 0, function* () {
        // DataAccess.connect();
        let userRepository = new user_repository_1.UserRepository();
        const userToCreate = {};
        userToCreate.username = faker_1.faker.internet.userName();
        userToCreate.email = faker_1.faker.internet.email();
        userToCreate.password = faker_1.faker.internet.password();
        console.log(userToCreate.username);
        console.log(userToCreate.email);
        console.log(userToCreate.password);
        let result = yield userRepository.create(userToCreate);
        console.log(result);
    });
}
userRepositoryCreatesEntity();
//# sourceMappingURL=user_repository_test.js.map