function drawCostSummaryCharts() {
    console.log("Draw Other Costs");
    const summaryAllCost = summarizeJSON(summarized,["GYR-Cikknév","GYR-Cikkszám",""]);
    drawBarchart(summaryAllCost,"featureName","summarizedValue","#summary_bar_chart",5,"featureName",1)
    fillTable(summarized, "#summarized_table");
}
drawCostSummaryCharts();