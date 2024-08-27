let selectedxFeature = "";
let selectedyFeature = "";
let selectedsFeature = "No Selection";
let selectedcFeature = "No Selection";


function drawCostSummaryCharts() {
    console.log("Draw Other Costs");
    const summaryAllCost = summarizeJSON(summarized,["GYR-Cikknév","GYR-Cikkszám",""]);
    drawBarchart(summaryAllCost,"featureName","summarizedValue","#summary_bar_chart",5,"featureName",1)
    fillTable(summarized, "#summarized_table");
    sumKeys(summarized,["Összes költség"],"#all_summarized");
    drawBubblePlot(summarized, selectedxFeature, selectedyFeature,selectedsFeature,selectedcFeature,"GYR-Cikknév","#summary_bubble_plot");
    createBubbleChart(summarized, "#summary_items_bubble", "GYR-Cikkszám", "Összes költség", 25);
}
drawCostSummaryCharts();





let comboboxX = d3.select('#combobox-x');
// Populate the comboboxScoreType with values from the list
comboboxX.selectAll('option')
    .data(summarizedKeys)
    .enter()
    .append('option')
    .text(function (d) {
        return d;
    });

// Handle the change event of the comboboxScoreType
comboboxX.on('change', function () {
    selectedxFeature = d3.select(this).property('value');
    drawBubblePlot(summarized, selectedxFeature, selectedyFeature,selectedsFeature,selectedcFeature,"GYR-Cikknév","#summary_bubble_plot");
});


let comboboxY = d3.select('#combobox-y');
// Populate the comboboxScoreType with values from the list
comboboxY.selectAll('option')
    .data(summarizedKeys)
    .enter()
    .append('option')
    .text(function (d) {
        return d;
    });

// Handle the change event of the comboboxScoreType
comboboxY.on('change', function () {
    selectedyFeature = d3.select(this).property('value');
    drawBubblePlot(summarized, selectedxFeature, selectedyFeature,selectedsFeature,selectedcFeature,"GYR-Cikknév","#summary_bubble_plot");
});


let comboboxS = d3.select('#combobox-size');
comboboxS.append("option").text("No Selection");
// Populate the comboboxScoreType with values from the list
comboboxS.selectAll('option')
    .data(summarizedKeys)
    .enter()
    .append('option')
    .text(function (d) {
        return d;
    });

// Handle the change event of the comboboxScoreType
comboboxS.on('change', function () {
    selectedsFeature = d3.select(this).property('value');
    drawBubblePlot(summarized, selectedxFeature, selectedyFeature,selectedsFeature,selectedcFeature,"GYR-Cikknév","#summary_bubble_plot");
});



let comboboxC = d3.select('#combobox-color');
comboboxC.append("option").text("No Selection");
// Populate the comboboxScoreType with values from the list
comboboxC.selectAll('option')
    .data(summarizedKeys)
    .enter()
    .append('option')
    .text(function (d) {
        return d;
    });

// Handle the change event of the comboboxScoreType
comboboxC.on('change', function () {
    selectedcFeature = d3.select(this).property('value');
    drawBubblePlot(summarized, selectedxFeature, selectedyFeature,selectedsFeature,selectedcFeature,"GYR-Cikknév","#summary_bubble_plot");
});