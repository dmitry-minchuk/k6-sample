import faker from 'k6/x/faker';
import { randomString, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export class UserGenerator {
    static generateUsername() {
        return 'user_' + randomString(10).toLowerCase();
    }

    static generateEmail() {
        return randomString(8).toLowerCase() + '@' + randomString(6).toLowerCase() + '.com';
    }

    static generatePassword() {
        return randomString(12);
    }

    static generateFirstName() {
        return faker.person.firstName();
    }

    static generateLastName() {
        return faker.person.lastName();
    }

    static generateDateOfBirth() {
        const year = randomIntBetween(1960, 2005);
        const month = String(randomIntBetween(1, 12)).padStart(2, '0');
        const day = String(randomIntBetween(1, 28)).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    static generateUser() {
        return {
            username: this.generateUsername(),
            email: this.generateEmail(),
            password: this.generatePassword(),
            firstName: this.generateFirstName(),
            lastName: this.generateLastName(),
            dateOfBirth: this.generateDateOfBirth()
        };
    }
}
