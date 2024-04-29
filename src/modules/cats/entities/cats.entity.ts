import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'cats'})
export class CatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar', length: 200 })
  breed: string;
}
