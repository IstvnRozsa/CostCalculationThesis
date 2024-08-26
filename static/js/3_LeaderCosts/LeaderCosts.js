function drawLeaderCostCharts() {
    console.log("Draw Leader Costs");
    const summaryLeaderCost = summarizeJSON(prodLeader,["GYR-Cikknév","GYR-Cikkszám","Lejelentett idő arány","Lejelentett KTG-s idő arány",""]);
    drawBarchart(summaryLeaderCost,"featureName","summarizedValue","#leader_bar_chart",5,"featureName",1)
    fillTable(prodLeader, "#prod_leader_table");
}
drawLeaderCostCharts();