import Sqlite from 'better-sqlite3';

// Methods
import { Arbitrate, MethodOptions } from './methods/methods';

// Hasty-able (Includes database methods)
export interface Hastyable {

    /**
     * Adds a number to a key in the database. Key defaults to 0 if none exists.
     * @param key Key to set, allows dot notation.
     * @param value Amount to add to current. 
     * @param options Additional method options.
     * @returns Updated count.
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
     * @param value Amount to subtract from current.
     * @param options Additional method options.
     * @returns Updated count.
     * @example ```js
     * // Subtracts one from the amount of 'cookie' inventory
     * <Hasty>.set('store.inventory.cookie_count', 10)
     * <Hasty>.subtract('store.inventory.cookie_count', 1) // 9
     * ```
     */
    subtract: (key: string, value: any, options?: MethodOptions) => null | number

    /**
     * Appends the value to the current array value
     * @param key Key to modify, allows dot notation.
     * @param value Value to append.
     * @param options Additional method options.
     * @returns Updated value.
     * @example ```js
     * // Append a hitlist
     * <Hasty>.set('hitlist.members', ['the queen of england'])
     * <Hasty>.push('hitlist.members', 'greg') // ['the queen of england', 'greg']
     * ```
     */
    push: (key: string, value: any, options?: MethodOptions) => any[] | null

    /**
     * Sets the value of a key in the database.
     * @param key Key to set, allows dot notation.
     * @param value New value.
     * @param options Additional method options.
     * @returns New value.
     * @example ```js
     * // Set the starting wage of employees
     * <Hasty>.set('wages.software_developers', 100000000)
     * ```
     */
    set: (key: string, value: number, options?: MethodOptions) => any | null

    /**
     * Fetches the value of a key in the database.
     * @param key Key to get, allows dot notation.
     * @param options Additional method options.
     * @returns Current value.
     * @example ```js
     * // Get the number of stars a product has
     * <Hasty>.set('products.painkillers.stars', 150)
     * <Hasty>.get('products.painkillers.stars') // 150
     * ```
     */
    get: (key: string, options?: MethodOptions) => any | null

    /**
     * Returns whether the specified key exists in the database
     * * NOTE: If the value is undefined, this will return true
     * @param key Key to check, allows dot notation.
     * @param options Additional method options.
     * @returns Existence.
     * @example ```js
     * // Returns whether an employee exists in the organization
     * <Hasty>.set('employees.dave', { name: 'Dave', description: 'I think they work here...' })
     * <Hasty>.has('employees.dave') // true
     * ```
     */
    has: (key: string, options?: MethodOptions) => boolean

    /**
     * Gets the type of the value at the specified key
     * @param key Key to check, allows dot notation.
     * @param options Additional method options.
     * @returns Typeof value.
     * @example ```js
     * // Paranoia
     * <Hasty>.set('MUST_BE_TRUE', true)
     * <Hasty>.type('MUSE_BE_TRUE') // true
     * ```
     */
    type: (key: string, options?: MethodOptions) => boolean

    /**
     * Deletes a key from the database if it exists
     * @param key Key to delete, allows dot notation.
     * @param options Additional method options.
     * @returns Deletion success.
     * @example ```js
     * // Avoid subpoena's
     * <Hasty>.set('illegal_content.tax_fraud', [...])
     * <Hasty>.delete('illegal_content.tax_fraud') // true
     * ```
     */
    delete: (key: string, options?: MethodOptions) => boolean

    /**
     * Lists all data stored within a database
     * @param options Additional method options.
     * @returns Stored data.
     * @example ```js
     * // Check out the alphabet
     * <Hasty>.set('the_alphabet', 'abcdefghijklmnopqrstuvwxyz')
     * <Hasty>.all() // [ { ID: 'the_alphabet', data: 'abcdefghijklmnopqrstuvwxyz } ]
     * ```
     */
    all: (options?: MethodOptions) => { ID: any, data: any }[]

