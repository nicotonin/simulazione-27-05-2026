"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const validation_middleware_1 = require("../../lib/validation-middleware");
const user_dto_1 = require("./user.dto");
const router = (0, express_1.Router)();
router.get('/', (0, validation_middleware_1.validate)(user_dto_1.QueryListUserDTO, 'query'), user_controller_1.listUsers);
exports.default = router;
