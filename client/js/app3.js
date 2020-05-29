


//DEFINE ACCION CUANDO INICIALIZA LA PAGINA
d3.select(window).on("load", llenarDatos());

let btcInfoObjeto = ""
let btcInfoArreglo = ""
let btcInfoArregloNormalizado = ""

let ethInfoObjeto = ""
let ethInfoArreglo = ""
let ethInfoArregloNormalizado = ""

//////////////////////////////////////////////
let brentInfoObjeto = ""
let brentInfoArreglo = ""
let brentInfoArregloNormalizado = ""
//////////////////////////////////////////////

let select1 = 0;
let select2 = 0;
let select1Producto = ""
let select2Producto = ""
let normalizado = false


d3.select("#customSwitch1").on("change", function () {
  updateNormalizado();

});

//CONTROL PARA BANDERA DE NORMALIZADO
function updateNormalizado() {
  if (d3.select("#customSwitch1").property("checked")) {
    normalizado = true
  } else {
    normalizado = false
  }

  // MANDA PEDIR LOS DATOS DEL SERVER
  llenarDatos()

  //INICIALIZA LOS DATOS SEGUN LA OPCION DEL PRIMER SELECT
  var selectedOption = d3.select("#producto1").property("value")
  if (selectedOption == "bitcoin") {
    select1 = 1;
    select1Producto = btcInfoArreglo
    inicializar(btcInfoArreglo, tabla.producto1)
  } else if (selectedOption == "etherium") {
    select1 = 1;
    select1Producto = ethInfoArreglo
    inicializar(ethInfoArreglo, tabla.producto1)
////////////////////////////////////////////
  } else if (selectedOption == "brentoil") {
    select1 = 1;
    select1Producto = brentInfoArreglo
    inicializar(brentInfoArreglo, tabla.producto1)
//////////////////////////////////////////////
  }else if (selectedOption == 0) {
    select1 = 0;
  }
  console.log(tabla.producto1)


//INICIALIZA LOS DATOS SEGUN LA OPCION DEL SEGUNDO SELECT
  var selectedOption = d3.select("#producto2").property("value")
  if (selectedOption == "bitcoin") {
    select2 = 1;
    select2Producto = btcInfoArreglo
    inicializar(btcInfoArreglo, tabla.producto2)
  } else if (selectedOption == "etherium") {
    select2 = 1;
    select2Producto = ethInfoArreglo;
    inicializar(ethInfoArreglo, tabla.producto2)
////////////////////////////////////////////////
  }else if (selectedOption == "brentoil") {
    select2 = 1;
    select2Producto = brentInfoArreglo;
    inicializar(brentInfoArreglo, tabla.producto2)
/////////////////////////////////////////////////
  } else if (selectedOption == 0) {
    select2 = 0;
  }
  console.log(select2)


}

//LLENAMOS LA INFORMACION EN LAS VARIABLES QUE USAREMOS EN LA APLICACION
function llenarDatos() {
  d3.json("http://localhost:4000/get-btc").then((d) => {
    btcInfoArreglo = Object.values(d);
    btcInfoObjeto = d;
    let maxBtc = d3.max(btcInfoArreglo, data => data.rate);
    let minBtc = d3.min(btcInfoArreglo, data => data.rate);
    // console.log(maxBtc,minBtc)
    btcInfoArreglo.forEach(function (data) {
      data.rateNormalizado = ((data.rate - minBtc) / (maxBtc - minBtc)).toFixed(3);
      data.rate = (data.rate).toFixed(2)
    });

  });

  d3.json("http://localhost:4000/get-eth").then((d) => {
    ethInfoArreglo = Object.values(d);
    ethInfoObjeto = d;
    let maxEth = d3.max(ethInfoArreglo, data => data.rate);
    let minEth = d3.min(ethInfoArreglo, data => data.rate);
    // console.log(maxBtc,minBtc)
    ethInfoArreglo.forEach(function (data) {
      data.rateNormalizado = ((data.rate - minEth) / (maxEth - minEth)).toFixed(3);
      data.rate = (data.rate).toFixed(2)
    });
    // console.log(ethInfoArreglo)

  });
/////////////////////////////////////////////////////////////////////
  d3.json("http://localhost:4000/get-brent").then((d) => {
    brentInfoArreglo = Object.values(d);
    brentInfoObjeto = d;
    let maxEth = d3.max(brentInfoArreglo, data => data.rate);
    let minEth = d3.min(brentInfoArreglo, data => data.rate);
    // console.log(maxBtc,minBtc)
    brentInfoArreglo.forEach(function (data) {
      data.rateNormalizado = ((data.rate - minEth) / (maxEth - minEth)).toFixed(3);
      data.rate = (data.rate).toFixed(2)
    });
    console.log(brentInfoArreglo)

  });
  ///////////////////////////////////////////////////////////////////

  return;
}


let tabla = {
  producto1: ".tablaProducto1",
  producto2: ".tablaProducto2"
}

