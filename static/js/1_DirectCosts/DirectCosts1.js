function drawDirectCost1Charts() {
    console.log("Draw Direct Costs");
    const summaryDirectEmployee = summarizeJSON(directEmployee,["GYR-Cikkszám","GYR-Cikknév","Költséghely-viselő","Bizonylatszám",""]);
    drawBarchart(summaryDirectEmployee,"featureName","summarizedValue","#direct_employee_bar_chart",5,"featureName",1)
    fillTable(directEmployee, "#direct_employee_table");
    sumKeys(directEmployee,["Munkaerő kölcsönzés bér ktg.(tényidő arány)","Munkaerő kölcsönzési jutalék (tényidő arány)"],"#all_direct_employee");
}
drawDirectCost1Charts();