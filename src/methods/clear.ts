import { Database } from "better-sqlite3";
import { MethodParameters } from "./methods";

export default function Clear(database: Database, parameters: MethodParameters, table: string): number | null {

    let row_count = database
        .prepare(`DELETE FROM ${table}`)
        .run();

    if(!row_count) return null;
    return row_count.changes;

}