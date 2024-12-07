// 一般的な5×5で数字が並んでいるビンゴシートを作ってください。
// 毎回ランダムで生成(重複ナシ)
// B の列には 1 ~ 15, I の列は 16 ~ 30, N の列には 31 ~ 45, G の列は 46 ~ 60, O の列には 61 ~ 75
// 真ん中は free にする

let bingoNumbers = []
const bingoColumns = {
  b: { min: 1, max: 15 },
  i: { min: 16, max: 30 },
  n: { min: 31, max: 45 },
  g: { min: 46, max: 60 },
  o: { min: 61, max: 75 }
}

const init = () => {
  // 乱数の二次元配列
  bingoNumbers = generateBingoColumnNumbers()

  // id hitNumにEvent追加
  const hitNumElement = document.getElementById('hitNum')
  hitNumElement.addEventListener('click',()=>onClickSetButton())

  // element描画
  createBingoColumnElement()
}

// ビンゴの二次元配列を生成関数
const generateBingoColumnNumbers = () => {
  let bingoColumnNumbers = []

  // B列
  const b = bingoColumns.b
  const bColumnNumbers = generateColumnNumber(b.min, b.max)

  // I列
  const i = bingoColumns.i
  const iColumnNumbers = generateColumnNumber(i.min, i.max)

  // N列(真ん中は free にする)
  const n = bingoColumns.n
  const nColumnNumbers = generateColumnNumber(n.min, n.max)
  const isCenterCellIndex = 2
  nColumnNumbers[isCenterCellIndex] = 'free'

  // G列
  const g = bingoColumns.g
  const gColumnNumbers = generateColumnNumber(g.min, g.max)

  // O列
  const o = bingoColumns.o
  const oColumnNumbers = generateColumnNumber(o.min, b.max)

  // 仕様通りなるように並び替え
  for (let i = 0; i < 5; i++) {
    bingoColumnNumbers[i] = [
      bColumnNumbers[i],
      iColumnNumbers[i],
      nColumnNumbers[i],
      gColumnNumbers[i],
      oColumnNumbers[i]
    ]
  }

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

const createBingoColumnElement = () => {
  const view = document.getElementById('view')

  // Headerのセル描画
  const headerRow = document.createElement('tr');
  const headers = ['B', 'I', 'N', 'G', 'O'];

  headers.forEach(header => {
    const cellElement = document.createElement('td');
    cellElement.textContent = header;
    headerRow.appendChild(cellElement);
  });

  view.appendChild(headerRow);

  // Bingoのセル描画
  bingoNumbers.forEach(row => {
    const rowElement = document.createElement('tr')

    row.forEach(cell => {
      const cellElement = document.createElement('td')
      cellElement.textContent = cell;

      // if (cellElement.textContent === 'free') {
      //   cellElement.classList.add('hit-num')
      // }

      rowElement.appendChild(cellElement)
    })
    
    view.appendChild(rowElement)
  });
}

// TODO: チャレンジ問題後でやる
const onClickSetButton = () => {
  // ランダムの番号を返す関数
  createBingoNumber()


  // ランダムの番号と合致したセルのスタイル更新


  const bingoNumber = '1'
  window.alert(`数字は${bingoNumber}です！`)
}

const createBingoNumber = () => {
  const allNum = bingoNumbers.flat()
  console.log(allNum)
}

init()