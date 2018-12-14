const qtyFromDB = [10, 20, 30, 40];
const qtyActual = [111, 222, 333, 4];
const func = (db, actual) => {
    return db.map((content, index) => {
        return (content - actual[index]);
    });
}
console.log(func(qtyFromDB, qtyActual));