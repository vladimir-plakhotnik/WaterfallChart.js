class SeriesBuilder {

    constructor(data) {
        this.data = data       
        this.setCumulativeValues()
        this.setSigns()
    }

    setCumulativeValues() {
        this.cumulative = []
        this.data.reduce((previousValue, currentValue, index) => {
            if (currentValue.total) {
                return this.cumulative[index] = currentValue.value
            } else {
                return this.cumulative[index] = previousValue + currentValue.value
            }
        }, 1)
    }

    setSigns() {
        this.signs = []
        this.cumulative.reduce((previousValue, currentValue, index) => {
            this.signs[index] = Math.sign(currentValue) !== Math.sign(previousValue)
            return currentValue
        }, 1)
    }

    getTotal(index) {
        return this.data[index].total ? this.data[index].value : 0
    }

    getIndent(index) {

        if (this.data[index].total || this.signs[index]) {
            return 0
        }

        if (this.data[index].value > 0) {
            return this.cumulative[index] >= 0 ? this.cumulative[index - 1] : this.cumulative[index]
        }

        if (this.data[index].value < 0) {
            return this.cumulative[index] <= 0 ? this.cumulative[index - 1] : this.cumulative[index]
        }

        if (this.data[index].value === 0) {
            return this.cumulative[index - 1]
        }

        return 0
    }

    getUpperPositive(index) {

        if (this.data[index].total || this.data[index].value <= 0) {
            return 0
        }

        if (this.signs[index]) {
            return this.cumulative[index]
        }

        if (this.cumulative[index] > 0) {
            return this.data[index].value
        }

        return 0
    }

    getBottomNegative(index) {

        if (this.data[index].total || this.data[index].value >= 0) {
            return 0
        }

        if (this.signs[index]) {
            return this.cumulative[index]
        }

        if (this.cumulative[index] < 0) {
            return this.data[index].value
        }

        return 0
    }

    getUpperNegative(index) {

        if (this.data[index].total || this.data[index].value >= 0) {
            return 0
        }

        if (this.signs[index]) {
            return this.cumulative[index - 1]
        }

        if (this.cumulative[index] > 0) {
            return -this.data[index].value
        }

        return 0
    }

    getBottomPositive(index) {

        if (this.data[index].total || this.data[index].value <= 0) {
            return 0
        }
        if (this.signs[index]) {
            return this.cumulative[index - 1]
        }

        if (this.cumulative[index] < 0) {
            return -this.data[index].value
        }

        return 0
    }

    getSeries(index) {
        return new Series({
            data: this.data[index],
            indent: this.getIndent(index),
            total: this.getTotal(index),
            upperPositive: this.getUpperPositive(index),
            upperNegative: this.getUpperNegative(index),
            bottomPositive: this.getBottomPositive(index),
            bottomNegative: this.getBottomNegative(index)
        })
    }

    getAll() {
        const series = []
        for (let i = 0; i < this.data.length; i++) {
            series.push(this.getSeries(i))
        }
        return series
    }
}