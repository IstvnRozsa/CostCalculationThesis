function drawOtherCostCharts() {
    console.log("Draw Other Costs");
    const summaryOtherCost = summarizeJSON(other,["GYR-Cikknév","GYR-Cikkszám",""]);
    drawBarchart(summaryOtherCost,"featureName","summarizedValue","#other_bar_chart",5,"featureName",1)
    fillTable(other, "#other_table");
    sumKeys(other,["Szerszám, alkatrész (5121)","Áramdíj költség (513)","Vízdij (514)","Gázdíj költsége (515)","Bérleti díj (522)","Karbantartás költsége (524)","Értékcsökkenés költsége (57)","Bérköltség ktgh(54)","Bérjárulékok ktgh(56)","Munkaerő kölcsönzés bér ktg.(5298)","Munkaerő kölcsönzés jutalék ktg (5298)"],"#all_other");
    d3.select("#other_filter_no").on("input", () => filterData('#other_filter_no',"#other_filter_name", "#other_table",other,"GYR-Cikkszám","GYR-Cikknév"));
    d3.select("#other_filter_name").on("input", () => filterData('#other_filter_no',"#other_filter_name", "#other_table",other,"GYR-Cikkszám","GYR-Cikknév"));
}
drawOtherCostCharts();