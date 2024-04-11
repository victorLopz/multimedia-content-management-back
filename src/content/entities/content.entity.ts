import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  front_page_url: string;

  @Column({ nullable: true })
  img: string;

  @Column({ nullable: true })
  url_video: string;

  @Column({ nullable: true })
  url_doc_txt: string;

  @Column()
  credits: string;

  @Column()
  theme: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @CreateDateColumn()
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @UpdateDateColumn()
  updated_at: Date;
}
