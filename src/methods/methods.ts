import { Database } from "better-sqlite3";
import Add from "./add";
import All from "./all";
import Clear from "./clear";
import Delete from "./delete";
import Fetch from "./fetch";
import Has from "./has";
import Push from "./push";
import Set from "./set";
import Subtract from "./subtract";
import Type from "./type";

const Methods = {

    Add,
    All,
    Clear,
    Delete,
    Fetch,
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

export function Arbitrate(database: Database, method: keyof typeof Methods, _parameters: ArbitrateMethodParameters, table?: string): any {

    // TODO: Look into stability with '||' as apposed to '??'
    let parameters: MethodParameters = { ...(_parameters || {}), options: {} };
    table = table || parameters.options?.table || 'json';

    // Create table if it doesn't exist
    database
        .prepare(`CREATE TABLE IF NOT EXISTS ${table} (ID TEXT, json TEXT)`)
        .run();

    // Remove prefix
    if (parameters.options.target && parameters.options.sub_keys !== false && parameters.options.target.includes('.')) {
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