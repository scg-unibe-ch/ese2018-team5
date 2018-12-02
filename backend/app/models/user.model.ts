import {
  Table,
  Column,
  Model,
  AllowNull,
  Unique,
  BeforeCreate,
  BeforeUpdate,
  Default,
  BeforeSave
} from 'sequelize-typescript';
const bcrypt = require('bcrypt');
const config = require('../config');

@Table
export class User extends Model<User> {

  @Unique
  @Column({allowNull: false})
  username!: string;

  @Column({allowNull: false})
  password!: string;

  @Unique
  @Column
  email!: string;

  @Default(config.userRoles.user)
  @Column
  role!: number;

  @Default('en')
  @Column
  language!:string;


  @BeforeCreate
  static hashPassword(instance:User) {
      return bcrypt.hash(instance.password, 10).then(function (password: any) {
        instance.password = password;
      });
  }

  toSimplification(): any {
    return {
      'id': this.id,
      'username': this.username,
      'password': this.password,
      'email': this.email,
      'role':this.role,
      'language':this.language
    };
  }

  fromSimplification(simplification: any): void {
    this.username = simplification['username'];
    this.password = simplification['password'];
    this.email = simplification['email'];
    this.role = simplification['role'];
    this.language = simplification['language'];
  }

  comparePassword(password: any, callback:any) {
    bcrypt.compare(password, this.password, function(err:any, isMatch:any) {
      if (err) {
        return callback(err);
      }
      return callback(null, isMatch);
    });
  }
}




