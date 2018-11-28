import {Table, Column, Model, Default, DataType, CreatedAt, ForeignKey, UpdatedAt} from 'sequelize-typescript';
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

  @UpdatedAt
  @Column({type: DataType.DATE})
  updatedAT!: Date;

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

  @Column
  category!:string;

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
      'userId': this.userId,
      'category': this.category
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
    this.category = simplification['category'];
  }

}
