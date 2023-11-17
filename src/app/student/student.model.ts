export class Student {
    constructor(
      public id: number,
      public firstName: string,
      public lastName: string,
      public email: string,
      public phone: number,
      public address: string,
      public dob: string,
      public district: District,
      public subjects: string[],
      // Add more properties as needed
    ) {}
  }

export class District {
  constructor(
    public id: number,
    public name: string
  ) {}
}