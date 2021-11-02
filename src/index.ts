import Sqlite from 'better-sqlite3';
import { join } from 'path';

// Methods
import { Arbitrate, MethodOptions, set_safe } from './methods/methods';

// Hasty-able (Includes database methods)
export interface Hastyable {

    /**
     * Adds a number to a key in the database. Key defaults to 0 if none exists.
     * @param key Key to set, allows dot notation.
     * @param value Amount to add to current 
     * @param options Additional method options.
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
     * @param value Amount to subtract from current 
     * @param options Additional method options.
     * @returns Updated count
     * @example ```js
     * // Subtracts one from the amount of 'cookie' inventory
     * <Hasty>.set('store.inventory.cookie_count', 10)
     * <Hasty>.subtract('store.inventory.cookie_count', 1) // 9
     * ```
     */
    subtract: (key: string, value: any, options?: MethodOptions) => null | number

    /**
     * Sets the value of a key in the database.
     * @param key Key to set, allows dot notation.
     * @param value New value
     * @param options Additional method options.
     * @returns New value
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
     * @returns New value
     * @example ```js
     * // Get the number of stars a product has
     * <Hasty>.set('products.painkillers.stars', 150)
     * <Hasty>.get('products.painkillers.stars') // 150
     * ```
     */
    get: (key: string, options?: MethodOptions) => any | null


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
    HastyThis!.file_location = file || join(__dirname, './data.sqlite');

    // Create database
    let database = Sqlite(this.file_location);

    // Add methods
    HastyThis!.add = (key, value, options?) => Arbitrate(database, 'Add', { id: key, data: value, options });
    HastyThis!.subtract = (key, value, options?) => Arbitrate(database, 'Subtract', { id: key, data: value, options });
    HastyThis!.set = (key, value, options?) => Arbitrate(database, 'Set', { id: key, data: value, options });
    HastyThis!.get = (key, options?) => Arbitrate(database, 'Get', { id: key, options });

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
        TableThis!.set = (key, value, options?) => Arbitrate(database, 'Set', { id: key, data: value, options }, TableThis.table_name);
        TableThis!.get = (key, options?) => Arbitrate(database, 'Get', { id: key, options }, TableThis.table_name);


    } as TableConstructor;

} as HastyConstructor;

// const instance = Hasty();
// const table = new instance.Table("test_table");

// console.log(table.set('secret_value', 20));
// console.log(table.get('secret_value'));