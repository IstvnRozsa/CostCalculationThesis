function drawDirectCost2Charts() {
    console.log("Draw Direct Costs 2");
    const summaryDirectCostHolder = summarizeJSON(directCostHolder,["GYR-cikknév","GYR-cikkszám","Költségviselő azonosító","Költségviselő neve",""]);
    drawBarchart(summaryDirectCostHolder,"featureName","summarizedValue","#direct_holder_bar_chart",5,"featureName",1)
    fillTable(directCostHolder, "#direct_cost_holder_table");

}
drawDirectCost2Charts();