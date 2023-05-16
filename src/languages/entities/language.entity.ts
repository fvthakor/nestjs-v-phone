import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type LanguageDocument = HydratedDocument<Language>;

@Schema({
    timestamps: true,
})
export class Language {
    @ApiProperty({ example: 'Gujarati', description: 'The name of the Language' })
    @Prop()
    name: string;

    @Prop({type: Number, min: 0, max: 1,default: 0})
    is_deleted: Number
}

const LanguageSchema = SchemaFactory.createForClass(Language);

export { LanguageSchema };
