export class JobItem {

  constructor(
    public id: number,
    public jobListId: number,
    public title: string, //rename here or backend
    public description: string,
    public skills: string
  ) {
  }

}
