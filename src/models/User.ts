import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @CreateDateColumn()
  created_at?: Date;

  @CreateDateColumn()
  updated_at?: Date;
}

export default User;
