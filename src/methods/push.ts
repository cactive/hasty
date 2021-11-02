import { Database } from "better-sqlite3";
import { get_safe, get_value, MethodParameters, set_safe, set_value } from "./methods";

export default function Push(database: Database, parameters: MethodParameters, table: string) {

    let current_value = get_value(database, parameters, table);

    // Target supplied
    if (parameters.options.target && parameters.options.sub_keys !== false) {

        current_value = JSON.parse(current_value.json);
        if (typeof current_value !== 'object') {
            throw new TypeError(`Cannot use sub_keys on the non-object '${current_value}'. [${table}/${parameters.id}]`);
        }

        let old_value = get_safe(current_value, parameters.options.target) ?? [];
        if (!Array.isArray(old_value)) {
            throw new TypeError(`Cannot use push on the non-array '${current_value}'. [${table}/${parameters.id}]`);
        }

        old_value.push(parameters.data);
        parameters.data = set_safe(current_value, parameters.options.target, old_value);

    }

    // No target
    else {

        if (current_value.json === '{}') current_value = [];
        else current_value = JSON.parse(current_value.json);

        if (!Array.isArray(current_value)) {
            throw new TypeError(`Cannot use push on the non-array '${current_value}'. [${table}/${parameters.id}]`);
        }

        current_value.push(parameters.data);
        parameters.data = current_value;

    }

    // Stringify
    parameters.data = JSON.stringify(parameters.data);

    // Update and return result
    return set_value(database, parameters, table);


}