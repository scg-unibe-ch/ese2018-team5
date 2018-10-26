import {Table, Column, Model} from 'sequelize-typescript';


@Table
export class JobItem extends Model<JobItem> {

  @Column
  title!: string;

  @Column
  company!: string;

  @Column
  location!: string;

  @Column
  date!: Date;

  @Column
  description!: string;

  @Column
  position!: string;

  @Column
  pensum!: number;

  toSimplification(): any {
    return {
      'id': this.id,
      'title': this.title,
      'company': this.company,
      'location': this.location,
      'date': this.date,
      'description': this.description,
      'position': this.position,
      'pensum': this.pensum
    };
  }

  fromSimplification(simplification: any): void {
    this.title = simplification['title'];
    this.company = simplification['company'];
    this.location = simplification['location'];
    this.date = simplification['date'];
    this.description = simplification['description'];
    this.position = simplification['position'];
    this.pensum = simplification['pensum'];
  }

}
