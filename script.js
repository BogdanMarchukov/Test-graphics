const container = document.querySelector('.container')

class Block {
    constructor(divName, buttonName) {
        this.div = document.querySelector(`.${divName}`)
        this.button = document.querySelector(`.${buttonName}`)
        this.divName = divName
        this.buttonName = buttonName
        this.content = {
            html: []

        }

    }

    removeHTMLContent(elem) {
        elem.innerHTML = ''
    }


    get() {
        return {
            div: this.div,
            button: this.button
        }
    }

    addRow() {
        const {length} = this.content.html
        this.content.html.push(`
            <div class="table">
                <input class= ${this.divName}X-${length} type="number" />
                <input class= ${this.divName}Y-${length} type="number" />
                <button class= btn btn-${length}>delete</button>
            </div>
        `)

        this.removeHTMLContent(this.div)

        this.content.html.forEach( element => {
            console.log(element)
            this.div.innerHTML += element
        } )
    }



    eventClick(method = null, element = null) {
        if (method && element) {
            element.addEventListener('click', method.bind(this))
        } else {
            this.button.addEventListener('click', this.addRow.bind(this))
        }
    }

}


const blockOne = new Block('tableWrap-one', 'button-one')
const blockTwo = new Block('tableWrap-two', 'button-two')


blockOne.eventClick() // вешаем событие click для кнопки добавить
blockTwo.eventClick() // вешаем событие click для кнопки добавить





