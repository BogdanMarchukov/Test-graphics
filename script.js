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
        console.log('removeHTML')
        elem.innerHTML = null
    }


    get() {
        return {
            div: this.div,
            button: this.button
        }
    }

    returnHTML(){
        const {length} = this.content.html
        return `
            <div class="table">
                <input class= ${this.divName}X-${length} type="number" />
                <input class= ${this.divName}Y-${length} type="number" />
                <button class= 'btn ${this.divName}-btn-${length}'>delete</button>
            </div>
        `

    }

    addRow() {
        this.content.html.push(this.returnHTML())
        this.renderContent()

    }

    renderContent(){

        this.removeHTMLContent(this.div)

        this.content.html.forEach( element => {
            this.div.innerHTML += element
        } )
        this.content.html.forEach((_, index) => {
            const buttonDom = document.querySelector(`.${this.divName}-btn-${index}`)
            this.eventClick(()=> this.delRow(index), buttonDom)
        })
    }

    delRow(indexItem) {
        const copyArray = JSON.parse(JSON.stringify(this.content.html))
        this.content.html.length = 0
        copyArray.forEach((_, index)  => {
            if (indexItem !== index){
                this.content.html.push(this.returnHTML())
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

}


const blockOne = new Block('tableWrap-one', 'button-one')
const blockTwo = new Block('tableWrap-two', 'button-two')


blockOne.eventClick() // вешаем событие click для кнопки добавить
blockTwo.eventClick() // вешаем событие click для кнопки добавить





