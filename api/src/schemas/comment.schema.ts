import { Prop, SchemaFactory,Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./users.schema";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    @Prop()
    title:string;
    @Prop()
    comment:string;
    @Prop({ type: mongoose.Schema.Types.String, ref: 'User' }) 
    username: User; 
}
export const CommentSchema = SchemaFactory.createForClass(Comment);