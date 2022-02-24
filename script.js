
class Block {
    constructor(divName, buttonName) {
        this.div = document.querySelector(`.${divName}`)
        this.button = document.querySelector(`.${buttonName}`)
        this.divName = divName
        this.buttonName = buttonName
        this.content = [] // object[] object { html: HTMLElement, inputValueX: number, inputValueY: number }


    }

    removeHTMLContent(elem) {
        elem.innerHTML = null
    }


    get() {
        return {
            state: this.content
        }
    }

    returnElement() {
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

    renderContent() {
        this.removeHTMLContent(this.div)

        this.content.forEach(element => {
            this.div.innerHTML += element.html
        })
        this.content.forEach((_, index) => {
            const buttonDom = document.querySelector(`.${this.divName}-btn-${index}`)
            this.eventClick(() => this.delRow(index), buttonDom)
            this.eventChange(index)
        })

    }

    delRow(indexItem) {

        const copyArray = JSON.parse(JSON.stringify(this.content))
        this.content.length = 0
        copyArray.forEach((_, index) => {
            if (indexItem !== index) {
                this.content.push(this.returnElement())
            }
        })
        this.renderContent()
    }

    eventChange(index) {

        const inputX = document.querySelector(`.${this.divName}X-${index}`)
        const inputY = document.querySelector(`.${this.divName}Y-${index}`)
        inputX.addEventListener('input', (event) => this.changeInputHandler.call(this, event, 'X', index))
        inputY.addEventListener('input', (event) => this.changeInputHandler.call(this, event, 'Y', index))
    }


    eventClick(method = null, element = null) {
        if (method && element) {
            element.addEventListener('click', method.bind(this))
        } else {
            this.button.addEventListener('click', this.addRow.bind(this))
        }
    }

    changeInputHandler(event, inputName, indexArray) {

        if (inputName === 'X') {
            this.content[indexArray].inputValueX = +event.target.value
        } else {
            if (inputName === 'Y') {
                this.content[indexArray].inputValueY = +event.target.value
            }
        }
    }

}

//======================================================================================



//========================================================================================

class Calculate {
    constructor(tableOneState, tableTwoState) {
        this.tableOneState = tableOneState
        this.tableTwoState = tableTwoState
        this.div = document.querySelector('.tableWrap-calculate')
        this.content = [] // object[] object { html: HTMLElement, inputValueX: number, inputValueY: number }
    }

    createElement(index) {
        return  `
            <div class="table">
                <input class= calc-input-X-${index} type="number" />
                <input class= calc-input-Y-${index} type="number" />
            </div>
            `
    }

    calc(index) {
        return {
            html: this.createElement(index),
            inputValueX: (this.tableOneState[index].inputValueX + this.tableTwoState[index].inputValueX) / 2,
            inputValueY: (this.tableOneState[index].inputValueY + this.tableTwoState[index].inputValueY) / 2
        }
    }



    createTable() {
        let maxLength
        if (this.tableOneState.length > this.tableTwoState.length) {
            maxLength = this.tableTwoState.length
        } else {
            maxLength = this.tableOneState.length
        }
        for (let i = 0; i < maxLength; i++ ){
            this.content.push(this.calc(i))
        }
        console.log(this.content)


    }




}

//===========================================================================================


const blockOne = new Block('tableWrap-one', 'button-one')
const blockTwo = new Block('tableWrap-two', 'button-two')


blockOne.eventClick() // вешаем событие click для кнопки добавить
blockTwo.eventClick() // вешаем событие click для кнопки добавить

document.querySelector('.calculate').addEventListener('click', calculateClickHandler) // вешаем событие click для кнопки calculate

function calculateClickHandler() {
    const {state: tableOneState} = blockOne.get()
    const {state: tableTwoState} = blockTwo.get()

    const calculate = new Calculate(tableOneState, tableTwoState)

    calculate.createTable()

}



