import {Table, Column, Model, AllowNull, Unique, BeforeCreate, BeforeUpdate} from 'sequelize-typescript';
const bcrypt = require('bcrypt');

@Table
export class User extends Model<User> {

  @Unique
  @AllowNull
  @Column
  username!: string;

  @AllowNull
  @Column
  password!: string;

  @Column
  email!: string;

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
      'email': this.email
    };
  }

  fromSimplification(simplification: any): void {
    this.username = simplification['username'];
    this.password = simplification['password'];
    this.email = simplification['email'];
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




