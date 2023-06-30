import { Prop, SchemaFactory,Schema } from "@nestjs/mongoose";
import mongoose, { HydratedDocument} from "mongoose";
import { User } from "./users.schema";

export type CommentDocument =  HydratedDocument<Comment>;

@Schema()
export class Comment extends Document {
    @Prop()
    title:string;
    @Prop()
    comment:string;
    @Prop({ type: mongoose.Schema.Types.String, ref: 'User' }) 
    username: User; 
}
export const CommentSchema = SchemaFactory.createForClass(Comment);