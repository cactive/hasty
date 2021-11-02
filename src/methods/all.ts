import { Database } from "better-sqlite3";
import { MethodParameters } from "./methods";

export default function All(database: Database, parameters: MethodParameters, table: string): { ID: any, data: any }[] {

    let current_values = [...database.prepare(`SELECT * FROM ${table}`).iterate()];
    return current_values.map(r => ({
        ID: r.ID,
        data: JSON.parse(r.json)
    }
    ));

}