export {};

declare global {
    interface AddressType {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: AddressGeoType;
    }
    interface AddressGeoType {
        lat: string;
        lng: string;
    }

    interface CompanyType {
        name: string;
        catchPhrase: string;
        bs: string;
    }

    interface UserType {
        id: number;
        name: string;
        username: string;
        email: string;
        address: AddressType,
        phone: string;
        website: string;
        company: CompanyType;
    }
}
