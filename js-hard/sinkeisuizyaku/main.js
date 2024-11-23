// 実装する機能は以下の通りです。

// 2 枚のカードをクリック
// 数字が一致したら画面から削除/しなかったら裏返す
// 削除/裏返しの実行は 2 枚目をクリックしてから 0.5 秒後

const init = () => {
	const panel = document.getElementById('panel')
	panel.classList.add('grid-panel')

	// カードに使うカード番号を生成して代入
	const cards = [1, 2, 3, 4, 1, 2, 3, 4]
	const shuffledCards = shuffle(cards)

	shuffledCards.forEach((cardNumber) => {
		createCardElement(cardNumber, faceUppedCardNumbers)
	})
}

// カードの番号が同じだった時に更新するCSS
const updateClassList = (currentClassList, newClassList) => {
	currentClassList.remove(...currentClassList)
	currentClassList.add(...newClassList)
}

const updateCardStylesOnFaceUp = (currentClassList) => 
	updateClassList(currentClassList, ['card', 'front'])

const updateCardStylesOnFaceDown = (currentClassList) => 
	updateClassList(currentClassList, ['card', 'back'])

const updateCardStylesOnPare = (currentClassList) => 
	updateClassList(currentClassList, ['card', 'pare'])

const updateCardStylesOnFinish = (currentClassList) => 
	updateClassList(currentClassList, ['card', 'finish'])

// 全てのカード要素取得
const getCardElements = () => {
	const parentElement = document.getElementById('panel')
	return parentElement.querySelectorAll('div')
}

// 選択したカードの番号の状態
let faceUppedCardNumbers = []
let isDisabled = false

// カード押下時のEvent
const onCardClick = async(cardElement, faceUpCardNumber) => {
	// 表のカード、ペアを見つけたカードは早期リターン
	if (isDisabled || cardElement.classList.contains("front") || cardElement.classList
		.contains("finish")) {
		return
	}

	// カードの番号を代入
	cardElement.textContent = faceUpCardNumber
		// カードを表にする
	updateCardStylesOnFaceUp(cardElement.classList)
		// 配列に追加
	faceUppedCardNumbers.push(cardElement)

	if (faceUppedCardNumbers.length === 2) {
		await CardNumberHandler(faceUppedCardNumbers)
	}
}

const delayedExecution = (callback, ms) =>
	setTimeout(() => callback(), ms)

const resetCardNumberHandler = () => {
  faceUppedCardNumbers = []
	isDisabled = false
}

const resetAllCards = () => {
  const allCards = document.querySelectorAll('.card');
	allCards.forEach((card) => {
    card.textContent = '';
		updateCardStylesOnFaceDown(card.classList);
	});
}

const delaySeconds = 500

// カードのペア
const CardNumberHandler = async() => {
	isDisabled = true;

	const [card1, card2] = faceUppedCardNumbers;
	if (card1.dataset.cardNumber === card2.dataset.cardNumber) {
		delayedExecution(() => {
			faceUppedCardNumbers.forEach((element) =>
					updateCardStylesOnPare(element.classList)
      )
      
			// すべてのカードがペアになったか確認
			if (document.querySelectorAll('.card.pare').length === document.querySelectorAll(
					'.card').length) {
				alert('終了です');
				resetAllCards()
			}
      
			resetCardNumberHandler()
		}, delaySeconds)
	} else {
		delayedExecution(() => {
			faceUppedCardNumbers.forEach((element) => {
				element.textContent = ''
				updateCardStylesOnFaceDown(element.classList)
			})

			resetCardNumberHandler()
		}, delaySeconds)
	}
}

const createCardElement = (cardNumber) => {
	// cardの要素としてdivタグ生成
  const newDiv = document.createElement('div');
  
	// css追加
	newDiv.classList.add('card', 'back')
	newDiv.dataset.cardNumber = cardNumber
	// event追加
	newDiv.addEventListener('click', () => onCardClick(newDiv, cardNumber))

	// カード要素作成し、親のdiv要素に子要素として追加する
  const parentElement = document.getElementById('panel')
  
	parentElement.appendChild(newDiv);
}

// 配列の末尾から開始し、現在の要素とその前の要素の中からランダムに選んだ要素を交換
// この操作を配列の先頭まで繰り返す
const shuffle = (array) => {
	const newArray = array;
	let i = newArray.length - 1;

	while (i > 0) {
		const randomNumber = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[randomNumber]] = [newArray[randomNumber], newArray[i]];
		i--;
	}

	return newArray;
}

init()
