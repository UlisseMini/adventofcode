const fs = require('fs')

const data = fs.readFileSync('input3', 'utf8').trim().split('\n')
/*
const data = `
..##.........##.........##.........##.........##.........##.......
#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
.#....#..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
.#...##..#..#...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
..#.##.......#.##.......#.##.......#.##.......#.##.......#.##.....
.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
.#........#.#........#.#........#.#........#.#........#.#........#
#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...
#...##....##...##....##...##....##...##....##...##....##...##....#
.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#
`.trim().split('\n')
*/

// Starting at the top-left corner of your map and following a slope of right 3 and down 1.
// how many trees would you encounter?

// The same pattern repeats to the right infinitely many times.
// (So if you "fall off" repeat the pattern.)


function treesEncountered(data, right, down) {
  // assume equal lengthed rows
  const rowLength = data[0].length

  let r = 0;
  let d = 0;
  let n = 0; // trees encountered

  while (d < data.length) {
    n += data[d][r % rowLength] == '#'

    r += right
    d += down
  }

  return n
}

// first question
console.log(treesEncountered(data, 3, 1))


// second question

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
]

const answer = slopes
  .map(([right, down]) => treesEncountered(data, right, down))
  .reduce((x,y) => x*y, 1)


console.log(answer)
