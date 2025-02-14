function drawBarchart(data, x, y, id, number_of_bars, bar_id, min_is_null = 0) {

    data = data.sort((a, b) => b[y] - a[y]).slice(0, number_of_bars);
// Set the dimensions and margins of the chart .node().parentNode.clientWidth
    let width = document.getElementsByClassName("diagram-container")[1].offsetWidth - 30;

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


function drawBubblePlot(data, x, y, bubbleSize, bubbleColor,bubblesTitle, id) {
    let svgToRemove = d3.select(id).select("svg");
    svgToRemove.remove();

    // Define the margins and dimensions of the chart
    const margin = {top: 20, right: 20, bottom: 30, left: 50};
    const width = 700 - margin.left - margin.right;
    const height = 700 - margin.top - margin.bottom;

// PCA Scatter plot
    var pca_svg = d3.select(id)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var max_bubbleSize = d3.max(data, function (d) {
                    return d[bubbleSize];
                });
    var max_bubbleColor = d3.max(data, function (d) {
                    return d[bubbleColor];
                });

// Define x and y scales
    var pca_xScale = d3.scaleLinear()
        .domain([0,
                d3.max(data, function (d) {
                    return d[x];
                })])
        .range([0, width]);

    var pca_yScale = d3.scaleLinear()
        .domain([0,
                d3.max(data, function (d) {
                    return d[y];
                })])
        .range([height, 0]);

    pca_svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(pca_xScale));

    pca_svg.append("g")
        .call(d3.axisLeft(pca_yScale));


    pca_svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => pca_xScale(d[x]))
        .attr("cy", d => pca_yScale(d[y]))
        .on("click", function (d) {
            // Set a variable on click of a circle
            //highlightPoint(d.target.id);
            console.log(d.target.id);
        })
        .attr("id", function (d) {
            return d["GYR-Cikkszám"];
        })
        .attr("r", function (d) {
            // Set the "r" attribute based on the condition
            if (bubbleSize !== "No Selection") {
                var bubbleS = d[bubbleSize] / max_bubbleSize * 100;
                if (bubbleS < 25) {
                    return 2;
                } else if (25 <= bubbleS && bubbleS < 50) {
                    return 4;
                } else if (50 <= bubbleS && bubbleS < 75) {
                    return 8;
                } else {
                    return 12;
                }
            } else {
                return 4;
            }
        })
        .style("fill", function (d) {
            if (bubbleColor !== "No Selection") {
                var bubbleC = d[bubbleColor] / max_bubbleColor * 100;
                if (bubbleC < 25) {
                    return  "#d9ed92";
                } else if (25 <= bubbleC && bubbleC < 50) {
                    return  "#76c893";
                } else if (50 <= bubbleC && bubbleC < 75) {
                    return  "#1a759f";
                } else {
                    return  "#184e77";
                }
            } else {
                return mainColor;
            }

            return color;
        })
        .style("opacity", 0.7)
        .append("title")
        .text(d => d[bubblesTitle]);
}

function createBubbleChart(data, id, nameKey, valueKey, numberOfBubbles) {

    data = data.sort((a, b) => b[valueKey] - a[valueKey]).slice(0, numberOfBubbles);
    // Set the dimensions and margins of the graph
    const width = document.getElementsByClassName("diagram-container")[1].offsetWidth - 30;
    const height = 550;

    // Select the container and append an SVG element
    let svg = d3.select(id)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(0,0)");

    // Create a scale for bubble sizes
    const sizeScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[valueKey]), d3.max(data, d => d[valueKey])]) // Domain based on the data
        .range([25, 65]); // Size range of the bubbles

    // Create a simulation for the bubbles
    const simulation = d3.forceSimulation()
        .force("center", d3.forceCenter(width / 2, height / 2)) // Centering the bubbles
        .force("charge", d3.forceManyBody().strength(0.5)) // Force to repel bubbles from each other
        .force("collision", d3.forceCollide().radius(d => sizeScale(d[valueKey]) + 1)) // Collision detection between bubbles
        .nodes(data)
        .on("tick", ticked);

    // Create a group for each bubble (circle and text)
    const node = svg.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", d => `translate(${d.x}, ${d.y})`);

    // Create the bubbles (circles)
    node.append("circle")
        .attr("r", d => sizeScale(d[valueKey]))
        .attr("fill", mainColor);

    // Add the name labels inside the bubbles
    node.append("text")
        .attr("dy", "-0.3em")
        .style("text-anchor", "middle")
        .style("font-size", d => `${sizeScale(d[valueKey]) / 3}px`)
        .style("fill", "black")
        .text(d => d[nameKey].substring(0, 6));

    // Add the value labels inside the bubbles
    node.append("text")
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size", d => `${sizeScale(d[valueKey]) / 3}px`)
        .style("fill", "white")
        .text(d => d3.format(",.0f")(d[valueKey]));

    // Add hover effects to show the ID near the bubble
    node.on("mouseover", function(event, d) {
            d3.select(this).select("circle").attr("fill", highlightColor); // Change color on hover


            // Add or show a text element to display the ID near the bubble
            let hoverLabel = svg.selectAll(".hover-label").data([d]);

            hoverLabel.enter()
                .append("text")
                .attr("class", "hover-label")
                .merge(hoverLabel)
                .attr("x", d.x)
                .attr("y", d.y - sizeScale(d[valueKey]) - 10) // Position the text above the bubble
                .style("text-anchor", "middle")
                .style("font-size", "25px")
                .style("fill", "black")
                .text(d[nameKey]);

            hoverLabel.exit().remove();
        })
        .on("mouseout", function(event, d) {
            d3.select(this).select("circle").attr("fill", mainColor); // Revert color on unhover


            // Remove the hover label when the mouse moves away
            svg.selectAll(".hover-label").remove();
        });

    // Update the positions of the bubbles
    function ticked() {
        node
            .attr("transform", d => `translate(${d.x}, ${d.y})`);
    }
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


function sumKeys(jsonList, keys, id) {
    // Initialize a variable to store the total sum
    let totalSum = 0;

    // Iterate through each JSON object in the list
    jsonList.forEach(item => {
        // Iterate through each key to sum
        keys.forEach(key => {
            // Check if the key exists in the item and if the value is a number
            if (item.hasOwnProperty(key) && typeof item[key] === 'number') {
                totalSum += item[key];
            }
        });
    });
    const formattedValue = d3.format(",.2f")(totalSum) + " HUF";
    // Select the <h1> element by ID and update its text content
    d3.select(id).text(formattedValue);
}

 function filterData(inputId1, inputId2, outputId, data, filterKey1, filterKey2) {
            const filterText1 = d3.select(inputId1).property("value").toLowerCase();
            const filterText2 = d3.select(inputId2).property("value").toLowerCase();

            const filteredData = data.filter(item => {
                if (!filterText1 && !filterText2) {
                    return item;
                }
                else if(!filterText2){
                    return item[filterKey1].toLowerCase().includes(filterText1);
                }
                else if(!filterText1){
                    return  item[filterKey2].toLowerCase().includes(filterText2)
                }else{
                    return item[filterKey1].toLowerCase().includes(filterText1) && item[filterKey2].toLowerCase().includes(filterText2);
                }

            });
            fillTable(filteredData, outputId); // Re-render the list with filtered data
}



