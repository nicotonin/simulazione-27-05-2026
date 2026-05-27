"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserDTO = void 0;
const class_validator_1 = require("class-validator");
class AddUserDTO {
}
exports.AddUserDTO = AddUserDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'FirstName should not be empty or just spaces' }),
    (0, class_validator_1.Matches)(/^[A-Za-z\s]+$/, { message: 'FirstName must only contain letters and spaces' })
], AddUserDTO.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'LastName should not be empty or just spaces' }),
    (0, class_validator_1.Matches)(/^[A-Za-z\s]+$/, { message: 'LastName must only contain letters and spaces' })
], AddUserDTO.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)()
], AddUserDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], AddUserDTO.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8
    })
], AddUserDTO.prototype, "password", void 0);
