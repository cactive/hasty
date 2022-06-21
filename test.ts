import Hasty, { Hastyable } from ".";

let history: string[] = [];
function Test(name: string, test_fn: Function, result: any) {

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

function RunTests(Database: Hastyable) {

    // Clear
    Database.clear();

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

    // :: Pushing array
    Database.set('array', [1, 2, 3, 4, 5]);
    Test('Array Pushing', () => Database.push('array', 6)!.reduce((a, b) => a + b), 21);

    // :: Type checking
    Database.set('type', true);
    Test('Type Checking', () => Database.type('type'), 'boolean');

    // :: Fetching all
    Test('Fetch All', () => Database.all().length, 7);

    // :: Clearing
    Test('Clearing', () => Database.clear(), 7);

}

// Run tests with database
history.push(`\n[ ## STARTING DATABASE TESTS (TS) ## ]`)
RunTests(Hasty());

// Run tests with table
history.push(`\n[ ## STARTING TABLE TESTS (TS) ## ]`)
RunTests(Hasty().Table('tests'));
