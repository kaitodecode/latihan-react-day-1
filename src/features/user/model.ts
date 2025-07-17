export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    image: string;
    gender: string;
    age: number;
    phone: string;
    birthDate: string;
    bloodGroup: string;
    height: number;
    weight: number;
    address: {
        address: string;
        city: string;
        state: string;
        postalCode: string;
        coordinates: {
            lat: number;
            lng: number;
        }
    };
    company: {
        name: string;
        title: string;
        department: string;
    };
    role: string;
}
