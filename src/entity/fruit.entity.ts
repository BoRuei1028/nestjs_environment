import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fruit_price')
export class Fruit {
  @PrimaryGeneratedColumn() //主鍵
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

}