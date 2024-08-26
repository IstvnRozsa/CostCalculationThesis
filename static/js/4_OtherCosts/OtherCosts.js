function drawOtherCostCharts() {
    console.log("Draw Other Costs");
    const summaryOtherCost = summarizeJSON(other,["GYR-Cikknév","GYR-Cikkszám",""]);
    drawBarchart(summaryOtherCost,"featureName","summarizedValue","#other_bar_chart",5,"featureName",1)
    fillTable(other, "#other_table");
}
drawOtherCostCharts();