import { Database } from "better-sqlite3";
import { get_safe, get_value, MethodParameters } from "./methods";

export default function Fetch(database: Database, parameters: MethodParameters, table: string): any | null {

    let current_value = database
        .prepare(`SELECT * FROM ${table} WHERE ID = (?)`)
        .get(parameters.id);

    // Return null if row doesn't exist
    if (current_value === undefined) return null;

    // Parse
    current_value = JSON.parse(current_value.json);

    // Target supplied
    if(parameters.options.target && parameters.options.sub_keys !== false) {
        current_value = get_safe(current_value, parameters.options.target);
    }

    // Return result
    return current_value;

}