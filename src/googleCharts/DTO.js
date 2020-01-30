class DTO {
    static toColumnChartDataArray(seriesBuilder, options) {
        // Add columns
        const data = [[
            'name',
            // totals
            { type: 'number', label: 'totals' },
            { type: 'string', role: 'style' },
            // indents
            { type: 'number', label: 'indents' },
            { type: 'string', role: 'style' },
            // upperPositives
            { type: 'number', label: 'upperPositives' },
            { type: 'string', role: 'style' },
            // upperNegatives
            { type: 'number', label: 'upperNegatives' },
            { type: 'string', role: 'style' },
            // bottomPositives
            { type: 'number', label: 'bottomPositives' },
            { type: 'string', role: 'style' },
            // bottomNegatives
            { type: 'number', label: 'bottomNegatives' },
            { type: 'string', role: 'style' }
        ]]
        // Add rows
        for (let i = 0; i < seriesBuilder.data.length; i++) {
            data.push([
                // name
                seriesBuilder.getSeries(i).data.name || null,
                // totals
                seriesBuilder.getSeries(i).total || null,
                options.totalColor,
                // indents
                seriesBuilder.getSeries(i).indent || null,
                options.backgroundColor,
                // upperPositives
                seriesBuilder.getSeries(i).upperPositive || null,
                options.positiveColor,
                // upperNegatives
                seriesBuilder.getSeries(i).upperNegative || null,
                options.negativeColor,
                // bottomPositives
                seriesBuilder.getSeries(i).bottomPositive || null,
                options.positiveColor,
                // bottomNegatives
                seriesBuilder.getSeries(i).bottomNegative || null,
                options.negativeColor
            ])
        }
        return data
    }
}