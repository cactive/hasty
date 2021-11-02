import Sqlite from 'better-sqlite3';
import { join } from 'path';

// Methods
import { Arbitrate, MethodOptions, set_safe } from './methods/methods';

// Hasty Typings
interface Hasty {
    file_location: string;

    /**
     * Adds a number to a key in the database. Key defaults to 0 if none exists.
     * @param key Key to set, allows dot notation.
     * @param option Additional method options.
     * @returns Updated count
     * @example ```js
     * // Adds one to the store's sale count.
     * <Hasty>.set('store.sales_count', 25) 
     * <Hasty>.add('store.sales_count', 1) // 26
     * ```
     */
    add: (key: string, value: number, options?: MethodOptions) => null | number

    /**
     * Subtracts a number from a key in the database. Key defaults to 0 if none exists.
     * * NOTE: This function calls `add()` with a negated value
     * @param key Key to set, allows dot notation.
     * @param option Additional method options.
     * @returns Updated count
     * @example ```js
     * // Subtracts one from the amount of 'cookie' inventory
     * <Hasty>.set('store.inventory.cookie_count', 10)
     * <Hasty>.subtract('store.inventory.cookie_count', 1) // 9
     * ```
     */
    subtract: (key: string, value: number, options?: MethodOptions) => null | number

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
    this!.subtract = (key, value, options?) => Arbitrate(database, 'Subtract', { id: key, data: value, options });

} as HastyConstructor;

const instance = Hasty();
