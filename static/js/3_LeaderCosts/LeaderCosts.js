function drawLeaderCostCharts() {
    console.log("Draw Leader Costs");
    const summaryLeaderCost = summarizeJSON(prodLeader,["GYR-Cikknév","GYR-Cikkszám","Lejelentett idő arány","Lejelentett KTG-s idő arány",""]);
    drawBarchart(summaryLeaderCost,"featureName","summarizedValue","#leader_bar_chart",5,"featureName",1)
    fillTable(prodLeader, "#prod_leader_table");
    sumKeys(prodLeader,["Bérköltség(54)","Bérjárulék(56)","Egyéb(52+53+54)"],"#all_leader");
    d3.select("#leader_filter_no").on("input", () => filterData('#leader_filter_no',"#leader_filter_name", "#prod_leader_table",prodLeader,"GYR-Cikkszám","GYR-Cikknév"));
    d3.select("#leader_filter_name").on("input", () => filterData('#leader_filter_no',"#leader_filter_name", "#prod_leader_table",prodLeader,"GYR-Cikkszám","GYR-Cikknév"));
}
drawLeaderCostCharts();