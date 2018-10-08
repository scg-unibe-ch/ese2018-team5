import {Table, Column, Model, HasMany, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {JobList} from './joblist.model';

@Table
export class JobItem extends Model<JobItem> {

  @Column
  title!: string;

  @Column
  description!: string;

  @Column
  skills!: string;

  @ForeignKey(() => JobList)
  @Column
  jobListId!: number;

  @BelongsTo(() => JobList)
  jobList!: JobList;

  toSimplification(): any {
    return {
      'id': this.id,
      'title': this.title,
      'description': this.description,
      'skills': this.skills
    };
  }

  fromSimplification(simplification: any): void {
    this.title = simplification['title'];
    this.jobListId = simplification['jobListId'];
    this.description = simplification['description'];
    this.skills = simplification['skills'];
  }

}
