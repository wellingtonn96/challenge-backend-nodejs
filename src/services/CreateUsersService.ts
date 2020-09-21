import { getRepository } from 'typeorm';
import User from '../models/User';
import Company from '../models/Company';
import Contact from '../models/Contact';
import Address from '../models/Address';

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

interface IUserData {
  users: User;
  contacts: Contact;
  companies: Company;
  address: Address;
}

class CreateUsersService {
  public async execute(data: IUsers[]): Promise<IUserData[]> {
    const usersRepository = getRepository(User);
    const companiesRepository = getRepository(Company);
    const contactsRepository = getRepository(Contact);
    const addressRepository = getRepository(Address);

    const usersWithSwite: IUsers[] = [];

    data.map(
      item => item.address.suite.includes('Suite') && usersWithSwite.push(item),
    );

    const results = usersWithSwite.map(async item => {
      const companies = companiesRepository.create({
        name: item.company.name,
        bs: item.company.bs,
        catchPhrase: item.company.catchPhrase,
      });

      await companiesRepository.save(companies);

      const users = usersRepository.create({
        name: item.name,
        username: item.username,
        company: companies,
      });

      await usersRepository.save(users);

      const contacts = contactsRepository.create({
        email: item.email,
        phone: item.phone,
        user: users,
        website: item.website,
      });

      await contactsRepository.save(contacts);

      const address = addressRepository.create({
        city: item.address.city,
        street: item.address.street,
        suite: item.address.street,
        zipcode: item.address.zipcode,
        user: users,
        geo: `${item.address.geo.lat} ${item.address.geo.lng}`,
      });

      await addressRepository.save(address);

      return {
        users,
        contacts,
        companies,
        address,
      };
    });

    const users = Promise.all(results);

    return users;
  }
}

export default CreateUsersService;
