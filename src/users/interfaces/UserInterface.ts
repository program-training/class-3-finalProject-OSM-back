
interface Address {
  city: string;
  street: string;
  apartment_number: number;
}

interface UserInterface {
  id: string;
  full_name: string;
  email: string;
  address: Address;
  password: string;
}

interface UserLoginInterface {
  email: string;
  password: string;
}
export { UserInterface, Address, UserLoginInterface };
