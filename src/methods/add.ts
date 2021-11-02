import { Database } from "better-sqlite3";
import { get_safe, MethodParameters, set_safe } from "./methods";

export default function Add(database: Database, parameters: MethodParameters, table: string): number | null {

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

    // Target supplied
    if (parameters.options.target && parameters.options.sub_keys !== false) {
        current_value = JSON.parse(current_value.json);
        let numerical_value = get_safe(current_value, parameters.options.target) ?? 0;

        // Ensure numerical value
        if (isNaN(numerical_value)) {
            throw new Error(`Expected numerical value is NaN [Found '${numerical_value}' at ${table}/${parameters.id}]`);
        }

        // Set new value
        parameters.data = set_safe(current_value, parameters.options.target, numerical_value + parameters.data);

    }

    // No target
    else {

        if (current_value.json === '{}') current_value.json = 0;
        else current_value.json = JSON.parse(current_value.json);

        // Ensure numerical value
        if (isNaN(current_value.json)) {
            throw new Error(`Expected numerical value is NaN [Found '${current_value.json}' at ${table}/${parameters.id}]`);
        }

        // Set new value
        parameters.data = Number(current_value.json) + parameters.data;

    }

    // Stringify JSON for storage
    parameters.data = JSON.stringify(parameters.data);

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
    if(parameters.options.target && parameters.options.sub_keys !== false) {
        return get_safe(new_value, parameters.options.target);
    }

    return new_value;

}