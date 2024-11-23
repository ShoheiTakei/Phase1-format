// 一般的な5×5で数字が並んでいるビンゴシートを作ってください。
// 毎回ランダムで生成(重複ナシ)
// B の列には 1 ~ 15, I の列は 16 ~ 30, N の列には 31 ~ 45, G の列は 46 ~ 60, O の列には 61 ~ 75
// 真ん中は free にする

const bingoColumns = {
  b: { min: 1, max: 15 },
  i: { min: 16, max: 30 },
  n: { min: 31, max: 45 },
  g: { min:461, max: 60 },
  o: { min: 61, max: 75 }
}

const init = () => {
  let bingoColumnNumbers = []
  createBingoElement()
}

// 描画
const createBingoElement = () => {
  // 乱数の二次元配列
  const bingoColumnNumbers = generateBingoColumnNumbers()

  // bingoColumnNumbersを描画
  createBingoColumnElement(bingoColumnNumbers)

  // debug
  console.log(bingoColumnNumbers)
}

// ビンゴの二次元配列を生成関数
const generateBingoColumnNumbers = () => {
  // B列
  const b = bingoColumns.b
  const bColumnNumbers = generateColumnNumber(b.min, b.max)

  // I列
  const i = bingoColumns.i
  const iColumnNumbers = generateColumnNumber(i.min, i.max)

  // N列(真ん中は free にする)
  const n = bingoColumns.i
  const nColumnNumbers = generateColumnNumber(n.min, n.max)
  const isCenterCellIndex = 2
  nColumnNumbers[isCenterCellIndex] = 'free'

  // G列
  const g = bingoColumns.i
  const gColumnNumbers = generateColumnNumber(g.min, g.max)

  // O列
  const o = bingoColumns.o
  const oColumnNumbers = generateColumnNumber(o.min, b.max)

  bingoColumnNumbers = [
    bColumnNumbers, iColumnNumbers, nColumnNumbers, gColumnNumbers, oColumnNumbers
  ]

  return bingoColumnNumbers
}

// 乱数の上限、加減を指定
const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// 列の数字生成
const generateColumnNumber = (min, max) => {
  let columnNumbers = []

  const columnLength = 5
  while (columnNumbers.length < columnLength) {
    const randomNumber = generateRandomNumber(min, max)

    // 乱数が重複しない為の条件分岐
    if (!columnNumbers.includes(randomNumber)) {
      columnNumbers.push(randomNumber)
    }
  }

  return columnNumbers
}

const createBingoColumnElement = (bingoColumnNumbers) => {
  const view = document.getElementById('view')

  bingoColumnNumbers.forEach(row => {
    const rowElement = document.createElement('tr')

    row.forEach(cell => {
      const cellElement = document.createElement('td')
      cellElement.textContent = cell;

      if (cellElement.textContent === 'free') {
        cellElement.classList.add('hit-num')
      }

      rowElement.appendChild(cellElement)
    })
    
    view.appendChild(rowElement)
  });
}

const onClickSetButton = () => {
  
}

// ビンゴ番号発表のEvent関数
// ビンゴ番号が存在したら、ビンゴのマスのclass名を変更

init()