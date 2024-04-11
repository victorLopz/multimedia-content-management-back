import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ThemeDocument = HydratedDocument<Theme>;

@Schema()
export class Theme {
  @Prop()
  name: string;

  @Prop()
  allow_images: boolean;

  @Prop()
  allow_videos_url: boolean;

  @Prop()
  allow_doctxt_url: boolean;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

  constructor() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export const ThemeSchema = SchemaFactory.createForClass(Theme);
