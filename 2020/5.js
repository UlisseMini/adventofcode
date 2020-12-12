const fs = require('fs')

const data = fs.readFileSync('input5', 'utf8').trim().split('\n')

// A seat might be specified like FBFBBFFRLR
// The first 7 characters will be F or B;
// these specify exactly one of the 128 rows on the plane (numbered 0 through 127)
// Each letter tells you which half of a region the given seat is in.
// Start with the whole list of rows; the first letter indicates weather the seat is
// in the front (0, through 63) or the back (64 through 127), then half untill 1 row.

// let seat = 'FBFBBFFRLR'

// This works because F means to take the lower half,
// ie. if FBBBBBB, we get seat 63
// (F means solution must be 0-63, then we take the greater on every turn, so we get 63)
//
// if we get B it means to take the upper half,
// ie. if BFFFFFF, we get seat 64
// (consider B gives us 64-127, then we take the smaller on every turn, so we get 64)
function getRow(seat) {
  return parseInt(
    seat.slice(0, 7)
      .replaceAll('F', '0')
      .replaceAll('B', '1')
  , 2)
}

// Same thing
// R means to take the upper half
// L means to take the lower half
function getCol(seat) {
  return parseInt(
    seat.slice(7)
      .replaceAll('R', '1')
      .replaceAll('L', '0')
    , 2)
}

// Every seat also has a unique seat ID:
// multiply the row by 8, then add the column.
// In this example, the seat has ID 44 * 8 + 5 = 357.
// This works because we have 127 rows (7 bits), and 8 columns (3 bits)
// So a total of 10 bits, or 1024 seats.
// (127 * 8) + 8 = 1024
// Combining them like this works because row*8 acts as a leftward
// Shift by 3, since we're combining them in (row bits)(col bits) order.
// In fact, you can rewrite this using the lshift operator (<<)
function seatID(row, col) {
  return (row * 8) + col
  // same as (row << 3) + col
}

// Just for convenience, totally unnecessary
// Since the questions only required the seat IDs
function parse(seat) {
  const row = getRow(seat)
  const col = getCol(seat)
  const id = seatID(row, col)
  if (isNaN(id)) {
    throw `${seat} -> (${row}, ${col}) id=${id}`
  }
  return {row: row, col: col, id: id}
}

// The last three characters will be either L or R
// these specify exactly one of the 8 columns of seats on the plane (numbered 0-7).
// The same process as above proceeds again, this time with only three steps.
// L means to keep the lower half, while R means to keep the upper half

// Was testing agienst examples
// for (let seat of ['BFFFBBFRRR', 'FFFBBBFRRR', 'BBFFBBFRLL']) {
//   let row = getRow(seat)
//   let col = getCol(seat)
//   console.log(row, col, seatID(row, col))
// }

const parsed = data.map(parse)
const ids = parsed.map(x => x.id)

const sol1 = ids.reduce((a,b) => Math.max(a, b), 0)

console.log('first solution:', sol1)



// Your seat should be the only missing boarding pass in your list.
// However, there's a catch: some of the seats at the very front and
// back of the plane don't exist on this aircraft, so they'll be missing
// from your list as well.
// Your seat wasn't at the very front or back though; the seats
// with IDs +1 and -1 from yours will be in your list.

const idsSet = new Set(ids)
for (let id = 0; id < 1024; id++) {
  if (!idsSet.has(id) && idsSet.has(id+1) && idsSet.has(id-1)) {
    console.log('second solution:', id)
    // no break, because if there was a bug I wanted to see a double-print.
  }
}


