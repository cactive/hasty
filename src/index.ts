import Sqlite from 'better-sqlite3';
import { join } from 'path';

// Methods
import { Arbitrate, MethodOptions } from './methods/methods';

// Hasty Typings
interface Hasty {
    file_location: string;
    add: (key: string, value: number, options?: MethodOptions) => null | number
}

// Functional and new-er constructor
interface HastyConstructor {
    new(file?: string): Hasty;
    (file?: string): Hasty;
}

// Constructing function
const Hasty: HastyConstructor = function (this: Hasty | void, file?: string) {

    // Support functional constructing
    if (!(this instanceof Hasty)) return new Hasty(file);

    // Specify file location
    this!.file_location = file || join(__dirname, './data.sqlite');

    // Create database
    let database = Sqlite(this.file_location);

    // Add methods
    this!.add = (key, value, options?) => Arbitrate(database, 'Add', { id: key, data: value, options });

} as HastyConstructor;

const instance = Hasty();
console.log(instance.add('weight_of_your_mum', 10));