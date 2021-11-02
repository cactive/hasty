import { Database } from "better-sqlite3";
import { get_value, MethodParameters, set_safe, set_value } from "./methods";

export default function Set(database: Database, parameters: MethodParameters, table: string): any | null {

    let current_value = get_value(database, parameters, table);

    // Parse
    current_value = JSON.parse(current_value.json);

    // Target supplied
    if (parameters.options.target && parameters.options.sub_keys !== false) {

        if (typeof current_value === 'object') {
            parameters.data = set_safe(current_value, parameters.options.target, parameters.data);
        }

        else {
            throw new TypeError(`Cannot use sub-keys on non-objects`);
        }

    }

    // Stringify
    parameters.data = JSON.stringify(parameters.data);

    // Update and return result
    return set_value(database, parameters, table);

}