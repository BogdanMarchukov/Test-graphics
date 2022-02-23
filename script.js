const container = document.querySelector('.container')

class Block {
    constructor(divName, buttonName) {
        this.div = document.querySelector(`.${divName}`)
        this.button = document.querySelector(`.${buttonName}`)
        this.divName = divName
        this.buttonName = buttonName
        this.content = [] // object[] object { html: HTMLElement, inputValueX: number, inputValueY: number }


    }

    removeHTMLContent(elem) {
        console.log('removeHTML')
        elem.innerHTML = null
    }


    get() {
        return {
            div: this.div,
            button: this.button
        }
    }

    returnElement(){
        const {length} = this.content
        return {
            html: `
            <div class="table">
                <input class= ${this.divName}X-${length} type="number" />
                <input class= ${this.divName}Y-${length} type="number" />
                <button class= 'btn ${this.divName}-btn-${length}'>delete</button>
            </div>
        `,
            inputValueX: null,
            inputValueY: null
        }

    }

    addRow() {
        this.content.push(this.returnElement())
        this.renderContent()

    }

    renderContent(){
        console.log(this.content)

        this.removeHTMLContent(this.div)

        this.content.forEach( element => {
            this.div.innerHTML += element.html
        } )
        this.content.forEach((_, index) => {
            const buttonDom = document.querySelector(`.${this.divName}-btn-${index}`)
            this.eventClick(()=> this.delRow(index), buttonDom)
        })
    }

    delRow(indexItem) {
        const copyArray = JSON.parse(JSON.stringify(this.content))
        this.content.length = 0
        copyArray.forEach((_, index)  => {
            if (indexItem !== index){
                this.content.push(this.returnElement())
            }
        })
        this.renderContent()
    }



    eventClick(method = null, element = null) {
        if (method && element) {
            element.addEventListener('click', method.bind(this))
        } else {
            this.button.addEventListener('click', this.addRow.bind(this))
        }
    }

    changeInputHandler(event, inputName, indexArray) {
        if(inputName === 'X') {
            this.content[indexArray][this.inputValueX] = +event.target.value
        } else {
            if(inputName === 'Y') {
                this.content[indexArray][this.inputValueY] = +event.target.value
            }
        }
    }

}


const blockOne = new Block('tableWrap-one', 'button-one')
const blockTwo = new Block('tableWrap-two', 'button-two')


blockOne.eventClick() // вешаем событие click для кнопки добавить
blockTwo.eventClick() // вешаем событие click для кнопки добавить





