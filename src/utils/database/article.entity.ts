import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  body: string;

  @Column({ type: 'tsvector', nullable: true })
  @Index('gin') // Automatically creates a GIN index
  searchText: string;
}


