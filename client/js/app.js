

//DEFINE ACCION CUANDO INICIALIZA LA PAGINA
// d3.select(window).on("load", inicializar());

let gets = {
  bitcoin: "http://localhost:4000/get-btc",
  etherium: "http://localhost:4000/get-eth"
}

let tabla = {
  producto1: ".tablaProducto1",
  producto2: ".tablaProducto2"
}

let select1=0;
let select2=0;

d3.select("#producto1").on("change", function (d) {
  var selectedOption = d3.select(this).property("value")
  if (selectedOption == "bitcoin") {
    select1=1;
    inicializar(gets.bitcoin, tabla.producto1)
  } else if (selectedOption == "etherium") {
    select1=1;
    inicializar(gets.etherium, tabla.producto1)
  } else if(selectedOption==0){
    select1=0;
  }
  console.log(select1)
  console.log(selectedOption)

})
d3.select("#producto2").on("change", function (d) {
  var selectedOption = d3.select(this).property("value")
  if (selectedOption == "bitcoin") {
    select2=1;
    inicializar(gets.bitcoin, tabla.producto2)
  } else if (selectedOption == "etherium") {
    select2=1;
    inicializar(gets.etherium, tabla.producto2)
  } else if (selectedOption==0){
    select2=0;
  }
  console.log(select2)
  // console.log(selectedOption)
})

let btcInfo = ""
let ethInfo= ""

//AGREGA LA TABLA CON LOS DATOS
function inicializar(producto, tablaProducto) {
  console.log(producto)
  console.log(tablaProducto)

  let agregarHTML = "";

  d3.json(producto).then((d) => {
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

    d3.select(tablaProducto).html(agregarHTML);
    document.getElementsByClassName("agrega").innerHTML = agregarHTML;

    graficabtc()
  });


}

// GRAFICA BTC  
function graficabtc() {
  d3.select('#graph').html("");
  var svgWidth = $("#graph").parent().width();
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
  var extentD3 = d3.extent(btcInfo, data => {
    return data.time
  });

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
  var bottomAxis = d3.axisBottom(xTimeScale).ticks(61)

  var leftAxis = d3.axisLeft(yLinearScale);
  // Configure a line function which will plot the x and y coordinates using our scales
  var drawLine = d3.line()
    .x(data => xTimeScale(data.time))
    .y(data => yLinearScale((data.rate)));

    var drawLine2 = d3.line()
    .x(data => xTimeScale(data.time))
    .y(data => yLinearScale((4000)));


  // Append an SVG path and plot its points using the line function
  chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for forceData
    .attr("d", drawLine(btcInfo))
    .classed("line", true);

    // SEGUNDA LINEA 
    chartGroup.append("path")
    .attr("d", drawLine2(btcInfo))
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
    .call(bottomAxis).selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-90)");;







}


