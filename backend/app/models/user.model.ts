import {Table, Column, Model, HasMany, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {JobList} from './joblist.model';

@Table
export class User extends Model<User> {

  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Column
  skills!: string;

  toSimplification(): any {
    return {
      'id': this.id,
      // 'title': this.title,
      // 'description': this.description,
      // 'skills': this.skills
    };
  }

  fromSimplification(simplification: any): void {
    // this.title = simplification['title'];
    // this.description = simplification['description'];
    // this.skills = simplification['skills'];
  }

}
