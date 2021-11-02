import { Database } from "better-sqlite3";
import Add from "./add";
import { MethodParameters } from "./methods";

// See add.ts
export default function Subtract(database: Database, parameters: MethodParameters, table: string) {
    return Add(database, { ...parameters, data: -parameters.data }, table)
}