    /**
     * Clears all data held within a database
     * @param options Additional method options.
     * @returns Rows deleted.
     * @example ```js
     * // Avoid subpoena's 2.0
     * <Hasty>.set('crimes', [ 'conspiracy to commit murder', + 1000 more ])
     * <Hasty>.clear() // 1001
     * ```
     */
    clear: (options?: MethodOptions) => number;

}

// Hasty & Table Typings
interface Hasty extends Hastyable {
    file_location: string;
    Table: TableConstructor
}

interface Table extends Hastyable {
    table_name: string;
}

// Hasty & Table Constructors
interface HastyConstructor {
    new(file?: string): Hasty;
    (file?: string): Hasty;
}

interface TableConstructor {
    new(table_name: string): Table;
    (table_name: string): Table;
}

// Constructing function
const Hasty: HastyConstructor = function (this: Hasty | void, file?: string) {

    // Support functional constructing
    if (!(this instanceof Hasty)) return new Hasty(file);
    const HastyThis = this;

    // Specify file location
    HastyThis!.file_location = file || 'data.sqlite';

    // Create database
    let database = Sqlite(this.file_location);

    // Add methods
    HastyThis!.add = (key, value, options?) => Arbitrate(database, 'Add', { id: key, data: value, options });
    HastyThis!.subtract = (key, value, options?) => Arbitrate(database, 'Subtract', { id: key, data: value, options });
    HastyThis!.push = (key, value, options?) => Arbitrate(database, 'Push', { id: key, data: value, options });
    HastyThis!.set = (key, value, options?) => Arbitrate(database, 'Set', { id: key, data: value, options });
    HastyThis!.get = (key, options?) => Arbitrate(database, 'Get', { id: key, options });
    HastyThis!.has = (key, options?) => Arbitrate(database, 'Has', { id: key, options });
    HastyThis!.type = (key, options?) => Arbitrate(database, 'Type', { id: key, options });
    HastyThis!.delete = (key, options?) => Arbitrate(database, 'Delete', { id: key, options });
    HastyThis!.all = (options?) => Arbitrate(database, 'All', { options });
    HastyThis!.clear = (options?) => Arbitrate(database, 'Clear', { options });

    // Tables
    HastyThis.Table = function (this: Table | void, table_name: string) {

        // Support functional constructing
        if (!(this instanceof HastyThis.Table)) return new HastyThis.Table(table_name);
        const TableThis = this;

        // Specify table name
        TableThis!.table_name = table_name;

        // Add methods
        TableThis!.add = (key, value, options?) => Arbitrate(database, 'Add', { id: key, data: value, options }, TableThis.table_name);
        TableThis!.subtract = (key, value, options?) => Arbitrate(database, 'Subtract', { id: key, data: value, options }, TableThis.table_name);
        TableThis!.push = (key, value, options?) => Arbitrate(database, 'Push', { id: key, data: value, options }, TableThis.table_name);
        TableThis!.set = (key, value, options?) => Arbitrate(database, 'Set', { id: key, data: value, options }, TableThis.table_name);
        TableThis!.get = (key, options?) => Arbitrate(database, 'Get', { id: key, options }, TableThis.table_name);
        TableThis!.has = (key, options?) => Arbitrate(database, 'Has', { id: key, options }, TableThis.table_name);
        TableThis!.type = (key, options?) => Arbitrate(database, 'Type', { id: key, options }, TableThis.table_name);
        TableThis!.delete = (key, options?) => Arbitrate(database, 'Delete', { id: key, options }, TableThis.table_name);
        TableThis!.all = (options?) => Arbitrate(database, 'All', { options }, TableThis.table_name);
        TableThis!.clear = (options?) => Arbitrate(database, 'Clear', { options }, TableThis.table_name);


    } as TableConstructor;

} as HastyConstructor;

export default Hasty;
