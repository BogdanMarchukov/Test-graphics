

const container = document.querySelector('.container')

class Block {
    constructor(divName, buttonName) {
        this.div = document.querySelector(`.${divName}`)
        this.button = document.querySelector(`.${buttonName}`)
    }

    get(){
        return {
            div: this.div,
            button: this.button
        }
    }

    addRow(){
       console.log(this.get())
    }

    eventClick() {
        this.button.addEventListener('click', this.addRow.bind(this))
    }

}


const blockOne = new Block('block-one', 'button-one')
const blockTwo = new Block('block-two', 'button-two')

const {button: buttonOne} = blockOne.get()
const {button: buttonTwo} = blockTwo.get()

console.log(blockOne.get(), 'block-one')

blockOne.eventClick()
blockTwo.eventClick()





