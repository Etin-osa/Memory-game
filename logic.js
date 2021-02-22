const cards = Array.from(document.querySelectorAll('.card'));
let arena = Array.from(document.querySelectorAll('.back'))
const button = document.querySelector('.repeat')
const parade = document.querySelector('.complete')

const backgrounds = [
  { src: '#03071e' }, { src: '#9d0208' }, { src: '#ffba08' }, { src: '#283618' },
  { src: '#14213d' }, { src: '#00b4d8' }, { src: '#06d6a0' }, { src: '#9c6644' },
  { src: '#5a189a' }, { src: '#ffcad4' }, { src: '#3f4238' }, { src: '#5d2e46' }
]

let open = 0;
let state = [];
let col = 'rgba(0, 0, 0, 0)';

const colorFilter = () => {
  for (var i = 0; i < backgrounds.length; i++) {
    // 01. First filter
    setColr(i, col, arena)

    // 02. Second filter
    setColr(i, col, arena)
  }
}

const check = async (arr) => {
  let first = arr[0]
  let second = arr[1]

  if (first.color == second.color) {
    cards[first.ind].classList.add('no-touch')
    cards[second.ind].classList.add('no-touch')
    cards[first.ind].classList.add('no-trans')
    cards[second.ind].classList.add('no-trans')
  } else {
    cards[first.ind].classList.remove('no-touch')
    cards[second.ind].classList.remove('no-touch')
    cards[first.ind].classList.remove('active')
    cards[second.ind].classList.remove('active')
  }
  
  checkVictory()
  state = []
}

cards.forEach((card, ind) => card.addEventListener('click', () => {

  if (state.length >= 2) { 
    return 
  } else {
    card.classList.add('no-touch')
  }

  let obj = {
    ind,
    color: ''
  }

  card.classList.add('active')
  obj.color = getComputedStyle(arena[ind]).backgroundColor
  state.push(obj)

  if (open === 0) {
    open++
  } else if (open === 1) {
    open = 0
    setTimeout(check.bind(this, state), 500)
  }
}))

button.addEventListener('click', clearAll)

function rand(numb) {
  return Math.floor(Math.random() * numb.length)
}

function setColr(ind, col, arr) {
  arr = arr.filter(main => getComputedStyle(main).backgroundColor === col)
  arr[rand(arr)].style.backgroundColor = backgrounds[ind].src
}

function checkVictory() {
  const offList = Array.from(document.querySelectorAll('.no-touch'))

  if (offList.length == 24) {
    parade.classList.add('disp')
  }
}

function clearAll() {
  // 01.  Turn Around && Remove pointer events && Turn Off transition
  cards.forEach(card => {
    card.classList.remove('active'); 
    card.classList.remove('no-touch')
  })

  // 02.  Remove Background
  arena.forEach(main => main.style.backgroundColor = col)

  // 03.  Reshuffle Background
  colorFilter()

  // 04.  Remove Congrats Post
  parade.classList.remove('disp')

  // 05.  Turn On transition
  cards.forEach(card => card.classList.remove('no-trans'))
}

colorFilter()