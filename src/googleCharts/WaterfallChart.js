class WaterfallChart {

    constructor(container) {
        this.container = container
        this.chart = new google.visualization.ColumnChart(this.container)
        google.visualization.events.addListener(this.chart, 'ready', () => this.setLabels())
    }

    draw(data, options) {
        this.seriesBuilder = new SeriesBuilder(data)
        this.options = this.setDefaultOptions(options)
        this.dataTable = google.visualization.arrayToDataTable(
            DTO.toColumnChartDataArray(this.seriesBuilder, this.options)
        )
        this.chart.draw(this.dataTable, this.options)
    }

    setLabels() {
        for (let i = 0; i < this.seriesBuilder.data.length; i++) {
            const data = this.seriesBuilder.data[i]
            const label = new Label({
                value: data.value,
                fontSize: this.getDefaultFont().size,
                fontFamily: this.getDefaultFont().family
            })
            if (data.total) {
                this.settingTotalLabel(label, i)
            }
            else if (data.value > 0) {
                this.settingPositiveLabel(label, i)
            }
            else if (data.value < 0) {
                this.settingNegativeLabel(label, i)
            }
            this.render(label, data.label)
        }
    }

    render(label, dataLabel) {
        const element = this.container.querySelector('svg')
        label.append(element)
        if (dataLabel == null) {
            return
        }
        label.value = dataLabel
        label.position = 'center'
        label.fillColor = this.options.backgroundColor
        label.append(element)
    }

    settingTotalLabel(label, index) {
        const codeBar = this.getBar(this.constructor.bars(index).total)
        label.fillColor = this.options.totalColor
        label.position = label.value >= 0 ? 'top' : 'bottom'
        label.upperBar = label.value >= 0 ? codeBar : null
        label.bottomBar = label.value >= 0 ? null : codeBar
    }

    settingPositiveLabel(label, index) {
        label.fillColor = this.options.positiveColor
        label.position = 'top'
        if (this.seriesBuilder.getUpperPositive(index) !== 0) {
            label.upperBar = this.getBar(this.constructor.bars(index).upperPositive)
        }
        if (this.seriesBuilder.getBottomPositive(index) !== 0) {
            label.bottomBar = this.getBar(this.constructor.bars(index).bottomPositive)
        }
    }

    settingNegativeLabel(label, index) {
        label.fillColor = this.options.negativeColor
        label.position = 'bottom'
        if (this.seriesBuilder.getBottomNegative(index) !== 0) {
            label.bottomBar = this.getBar(this.constructor.bars(index).bottomNegative)
        }
        if (this.seriesBuilder.getUpperNegative(index) !== 0) {
            label.upperBar = this.getBar(this.constructor.bars(index).upperNegative)
        }
    }

    getBar(codeBar) {
        return this.chart.getChartLayoutInterface().getBoundingBox(codeBar)
    }

    setDefaultOptions(options) {
        options.backgroundColor = options.backgroundColor || 'white'
        options.totalColor = options.totalColor || 'blue'
        options.positiveColor = options.positiveColor || 'green'
        options.negativeColor = options.negativeColor || 'red'
        return options
    }

    getDefaultFont() {
        const text = this.container.getElementsByTagName('text')[0]
        return {
            family: text.getAttribute('font-family') || 'Arial',
            size: text.getAttribute('font-size') || 13
        }
    }

    static bars(index) {
        return {
            total: `bar#0#${index}`,
            indent: `bar#1#${index}`,
            upperPositive: `bar#2#${index}`,
            upperNegative: `bar#3#${index}`,
            bottomPositive: `bar#4#${index}`,
            bottomNegative: `bar#5#${index}`
        }
    }
}