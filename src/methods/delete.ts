import { Database } from 'better-sqlite3';
import { delete_safe, MethodParameters } from './methods';

export default function Delete(database: Database, parameters: MethodParameters, table: string): boolean {

    let current_value = database
        .prepare(`SELECT * FROM ${table} WHERE ID = (?)`)
        .get(parameters.id);

    // Return null if row doesn't exist
    if (current_value === undefined) return false;

    // Parse
    current_value = JSON.parse(current_value.json);

    // Target supplied
    if (parameters.options.target && parameters.options.sub_keys !== false) {
        
        if(typeof current_value !== 'object') {
            throw new TypeError(`Cannot use sub_keys on the non-object '${current_value}'. [${table}/${parameters.id}]`);
        }

        current_value = delete_safe(current_value, parameters.options.target);
        current_value = JSON.stringify(current_value);

        database
            .prepare(`UPDATE ${table} SET json = (?) WHERE ID = (?)`)
            .run(current_value, parameters.id);

        return true;
    }

    // No target
    database
        .prepare(`DELETE FROM ${table} WHERE ID = (?)`)
        .run(parameters.id);

    return true;

}