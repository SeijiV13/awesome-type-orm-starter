import * as bcrypt from 'bcryptjs';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({name: "Users", synchronize: true})
export class Users {
  
  @PrimaryGeneratedColumn("uuid", {name: "Id"})
  public id: string;
  @Column({ type: "nvarchar", length: 256, nullable: false})
  @IsNotEmpty()
  username: string;
  @Column({type: "nvarchar", length: "MAX", nullable: false})
  @IsNotEmpty()
  public passwordHash: string;


  public hashPassword() {
    this.passwordHash = bcrypt.hashSync(this.passwordHash, 8);
  }

  public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.passwordHash);
  }
}
