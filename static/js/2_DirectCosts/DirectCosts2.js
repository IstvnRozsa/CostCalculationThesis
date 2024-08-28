function drawDirectCost2Charts() {
    console.log("Draw Direct Costs 2");
    const summaryDirectCostHolder = summarizeJSON(directCostHolder,["GYR-cikknév","GYR-cikkszám","Költségviselő azonosító","Költségviselő neve",""]);
    drawBarchart(summaryDirectCostHolder,"featureName","summarizedValue","#direct_holder_bar_chart",5,"featureName",1)
    fillTable(directCostHolder, "#direct_cost_holder_table");
    sumKeys(directCostHolder,["Bérköltség(54)","Bérjárulék(56)","Egyéb(52+53+57)","Rezsi anyag(51)"],"#all_direct_holder");

}
drawDirectCost2Charts();