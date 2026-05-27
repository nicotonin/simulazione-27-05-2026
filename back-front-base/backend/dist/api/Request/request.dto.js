"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRequestDTO = exports.CreateRequestDTO = void 0;
const class_validator_1 = require("class-validator");
class CreateRequestDTO {
}
exports.CreateRequestDTO = CreateRequestDTO;
__decorate([
    (0, class_validator_1.IsDateString)()
], CreateRequestDTO.prototype, "dataInizio", void 0);
__decorate([
    (0, class_validator_1.IsDateString)()
], CreateRequestDTO.prototype, "dataFine", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)()
], CreateRequestDTO.prototype, "categoriaId", void 0);
class UpdateRequestDTO {
}
exports.UpdateRequestDTO = UpdateRequestDTO;
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)()
], UpdateRequestDTO.prototype, "dataInizio", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)()
], UpdateRequestDTO.prototype, "dataFine", void 0);
