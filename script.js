const container = document.querySelector('.container')

class Block {
    constructor(divName, buttonName) {
        this.div = document.querySelector(`.${divName}`)
        this.button = document.querySelector(`.${buttonName}`)
        this.content = []

    }


    get() {
        return {
            div: this.div,
            button: this.button
        }
    }

    addRow() {
        this.content.push(`
            <div>
                <input type="number" />
                <input type="number" />
                <button class="btn">delete</button>
            </div>
        `)


        this.div.innerHTML = `
            ${this.content}
        `
    }

    eventClick() {
        this.button.addEventListener('click', this.addRow.bind(this))
    }

}


const blockOne = new Block('tableWrap-one', 'button-one')
const blockTwo = new Block('tableWrap-two', 'button-two')


blockOne.eventClick() // вешаем событие click для кнопки добавить
blockTwo.eventClick() // вешаем событие click для кнопки добавить





