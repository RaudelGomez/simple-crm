export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: number;
  street: string;
  zipCode: number;
  city: string;
  
  constructor(obj?: any){
    this.id = obj ? obj.id : '';
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.email = obj ? obj.email : '';
    this.birthDate = obj ? obj.birthDate : 0;
    this.street = obj ? obj.street : '';
    this.zipCode = obj ? obj.zipCode : 0;
    this.city = obj ? obj.city : '';
  }

}