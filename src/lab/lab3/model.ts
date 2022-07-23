export class StudentObject {
   constructor(
      public code: string = '',
      public name: string = '',
      public toan: number = 0,
      public li: number = 0,
      public hoa: number = 0
   ) {}
}

export class StudentService {
   data: StudentObject[];
   constructor() {
      this.data = [];
   }
   private getData() {
      return [
         { code: 'A1', name: 'Nhat', toan: 1, li: 2, hoa: 3 },
         { code: 'A2', name: 'Hoang', toan: 4, li: 5, hoa: 6 },
      ];
   }
   public setData() {
      this.data = this.getData();
   }
}
