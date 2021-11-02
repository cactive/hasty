import { Database } from "better-sqlite3";
import { get_safe, get_value, MethodParameters, set_safe, set_value } from "./methods";

export default function Add(database: Database, parameters: MethodParameters, table: string): number | null {

    let current_value = get_value(database, parameters, table);

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

    // Update and return result
    return set_value(database, parameters, table);

}