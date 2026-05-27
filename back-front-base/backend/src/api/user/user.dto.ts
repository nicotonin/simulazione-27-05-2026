import { IsIn, IsString } from "class-validator";

export class QueryListUserDTO {
    @IsString()
    @IsIn(['role1', 'role2'])
    role: string;
} 