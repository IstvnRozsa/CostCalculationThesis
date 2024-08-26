function drawBarchart(data, x, y, id, number_of_bars, bar_id, min_is_null = 0) {

    data = data.sort((a, b) => b[y] - a[y]).slice(0, number_of_bars);
// Set the dimensions and margins of the chart .node().parentNode.clientWidth
    let width = document.getElementsByClassName("diagram-container")[0].offsetWidth - 30;

    let height = 260;
    let margin = {top: 20, right: 0, bottom: 30, left: 40};

// Calculate the inner width and height
    let innerWidth = width - margin.left - margin.right;
    let innerHeight = height - margin.top - margin.bottom;

// Create the SVG element
    let svg = d3.select(id)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

// Create the chart group and translate it to account for margins
    let chart = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

// Create a scale for the x-axis
    let xScale = d3.scaleBand()
        .domain(data.map(function (d) {
            return d[x];
        }))
        .range([0, innerWidth])
        .padding(0.2);

// Create a scale for the y-axis
    let yScale = d3.scaleLinear()
        .domain([d3.min(data, function (d) {
            if (min_is_null === 0) {
                return d[y] - 1;
            } else {
                return 0;
            }
        })
            , d3.max(data, function (d) {
                return d[y];
            })])
        .range([innerHeight, 0]);

// Create the bars
    let bars = chart.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("fill", mainColor)
        .attr("id", d => "ID" + d[bar_id])
        .attr("x", d => xScale(d[x]))
        .attr("y", d => yScale(d[y]))
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d[y]))
        .attr('rx', 4)
        .attr('ry', 4)
        .on("click", function (d) {
            console.log(this.id);
        })

    chart.selectAll(".bar-label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("x", d => xScale(d[x]) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d[y]) - 6) // Adjust the vertical position
        .attr("text-anchor", "middle") // Center the text horizontally
        .text(d => d[y].toFixed(1));


// Create the x-axis
    chart.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "rotate(0)");

// Create the y-axis
    chart.append("g")
        .call(d3.axisLeft(yScale));
}


function fillTable(data, id) {

    // Select the table element
    const table = d3.select(id);
    table.select("thead").remove();
    table.selectAll("tbody").remove();
// Extract headers from the first object in JSON data
    const headers = Object.keys(data[0]);

// Append table headers
    table.append("thead")
        .append("tr")
        .selectAll("th")
        .data(headers)
        .enter()
        .append("th")
        .text(function (d) {
            return d.charAt(0).toUpperCase() + d.slice(1); // Capitalize the first letter of headers
        });

// Append table rows
    table.append("tbody")
        .selectAll("tr")
        .data(data)
        .enter()
        .append("tr")
        .selectAll("td")
        .data(function (d) {
            return headers.map(function (header) {
                return d[header];
            });
        })
        .enter()
        .append("td")
        .text(function (d) {
            return d;
        });
}



function summarizeJSON(items, excludeKeys){
    // Initialize an empty summary object
    let summary = {};
    // Loop through the items and calculate the summarized value for each feature
    items.forEach(item => {
      // Iterate through the features (excluding the Name property)
      for (const [key, value] of Object.entries(item)) {
        if (!excludeKeys.includes(key)) {
          // Add the value to the corresponding feature in the summary object
          if (!summary[key]) {
            summary[key] = 0;
          }
          summary[key] += value;
        }
      }
    });

    // Convert the summary into the desired list of feature summaries
    let summaryList = [];

    for (const [key, value] of Object.entries(summary)) {
      summaryList.push({
        featureName: key,
        summarizedValue: value
      });
    }
    console.log(summaryList);
    return summaryList;


}



