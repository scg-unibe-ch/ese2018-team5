import {Table, Column, Model, Default, DataType, CreatedAt, ForeignKey} from 'sequelize-typescript';
import {User} from './user.model';


@Table
export class JobItem extends Model<JobItem> {

  @Column
  title!: string;

  @Column
  company!: string;

  @Column
  location!: string;

  @CreatedAt
  @Column({type: DataType.DATE})
  createdAt!: Date;

  @Column
  description!: string;

  @Column
  position!: string;

  @Column
  pensum!: number;

  @Default(false)
  @Column
  approved!: boolean;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  toSimplification(): any {
    return {
      'id': this.id,
      'title': this.title,
      'company': this.company,
      'location': this.location,
      'createdAt': this.createdAt,
      'description': this.description,
      'position': this.position,
      'pensum': this.pensum,
      'approved': this.approved,
      'userId': this.userId
    };
  }

  fromSimplification(simplification: any): void {
    this.title = simplification['title'];
    this.company = simplification['company'];
    this.location = simplification['location'];
    this.createdAt = simplification['createdAt'];
    this.description = simplification['description'];
    this.position = simplification['position'];
    this.pensum = simplification['pensum'];
    this.approved = simplification['approved'];
    this.userId = simplification['userId'];
  }

}
