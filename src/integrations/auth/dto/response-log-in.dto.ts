import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/modules/users/entities/user.entity";

export class ResponseLogInDto {
    @ApiProperty()
    token: string;

    @ApiProperty()
    user: User;
}