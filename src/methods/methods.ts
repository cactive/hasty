import { Database } from "better-sqlite3";
import Add from "./add";
import All from "./all";
import Clear from "./clear";
import Delete from "./delete";
import Get from "./get";
import Has from "./has";
import Push from "./push";
import Set from "./set";
import Subtract from "./subtract";
import Type from "./type";

const SAFE_ECHO = false;

const Methods = {

    Add,
    All,
    Clear,
    Delete,
    Get,
    Has,
    Push,
    Set,
    Subtract,
    Type

}

export type MethodOptions = {
    table?: string,
    target?: string,
    sub_keys?: boolean,
}

type ArbitrateMethodParameters = {
    id?: string,
    options?: MethodOptions
    data?: any
}

export type MethodParameters = {
    id?: string,
    options: MethodOptions
    data?: any
}

// Method handler
export function Arbitrate(database: Database, method: keyof typeof Methods, _parameters: ArbitrateMethodParameters, table?: string): any {

    // TODO: Look into stability with '||' as apposed to '??'
    let parameters: MethodParameters = { ...(_parameters || {}), options: {} };
    table = table || parameters.options?.table || 'json';

    // Create table if it doesn't exist
    database
        .prepare(`CREATE TABLE IF NOT EXISTS ${table} (ID TEXT, json TEXT)`)
        .run();

    // Remove prefix
    if (parameters.options.target && parameters.options.target.includes('.') && parameters.options.sub_keys !== false) {
        parameters.options.target = parameters.options.target.slice(1);
    }

    // Error on infinity
    if (parameters.data && parameters.data === Infinity) {
        throw new TypeError(`Cannot set value Infinity. [${table}/${parameters.id}]`)
    }

    // Dot notation
    if (parameters.id && parameters.id.includes('.') && parameters.options.sub_keys !== false) {
        let split = parameters.id.split('.');
        parameters.id = split.shift();
        parameters.options.target = split.join('.');
    }

    // Run the method
    return Methods[method](database, parameters, table)

}

// Set objects value with dot notation and creating non-existent parents
export function set_safe(object: any, path: string, value: any): object {

    if (SAFE_ECHO) console.log(`<SET_SAFE> :: IN:`, object, `, PATH:`, path, `, VALUE:`, value);

    let parent = object;
    const splits = path.split('.');

    for (let i = 0; i < splits.length; i++) {

        let sub_path = splits[i];
        if (parent[sub_path] === undefined) parent[sub_path] = {};
        if (i === splits.length - 1) parent[sub_path] = value;
        else parent = parent[sub_path];

    }

    return object;
}

// Get object with dot notation
export function get_safe(object: any, path: string): undefined | any {

    if (SAFE_ECHO) console.log(`<GET_SAFE> :: IN:`, object, `, PATH:`, path);

    let parent = object;
    for (let sub_path of path.split('.')) {

        if (!parent[sub_path]) return undefined;
        parent = parent[sub_path];

    }

    if (SAFE_ECHO) console.log(`<GET_SAFE_RETURN> :: IN: `, object, `, PATH: `, path, `, VALUE: `, parent);
    return parent;
}

export function delete_safe(object: any, path: string): object {

    if (SAFE_ECHO) console.log(`<DELETE_SAFE> :: IN:`, object, `, PATH:`, path);

    let parent = object;
    const splits = path.split('.');

    for (let i = 0; i < splits.length; i++) {

        let sub_path = splits[i];
        if (parent[sub_path] === undefined) parent[sub_path] = {};
        if (i === splits.length - 1) delete parent[sub_path];
        else parent = parent[sub_path];

    }

    return object;

}

// Get the current row value from a table, creating one if none exists
export function get_value(database: Database, parameters: MethodParameters, table: string) {

    let current_value = database
        .prepare(`SELECT * FROM ${table} WHERE ID = (?)`)
        .get(parameters.id);

    // Create an empty row if none exists
    if (current_value === undefined) {
        database
            .prepare(`INSERT INTO ${table} (ID, JSON) VALUES (?, ?)`)
            .run(parameters.id, '{}')

        // TODO: Look at simplifying duplicate code
        current_value = database
            .prepare(`SELECT * FROM ${table} WHERE ID = (?)`)
            .get(parameters.id);

    }

    return current_value;

}

// Set's the current row value from a table
export function set_value(database: Database, parameters: MethodParameters, table: string) {

    // Commit changes
    database
        .prepare(`UPDATE ${table} SET json = (?) WHERE ID = (?)`)
        .run(parameters.data, parameters.id);

    // Get new data
    let new_value = database
        .prepare(`SELECT * FROM ${table} WHERE ID = (?)`)
        .get(parameters.id)
        .json;

    if (new_value === '{}') return null;
    new_value = JSON.parse(new_value);

    // Return new value
    if (parameters.options.target && parameters.options.sub_keys !== false) {
        return get_safe(new_value, parameters.options.target);
    }

    return new_value;
}