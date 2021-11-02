console.clear();

const Hasty = require(".");
const { Hastyable } = require('./dist/index');

let history = [];
function Test(name, test_fn, result) {

    const update_stdout = () => {
        console.clear();
        for (let line of history) {
            console.log(line);
        }
    }

    history.push(`[🏃] Running test '${name}'`);
    update_stdout();

    const start_time = process.hrtime()[1];
    const fn_result = test_fn();
    const end_time = process.hrtime()[1];

    history.pop();

    if (fn_result !== result) {
        history.push(`[🚩] Test '${name}' failed. ${fn_result} !== ${result} [Took ${end_time - start_time}ns]`);
        update_stdout();
        process.exit(1);
    }

    history.push(`[🏁] Test '${name}' finished [Took ${end_time - start_time}ns]`)
    update_stdout();

}

/**
 * @param {Hastyable} Database 
 */
function RunTests(Database) {

    // :: Basic Setting
    Test('Setting', () => Database.set('set_me', 10) === 10 &&
        Database.get('set_me') === 10,
        true);

    // :: Key Setting
    Test('Setting Keys', () => Database.set('set_keys.a.very.long.list.of.sub.keys', 10) === 10 &&
        Database.get('set_keys.a.very.long.list.of.sub.keys') === 10,
        true);

    // :: Addition
    Database.set('add_me', 20);
    Test('Addition', () => Database.add('add_me', 10), 30);

    // :: Subtraction
    Database.set('reduce_me', 20);
    Test('Subtraction', () => Database.subtract('reduce_me', 10), 10);

    // :: Item Exists
    Database.set('i_exist', true);
    Test('Item Exists', () => Database.has('i_exist'), true);

    // :: Item Doesn't Exist
    Database.delete('i_dont');
    Test('Item Doesn\'t Exist', () => Database.has('i_dont'), false);

}

// Run tests with database
history.push(`\n[ ## STARTING DATABASE TESTS ## ]`)
RunTests(Hasty());

// Run tests with table
history.push(`\n[ ## STARTING TABLE TESTS ## ]`)
RunTests(Hasty().Table('tests'));