d3.select("#producto1").on("change", function (d) {
  llenarDatos()
  var selectedOption = d3.select(this).property("value")
  if (selectedOption == "bitcoin") {
    select1 = 1;
    select1Producto = btcInfoArreglo
    inicializar(btcInfoArreglo, tabla.producto1)
  } else if (selectedOption == "etherium") {
    select1 = 1;
    select1Producto = ethInfoArreglo
    inicializar(ethInfoArreglo, tabla.producto1)
  } else if (selectedOption == "brentoil") {
    select1 = 1;
    select1Producto = brentInfoArreglo
    inicializar(brentInfoArreglo, tabla.producto1)
  }else if (selectedOption == 0) {
    select1 = 0;
  }
  console.log(select1)
  // console.log(selectedOption)

})
d3.select("#producto2").on("change", function (d) {
  llenarDatos()
  var selectedOption = d3.select(this).property("value")
  if (selectedOption == "bitcoin") {
    select2 = 1;
    select2Producto = btcInfoArreglo
    inicializar(btcInfoArreglo, tabla.producto2)
  } else if (selectedOption == "etherium") {
    select2 = 1;
    select2Producto = ethInfoArreglo;
    inicializar(ethInfoArreglo, tabla.producto2)
  } else if (selectedOption == "brentoil") {
    select2 = 1;
    select2Producto = brentInfoArreglo
    inicializar(brentInfoArreglo, tabla.producto2)
  }else if (selectedOption == 0) {
    select2 = 0;
  }
  console.log(select2)
  // console.log(selectedOption)
})



//AGREGA LA TABLA CON LOS DATOS
function inicializar(producto, tablaProducto) {
  // console.log(producto)
  // console.log(tablaProducto)

  let agregarHTML = "";


  let roots = producto.map((num) => {
    // console.log(num.time)

    agregarHTML = agregarHTML + "<tr>";
    agregarHTML = agregarHTML + "<td >" + num.asset_id_base + "</td>";
    agregarHTML = agregarHTML + " <td>" + num.asset_id_quote + "</td>"
    agregarHTML = agregarHTML + " <td>" + num.rate + "</td>"
    agregarHTML = agregarHTML + " <td>" + num.rateNormalizado + "</td>"
    agregarHTML = agregarHTML + "<td>" + num.time.substr(0, 10) + "</td>"
    agregarHTML = agregarHTML + "</tr>";
    // console.log(num);
  });

  d3.select(tablaProducto).html(agregarHTML);
  document.getElementsByClassName("agrega").innerHTML = agregarHTML;

  if ((select1 == 1 && select2 == 0) || (select1 == 0 && select2 == 1)) {
    graficaUno(producto)
  } else {
    graficaDos()
    coeficiente()
  }
}

//SACA COEFICIENTE DE CORRELACION
function coeficiente(){
  var n=select1Producto.length
  var y = select1Producto
  var x = select2Producto
  var sumatoriaX=0
  var sumatoriaY=0
  var xrayita=0
  var yrayita=0
  var sumatoriaxMenosXrayita=0
  var sumatoriayMenosYrayita=0
  var sumatoriaxMenosXrayitaAlCuadrado=0
  var sumatoriayMenosYrayitaAlCuadrado=0
  var multiplacionXmenosXrayitaYmenorYrayia=0

  var productoX = x.map(function (task, index, array) {
    sumatoriaX=sumatoriaX+task.rate
    return 0; 
  });
  var productoY = y.map(function (task, index, array) {
    sumatoriaY=sumatoriaY+task.rate
    return 0; 
  });
  xrayita=sumatoriaX/n
  yrayita=sumatoriaY/n

  var productoX = x.map(function (task, index, array) {
  sumatoriaxMenosXrayita=sumatoriaxMenosXrayita+(task.rate-xrayita)
  sumatoriaxMenosXrayitaAlCuadrado=sumatoriaxMenosXrayitaAlCuadrado+((task.rate-xrayita)*(task.rate-xrayita))
  
    return 0; 
  });
  var productoY = y.map(function (task, index, array) {
    sumatoriayMenosYrayita=sumatoriayMenosYrayita+(task.rate-yrayita)
    sumatoriayMenosYrayitaAlCuadrado=sumatoriayMenosYrayitaAlCuadrado+((task.rate-yrayita)*(task.rate-yrayita))
    return 0; 
  });

  for (let i=0;i<y.length;i++){
    multiplacionXmenosXrayitaYmenorYrayia=multiplacionXmenosXrayitaYmenorYrayia+((x[i].rate-xrayita)*(y[i].rate-yrayita))
  }
  coeficiente=multiplacionXmenosXrayitaYmenorYrayia/(Math.sqrt(sumatoriaxMenosXrayitaAlCuadrado)*Math.sqrt(sumatoriayMenosYrayitaAlCuadrado))

console.log("Sumatoria X="+sumatoriaX)
console.log("Sumatoria Y= "+sumatoriaY)
console.log("N= "+n)
console.log("xrayita="+xrayita)
console.log("yrayita Y= "+yrayita)
console.log("Sumatoria x-xRayita="+sumatoriaxMenosXrayita)
console.log("Sumatoria y-yRayita= "+sumatoriayMenosYrayita)
console.log("Sumatoria x-xRayita al cuadrado="+sumatoriaxMenosXrayitaAlCuadrado)
console.log("Sumatoria y-yRayit al cuadrado a= "+sumatoriayMenosYrayitaAlCuadrado)
console.log("Multiplacion= "+multiplacionXmenosXrayitaYmenorYrayia)
console.log("Coeficiente= "+coeficiente)
alert("Coeficiente de Correlacion = " +coeficiente)
}

