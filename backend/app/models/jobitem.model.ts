import {Table, Column, Model, Default, DataType, CreatedAt} from 'sequelize-typescript';


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
      'approved': this.approved
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
  }

}
