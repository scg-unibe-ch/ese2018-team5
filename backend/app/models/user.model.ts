import {Table, Column, Model, AllowNull, Unique, BeforeCreate, BeforeUpdate, Default} from 'sequelize-typescript';
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

  @BeforeUpdate
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
      'role':this.role
    };
  }

  fromSimplification(simplification: any): void {
    this.username = simplification['username'];
    this.password = simplification['password'];
    this.email = simplification['email'];
    this.role = simplification['role'];
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




