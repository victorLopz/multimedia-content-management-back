import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContentDocument = HydratedDocument<Content>;

@Schema()
export class Content {
  @Prop()
  name: string;

  @Prop()
  front_page_url: string;

  @Prop()
  img: string;

  @Prop()
  url_video: string;

  @Prop()
  url_doc_txt: string;

  @Prop()
  credits: string;

  @Prop()
  theme: string;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

  constructor() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export const ContentSchema = SchemaFactory.createForClass(Content);
