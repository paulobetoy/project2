
//DEFINE ACCION CUANDO INICIALIZA LA PAGINA
d3.select(window).on("load", inicializar());

let btcInfo = ""
//AGREGA LA TABLA CON LOS DATOS
function inicializar() {

  let agregarHTML = "";
  d3.json("http://localhost:4000/get-btc").then((d) => {
    btcInfo = Object.values(d);
    // console.log(btcInfo)
    let objeto = d;
    let arreglo = Object.values(d);
    // console.log(d);

    let roots = arreglo.map((num) => {
      agregarHTML = agregarHTML + "<tr>";
      agregarHTML = agregarHTML + "<td >" + num.asset_id_base + "</td>";
      agregarHTML = agregarHTML + " <td>" + num.asset_id_quote + "</td>"
      agregarHTML = agregarHTML + " <td>" + num.rate + "</td>"
      agregarHTML = agregarHTML + "<td>" + num.time.substr(0, 10) + "</td>"
      agregarHTML = agregarHTML + "</tr>";
      // console.log(num);
    });

    d3.select('.agrega').html(agregarHTML);
    document.getElementsByClassName("agrega").innerHTML = agregarHTML;

    graficabtc()
  });


}

// GRAFICA BTC  
function graficabtc() {
  var svgWidth = 960;
  var svgHeight = 500;

  // Define the chart's margins as an object
  var margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
  };

  // Define dimensions of the chart area
  var chartWidth = svgWidth - margin.left - margin.right;
  var chartHeight = svgHeight - margin.top - margin.bottom;

  // Select body, append SVG area to it, and set its dimensions
  var svg = d3.select("#graph")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // Append a group area, then set its margins
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Configure a parseTime function which will return a new Date object from a string
  var parseTime = d3.timeParse("%Y");
    // console.log(btcInfo)

    // Format the date and cast the rate value to a number
    ////////////////////////////////
    btcInfo.forEach(function (data) {
      data.time = new Date(data.time);
      data.rate = +data.rate;
    });
    ///////////////////////////////////

    console.log(btcInfo)

    // Configure a time scale
    // d3.extent returns the an array containing the min and max values for the property specified
    
    
    var extentD3= d3.extent(btcInfo, data => {
      return data.time
      });

      // var mapExtend= btcInfo.map(d=>new Date(d.time))
      // console.log(mapExtend)

    
    var xTimeScale = d3.scaleTime()
      .domain(extentD3)
      .range([0, chartWidth]);

    // Configure a linear scale with a range between the chartHeight and 0
    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(btcInfo, data => data.rate)])
      // .ticks(10)
      .range([chartHeight, 0]);

    // Create two new functions passing the scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xTimeScale).ticks(60);
    var leftAxis = d3.axisLeft(yLinearScale);
    // Configure a line function which will plot the x and y coordinates using our scales
    var drawLine = d3.line()
      .x(data => xTimeScale(data.time))
      .y(data => yLinearScale((data.rate)));
      

    // Append an SVG path and plot its points using the line function
    chartGroup.append("path")
      // The drawLine function returns the instructions for creating the line for forceData
      .attr("d", drawLine(btcInfo))
      .classed("line", true);

    // Append an SVG group element to the chartGroup, create the left axis inside of it
    chartGroup.append("g")
      .classed("axis", true)
      .call(leftAxis);

    // Append an SVG group element to the chartGroup, create the bottom axis inside of it
    // Translate the bottom axis to the bottom of the page
    chartGroup.append("g")
      .classed("axis", true)
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);

      


}


