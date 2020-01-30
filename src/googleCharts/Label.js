class Label {

    constructor(params) {
        this.fontFamily = params.fontFamily
        this.fontSize = params.fontSize
        this.fontWeight = params.fontWeight || 'bold'
        this.fillColor = params.fillColor
        this.position = params.position
        this.value = params.value
        this.upperBar = params.upperBar
        this.bottomBar = params.bottomBar
    }

    x() {
        const bar = this.upperBar || this.bottomBar
        if (bar == null) {
            throw new Error('Bars are empty')
        }
        return bar.left + bar.width / 2
    }

    y() {
        const position = ['top', 'bottom', 'center']
        if (!position.includes(this.position.toLowerCase(), 0)) {
            throw new Error(`Bar position "${this.position}" is not defined`)
        }
        return this[this.position.toLowerCase()]()
    }

    top() {
        if (this.upperBar != null) {
            return this.upperBar.top - this.padding()
        }
        else if (this.bottomBar != null) {
            return this.bottomBar.top + this.bottomBar.height + this.getFontSize()
        }
        else {
            throw new Error('Bars are empty')
        }
    }

    bottom() {
        if (this.bottomBar != null) {
            return this.bottomBar.top + this.bottomBar.height + this.getFontSize()
        }
        else if (this.upperBar != null) {
            return this.upperBar.top + this.upperBar.height + this.getFontSize()
        }
        else {
            throw new Error('Bars are empty')
        }
    }

    center() {
        if (this.upperBar != null && this.bottomBar != null) {            
            return this.upperBar.top + (this.upperBar.height + this.bottomBar.height + this.getFontSize()) / 2
        }
        else if (this.upperBar != null) {
            return this.upperBar.top + (this.upperBar.height + this.getFontSize()) / 2
        }
        else if (this.bottomBar != null) {
            return this.bottomBar.top + (this.bottomBar.height + this.getFontSize() - this.padding()) / 2
        }
        else {
            throw new Error('Bars are empty')
        }
    }

    padding() {
        const padding = 5
        return padding
    }

    getFontSize() {
        return parseFloat(this.fontSize)
    }

    append(element) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        text.setAttribute('font-family', this.fontFamily)
        text.setAttribute('font-size', this.fontSize)
        text.setAttribute('font-weight', this.fontWeight)
        text.setAttribute('text-anchor', 'middle')
        text.setAttribute('fill', this.fillColor)
        text.setAttribute('x', this.x())
        text.setAttribute('y', this.y())
        text.innerHTML = this.value
        element.appendChild(text)
    }
}