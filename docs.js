const Hasty = require('.');

const Database = Hasty();

// Create Hasty's stats
Database.set('hasty', {
    health: 100,
    armour: 20,
    items: []
});

// Give Hasty a potion with >> Dot Notation <<
Database.push('hasty.items', 'Potion of Vigor');

// Add some health to Hasty
Database.add('health', 15);

console.log(JSON.stringify(Database.get('hasty'), null, 4));