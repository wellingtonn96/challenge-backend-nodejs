interface IUsers {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
  company: ICompany;
}

interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

class CreateUsersService {
  public execute(data: IUsers[]): IUsers[] {
    const usersWithSwite: IUsers[] = [];

    data.map(
      item => item.address.suite.includes('Suite') && usersWithSwite.push(item),
    );

    return usersWithSwite;
  }
}

export default CreateUsersService;