// GRAFICA 2 PRODUCTOS 
function graficaDos() {
  var productoInfo = select1Producto
  var productoInfo2 = select2Producto
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
  productoInfo.forEach(function (data) {
    data.time = new Date(data.time);
    data.rate = +data.rate;
  });

  productoInfo2.forEach(function (data) {
    data.time = new Date(data.time);
    data.rate = +data.rate;
  });
  ///////////////////////////////////

  // console.log(btcInfo)

  // Configure a time scale
  var extentD3 = d3.extent(productoInfo, data => {
    return data.time
  });

  var xTimeScale = d3.scaleTime()
    .domain(extentD3)
    .range([0, chartWidth]);
  var rangoMaximo
  // Configure a linear scale with a range between the chartHeight and 0
  // REVISA CUAL DE LOS DOS TIENE EL MÁXIMO
  if (d3.max(productoInfo, data => data.rate) >= d3.max(productoInfo2, data => data.rate)) {
    rangoMaximo = d3.max(productoInfo, data => data.rate)
  } else {
    rangoMaximo = d3.max(productoInfo2, data => data.rate)
  }
  console.log()

  if (normalizado) {
    var yLinearScale = d3.scaleLinear()
      .domain([0, 1])
      .range([chartHeight, 0]);

  } else {
    var yLinearScale = d3.scaleLinear()
      .domain([0, rangoMaximo])
      .range([chartHeight, 0]);
  }


  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xTimeScale).ticks(61)

  var leftAxis = d3.axisLeft(yLinearScale);
  // Configure a line function which will plot the x and y coordinates using our scales

  // LINEA DE PRODUCTO 1
  if (normalizado) {
    var drawLine = d3.line()
      .x(data => xTimeScale(data.time))
      .y(data => yLinearScale((data.rateNormalizado)));
    // LINEA DE PRODUCTO 2
    var drawLine2 = d3.line()
      .x(data => xTimeScale(data.time))
      .y(data => yLinearScale((data.rateNormalizado)));

  } else {
    var drawLine = d3.line()
      .x(data => xTimeScale(data.time))
      .y(data => yLinearScale((data.rate)));
    // LINEA DE PRODUCTO 2
    var drawLine2 = d3.line()
      .x(data => xTimeScale(data.time))
      .y(data => yLinearScale((data.rate)));
  }



  // Append an SVG path and plot its points using the line function
  //PRIMERA LINEA
  chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for forceData
    .attr("d", drawLine(productoInfo))
    .attr("stroke", "blue")
    .attr("stroke-width", 2)
    .attr("fill", "none");
  
    chartGroup.append("text")
    // .attr("transform", "translate(" + (width+3) + "," + productoInfo + ")")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "red")
    .text("Producto1");

  // SEGUNDA LINEA 
  chartGroup.append("path")
    .attr("d", drawLine2(productoInfo2))
    .attr("stroke", "red")
    .attr("stroke-width", 2)
    .attr("fill", "none");

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


// GRAFICA 1 PRODUCTO 
function graficaUno(producto) {
  var productoInfo = producto
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

  productoInfo.forEach(function (data) {
    data.time = new Date(data.time);
    data.rate = +data.rate;
  });


  // console.log(btcInfo)

  // Configure a time scale
  var extentD3 = d3.extent(productoInfo, data => {
    return data.time
  });

  var xTimeScale = d3.scaleTime()
    .domain(extentD3)
    .range([0, chartWidth]);

  // Configure a linear scale with a range between the chartHeight and 0
  if (normalizado) {
    var yLinearScale = d3.scaleLinear()
      .domain([0, 1])
      .range([chartHeight, 0]);

  } else {
    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(productoInfo, data => data.rate)])
      .range([chartHeight, 0]);
  }

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xTimeScale).ticks(61)

  var leftAxis = d3.axisLeft(yLinearScale);
  // Configure a line function which will plot the x and y coordinates using our scales
  if (normalizado) {
    var drawLine = d3.line()
      .x(data => xTimeScale(data.time))
      .y(data => yLinearScale((data.rateNormalizado)));

  } else {
    var drawLine = d3.line()
      .x(data => xTimeScale(data.time))
      .y(data => yLinearScale((data.rate)));
  }


  // Append an SVG path and plot its points using the line function
  chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for forceData
    .attr("d", drawLine(productoInfo))
    .attr("stroke", "red")
    .attr("stroke-width", 2)
    .attr("fill", "none");
  // .classed("line", true);



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


