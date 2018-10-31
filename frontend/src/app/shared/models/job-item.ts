export class JobItem {

  constructor(
    public id: number,
    public title: string,
    public company: string,
    public location: string,
    public date: Date,
    public description: string,
    public position: string,
    public pensum: number,
    public approved: boolean

  ) {
  }

}
