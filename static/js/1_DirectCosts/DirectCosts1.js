function drawDirectCost1Charts() {
    console.log("Draw Direct Costs");
    const summaryDirectEmployee = summarizeJSON(directEmployee,["GYR-Cikkszám","GYR-Cikknév","Költséghely-viselő","Bizonylatszám",""]);
    drawBarchart(summaryDirectEmployee,"featureName","summarizedValue","#direct_employee_bar_chart",5,"featureName",1)
    fillTable(directEmployee, "#direct_employee_table");
    sumKeys(directEmployee,["Munkaerő kölcsönzés bér ktg.(tényidő arány)","Munkaerő kölcsönzési jutalék (tényidő arány)"],"#all_direct_employee");
    d3.select("#direct_employee_filter_no").on("input", () => filterData('#direct_employee_filter_no',"#direct_employee_filter_name", "#direct_employee_table",directEmployee,"GYR-Cikkszám","GYR-Cikknév"));
    d3.select("#direct_employee_filter_name").on("input", () => filterData('#direct_employee_filter_no',"#direct_employee_filter_name", "#direct_employee_table",directEmployee,"GYR-Cikkszám","GYR-Cikknév"));
}
drawDirectCost1Charts();