import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";
import { User } from "src/modules/users/entities/user.entity";

export type DeviceDocument = Device & Document;

export enum DevicePlatform {
    IOS,
    ANDROID,
    WEB,
    WINDOWS,
    MACOS,
    LINUX,
    EMAIL,
    SMS
}

@Schema()
export class Device {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    })
    user: User;

    @ApiProperty()
    @Prop({
        type: String,
        maxlength: 256,
    })
    name: string;

    @ApiProperty({})
    @Prop({
        type: Number
    })
    platform: DevicePlatform;

    @ApiProperty({
        type: String,
        maxLength: 256
    })
    token: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);