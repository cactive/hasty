import { Database } from "better-sqlite3";
import { MethodParameters } from "./methods";

import get_db from "./get";

export default function Type(database: Database, parameters: MethodParameters, table: string): string {

    let current_value = get_db(database, parameters, table);
    return typeof current_value;

}