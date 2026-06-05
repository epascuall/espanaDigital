// js/app.js

// DATOS:

// Conectividad: https://ec.europa.eu/eurostat/databrowser/view/isoc_ci_in_h/default/table?lang=en&category=isoc.isoc_i.isoc_ici
// Capacidades digitales: https://ec.europa.eu/eurostat/databrowser/view/isoc_sk_dskl_i21/default/table?lang=en&category=isoc.isoc_sk.isoc_sku
// Uso de internet: https://ec.europa.eu/eurostat/databrowser/view/isoc_ci_ifp_iu/default/table?lang=en&category=isoc.isoc_i.isoc_iiu
// Servicios públicos: https://ec.europa.eu/eurostat/databrowser/view/isoc_ciegi_ac/default/table?lang=en&category=isoc.isoc_i.isoc_ci_egi

const DATA = {
  paises: [
    {geo:"EU",name:"European Union - 27 countries",  conn:94.74, cap:60.40, uso:93.79, srv:71.88, benchmark: 94.74, idx:80.20},
    {geo:"BE",name:"Belgium",    conn: 94.68, cap:61.22, uso:96.46, srv:84.88, benchmark: 94.68, idx:84.31},
    {geo:"BG",name:"Bulgaria",    conn:92.82, cap:38.26, uso:86.85, srv:35.95, benchmark: 92.82, idx:63.47},
    {geo:"CZ",name:"Czechia",    conn:95.47, cap:70.45, uso:94.52, srv:76.54, benchmark: 95.47, idx:84.24},
    {geo:"DK",name:"Denmark",  conn:97.42, cap:81.45, uso:99.41, srv:97.99, benchmark: 97.42, idx:94.06},
    {geo:"DE",name:"Germany",   conn:93.63, cap:59.55, uso:94.58, srv:66.50, benchmark: 93.63, idx:78.56},  
    {geo:"EE",name:"Estonia",    conn:95.40, cap:62.52, uso:94.86, srv:88.63, benchmark: 95.4, idx:85.35},
    {geo:"IE",name:"Ireland",    conn:95.51, cap:82.82, uso:99.78, srv:91.00, benchmark: 95.51, idx:92.27},
    {geo:"EL",name:"Greece",     conn:88.73, cap:50.96, uso:89.15, srv:71.99, benchmark: 88.73, idx:75.20},
    {geo:"ES",name:"Spain",     conn:97.43, cap:66.50, uso:96.34, srv:80.72, benchmark: 97.43, idx:85.24},
    {geo:"FR",name:"France",    conn:94.43, cap:65.74, uso:94.98, srv:87.33, benchmark: 94.43, idx:85.62},
    {geo:"HR",name:"Croatia",    conn:87.91, cap:63.38, uso:85.90, srv:65.68, benchmark: 87.91, idx:75.71},
    {geo:"IT",name:"Italy",     conn:94.12, cap:54.27, uso:90.32, srv:57.73, benchmark: 94.12, idx:74.11},
    {geo:"CY",name:"Cyprus",  conn:97.48, cap:55.75, uso:93.79, srv:70.06, benchmark: 97.48, idx:79.27},
    {geo:"LV",name:"Latvia",  conn:94.08, cap:48.43, uso:94.53, srv:80.11, benchmark: 94.08, idx:79.28},
    {geo:"LT",name:"Lithuania",  conn:89.35, cap:53.80, uso:89.30, srv:74.30, benchmark: 89.35, idx:76.68},
    {geo:"LU",name:"Luxembourg", conn:99.07, cap:62.40, uso:99.13, srv:87.71, benchmark: 99.07, idx:87.07},
    {geo:"HU",name:"Hungary",    conn:93.06, cap:57.32, uso:92.80, srv:77.86, benchmark: 93.06, idx:80.26},
    {geo:"MT",name:"Malta",  conn:97.77, cap:66.80, uso:96.01, srv:78.26, benchmark: 97.77, idx:84.71},
    {geo:"NL",name:"Netherlands",   conn:99.28, cap:83.61, uso:99.71, srv:96.21, benchmark: 99.28, idx:94.70},
    {geo:"AT",name:"Austria",    conn:95.45, cap:69.77, uso:95.30, srv:76.38, benchmark: 95.45, idx:84.22},
    {geo:"PL",name:"Poland",    conn:96.20, cap:50.42, uso:89.65, srv:61.13, benchmark: 96.2, idx:74.35},
    {geo:"PT",name:"Portugal",   conn:91.08, cap:59.15, uso:89.45, srv:74.25, benchmark: 91.08, idx:78.48},
    {geo:"RO",name:"Romania",    conn:95.47, cap:31.84, uso:93.15, srv:24.12, benchmark: 95.47, idx:61.14},
    {geo:"SI",name:"Slovenia",    conn:93.53, cap:46.50, uso:91.57, srv:72.12, benchmark: 93.53, idx:75.93},
    {geo:"SK",name:"Slovakia",    conn:92.49, cap:53.56, uso:92.49, srv:62.87, benchmark: 92.49, idx:75.35},
    {geo:"FI",name:"Finland",  conn:97.62, cap:80.98, uso:98.08, srv:96.06, benchmark: 97.62, idx:93.18},
    {geo:"SE",name:"Sweden",     conn:95.72, cap:69.99, uso:98.25, srv:96.00, benchmark: 95.72, idx:89.99},    
  ],
  radarLabels: ["Uso Internet","e-Comercio","Redes sociales","e-Gobierno","Banca online","Internet de las cosas","Teletrabajo","Uso de IA generativa"],
  radarData: {
    "EU": [93.79, 62.35, 67.26, 71.88, 69.66, 14.22, 4.49, 32.66],  // isoc_ci_ifp_iu // isoc_ec_ib20 // isoc_ci_ac_i // isoc_ciegi_ac // isoc_ci_ac_i // isoc_iiot_use // isoc_iw_hem // isoc_IA_iIAu	
    "BE": [96.46, 66.65, 67.68, 84.88, 79.30, 17.96, 5.16, 42.01],
    "BG": [86.85, 34.75, 71.06, 35.95, 31.08, 2.46, 1.68, 22.50],
    "CZ": [94.52, 75.43, 70.09, 76.54, 84.87, 7.15, 0.00, 35.35],
    "DK": [99.71, 81.93, 89.66, 97.99, 97.61, 17.44, 6.39, 48.44],
    "DE": [94.58, 70.41, 59.24, 66.50, 70.71, 14.74, 4.81, 32.25],
    "EE": [94.86, 66.78, 72.58, 88.63, 87.33, 16.39, 5.83, 46.64],
    "IE": [99.78, 87.47, 79.89, 91.00, 95.17, 28.14, 5.15, 44.93],
    "EL": [89.15, 62.85, 73.04, 71.99, 63.02, 8.53, 4.00, 44.09],
    "ES": [96.34, 59.65, 69.50, 80.72, 74.77, 15.24, 4.44, 37.88],
    "FR": [94.98, 70.31, 70.75, 87.33, 78.33, 14.57, 6.42, 37.46],
    "HR": [85.90, 51.13, 61.50, 65.68, 65.81, 7.89, 2.54, 27.52],
    "IT": [90.32, 43.79, 56.38, 57.73, 56.37, 6.37, 2.99, 19.86],
    "CY": [93.79, 58.21, 86.54, 70.06, 78.10, 12.48, 2.38, 44.20],
    "LV": [94.53, 54.32, 79.29, 80.11, 86.04, 10.65, 5.34, 33.40],
    "LT": [89.30, 53.51, 70.27, 74.30, 79.28, 9.60, 2.61, 36.89],
    "LU": [99.13, 69.11, 67.32, 87.71, 74.41, 12.77, 7.57, 42.54],
    "HU": [92.80, 54.77, 78.66, 77.86, 69.17, 8.40, 4.47, 29.56],
    "MT": [96.01, 62.48, 82.42, 78.26, 77.56, 6.29, 8.35, 46.46],
    "NL": [99.71, 86.39, 81.21, 96.21, 95.55, 71.99, 6.95, 44.70],
    "AT": [95.30, 65.76, 67.86, 76.38, 79.04, 16.61, 4.29, 39.42],
    "PL": [89.65, 56.59, 63.27, 61.13, 58.17, 5.60, 3.76, 22.68],
    "PT": [89.45, 49.59, 70.46, 74.25, 65.24, 9.33, 3.91, 38.70],
    "RO": [93.15, 41.53, 79.57, 24.12, 30.97, 3.68, 0.95, 17.76],
    "SI": [91.57, 53.20, 65.43, 72.12, 65.61, 11.21, 5.67, 37.56],
    "SK": [92.49, 66.94, 61.91, 62.87, 60.52, 8.25, 4.23, 30.79],
    "FI": [98.08, 68.08, 81.32, 96.06, 95.51, 15.39, 8.27, 46.27],
    "SE": [98.25, 80.13, 74.72, 96.00, 81.98, 20.50, 0.00, 42.01],
  },
  trayectorias: [
    {geo:"EU", name:"European Union - 27 countries", y2018:73.32, y2025:80.20, color:"#4a5809"},
    {geo:"ES", name:"Spain",  y2018:79.09, y2025:85.24, color:"var(--es-color)"},
    {geo:"IE", name:"Ireland", y2018:80.66, y2025:92.27, color:"#c0844a"},
    {geo:"DE", name:"Germany", y2018:71.72, y2025:78.56, color:"var(--de-color)"},
    {geo:"FI", name:"Finland", y2018:90.66, y2025:93.18, color:"#7a7a74"},
    {geo:"EE", name:"Estonia", y2018:80.50, y2025:85.35, color:"#5a9a78"},
  ]
};

// EU 87.94  53.92  83.85  67.58 -> 73.32
// ES 86.36  64.16  86.11  79.75 -> 79.09
// DE 94.39  48.92  92.35  51.24 -> 71.72
// IE 89.11  70.49  82.21  80.83 -> 80.66
// FI 94.28  79.18  94.40  94.78 -> 90.66
// EE 90.47  56.37  89.36  85.83 -> 80.50

/*
   TOOLTIP
 */

const tooltip = document.getElementById("tooltip");
function showTip(html, event) {
  tooltip.innerHTML = html;
  tooltip.classList.add("visible");
  moveTip(event);
}
function moveTip(event) {
  tooltip.style.left = (event.pageX + 14) + "px";
  tooltip.style.top  = (event.pageY - 10) + "px";
}
function hideTip() { tooltip.classList.remove("visible"); }

/* 
   COLORES DE PAÍS
 */
function barColor(d) {
  if (d.geo === "ES") return getComputedStyle(document.documentElement).getPropertyValue('--es-color').trim() || "#c0392b";
  if (d.geo === "DE") return getComputedStyle(document.documentElement).getPropertyValue('--de-color').trim() || "#2d6db5";
  return "#c8c8c0";
}

/* 
   CHART DISPATCH
 */

function drawChart(id) {
  const fn = {
    intro:        () => drawBarChart("chart-intro", "idx", "Índice compuesto"),
    // conectividad: () => drawLollipop("chart-conectividad", "conn", "% hogares con banda ancha"),
    conectividad: () => drawMapaConectividad("chart-conectividad", "conn", "% hogares con banda ancha"),
    capital:      () => drawScatter("chart-capital"),
    uso:          () => drawRadar(),
    servicios:    () => drawScatterServicios("chart-servicios"),
    cierre:       () => drawTrayectorias("chart-cierre"),
  };
  if (fn[id]) fn[id]();
}

/* ------------------------------------------------------------------------------------------------
   BAR CHART (introducción)
  -------------------------------------------------------------------------------------------------  */

function drawBarChart(containerId, field, yLabel) {

  const container = document.getElementById(containerId);
  const W = container.clientWidth || 600;
  const H = container.clientHeight || 360;
  const margin = {top:20, right:20, bottom:60, left:44};
  const w = W - margin.left - margin.right;
  const h = H - margin.top - margin.bottom;

  const sorted = [...DATA.paises].sort((a,b) => b[field] - a[field]);
  // const avg = d3.mean(DATA.paises, d => d[field]);

  // Harcodeamos la media a lo que dicen las gráficas
  const avg = 80.20;

  const svg = d3.select("#"+containerId).append("svg")
    .attr("width", W).attr("height", H);

  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleBand().domain(sorted.map(d=>d.geo)).range([0,w]).padding(0.25);
  const y = d3.scaleLinear().domain([0, 100]).range([h,0]);

  g.append("g").attr("transform",`translate(0,${h})`)
    .call(d3.axisBottom(x).tickSize(0))
    .call(ax => ax.select(".domain").remove())
    .selectAll("text")
    .style("font-size","9px")
    .style("fill", d => d==="ES" ? "var(--es-color)" : d==="DE" ? "var(--de-color)" : "var(--ink-light)")
    .style("font-weight", d => (d==="ES"||d==="DE") ? "600" : "400");

  g.append("g")
    .call(d3.axisLeft(y).ticks(5).tickFormat(d=>d+"%").tickSize(-w))
    .call(ax => ax.select(".domain").remove())
    .selectAll("line").style("stroke","var(--border)").style("stroke-width","0.5");
  g.selectAll(".tick text").style("font-size","10px").style("fill","var(--ink-light)");

  g.selectAll(".bar").data(sorted).enter().append("rect")
    .attr("x", d => x(d.geo)).attr("width", x.bandwidth())
    .attr("y", h).attr("height", 0)
    .attr("fill", d => barColor(d))
    .attr("opacity", d => (d.geo==="ES"||d.geo==="DE") ? 1 : 0.45)
    .on("mouseover", (event,d) => showTip(`<strong>${d.name}</strong>${yLabel}: ${d[field].toFixed(1)}`, event))
    .on("mousemove", moveTip)
    .on("mouseout", hideTip)
    .transition().duration(600).delay((_,i)=>i*20)
    .attr("y", d => y(d[field])).attr("height", d => h - y(d[field]));

  g.append("line")
    .attr("x1",0)
    .attr("x2",w)
    .attr("y1", y(avg))
    .attr("y2", y(avg))
    .attr("stroke","var(--ink-mid)")
    .attr("stroke-width",1)
    .attr("stroke-dasharray","4 3");

  g.append("text")
    .attr("x", w+2)
    .attr("y", y(avg)+4)
    .style("font-size","9px")
    .style("fill","var(--ink-mid)")
    .text("UE " + avg.toFixed(0));
}

/* ------------------------------------------------------------------------------- 
   LOLLIPOP CHART (conectividad)
 ---------------------------------------------------------------------------------*/

/*    
function drawLollipop(containerId, field, label) {
  const container = document.getElementById(containerId);
  const W = container.clientWidth || 600;
  const H = container.clientHeight || 360;
  const margin = {top:16, right:60, bottom:16, left:80};
  const w = W - margin.left - margin.right;
  const h = H - margin.top - margin.bottom;

  const sorted = [...DATA.paises].sort((a,b) => b[field] - a[field]);
  const avg = d3.mean(DATA.paises, d => d[field]);


  const svg = d3.select("#"+containerId).append("svg")
    .attr("width",W).attr("height",H);
  const g = svg.append("g").attr("transform",`translate(${margin.left},${margin.top})`);

  const y = d3.scaleBand().domain(sorted.map(d=>d.geo)).range([0,h]).padding(0.4);
  const x = d3.scaleLinear().domain([0,100]).range([0,w]);

  g.append("g").call(d3.axisLeft(y).tickSize(0))
    .call(ax => ax.select(".domain").remove())
    .selectAll("text")
    .style("font-size","10px")
    .style("fill", d => d==="ES" ? "var(--es-color)" : d==="DE" ? "var(--de-color)" : "var(--ink-light)")
    .style("font-weight", d => (d==="ES"||d==="DE") ? "600" : "400");

  g.selectAll(".line-lollipop").data(sorted).enter().append("line")
    .attr("x1",0).attr("x2",0)
    .attr("y1", d=>y(d.geo)+y.bandwidth()/2)
    .attr("y2", d=>y(d.geo)+y.bandwidth()/2)
    .attr("stroke", d => barColor(d))
    .attr("stroke-width", d => (d.geo==="ES"||d.geo==="DE")?2:1)
    .attr("opacity", d => (d.geo==="ES"||d.geo==="DE")?1:0.4)
    .on("mouseover",(event,d)=>showTip(`<strong>${d.name}</strong>${label}: ${d[field]}%`,event))
    .on("mousemove",moveTip).on("mouseout",hideTip)
    .transition().duration(600).delay((_,i)=>i*18)
    .attr("x2", d=>x(d[field]));

  g.selectAll(".dot-lollipop").data(sorted).enter().append("circle")
    .attr("cx",0).attr("cy", d=>y(d.geo)+y.bandwidth()/2).attr("r",0)
    .attr("fill", d=>barColor(d))
    .attr("opacity", d=>(d.geo==="ES"||d.geo==="DE")?1:0.5)
    .on("mouseover",(event,d)=>showTip(`<strong>${d.name}</strong>${label}: ${d[field]}%`,event))
    .on("mousemove",moveTip).on("mouseout",hideTip)
    .transition().duration(600).delay((_,i)=>i*18+200)
    .attr("cx", d=>x(d[field])).attr("r", d=>(d.geo==="ES"||d.geo==="DE")?6:4);

  g.selectAll(".val-label").data(sorted.filter(d=>d.geo==="ES"||d.geo==="DE"))
    .enter().append("text")
    .attr("x", d=>x(d[field])+10).attr("y", d=>y(d.geo)+y.bandwidth()/2+4)
    .style("font-size","10px").style("font-weight","600")
    .style("fill", d=>barColor(d))
    .text(d=>d[field]+"%");

  g.append("line")
    .attr("x1",x(avg)).attr("x2",x(avg)).attr("y1",0).attr("y2",h)
    .attr("stroke","var(--ink-mid)").attr("stroke-width",1).attr("stroke-dasharray","4 3");
  g.append("text").attr("x",x(avg)+3).attr("y",-4)
    .style("font-size","9px").style("fill","var(--ink-mid)").text("UE "+avg.toFixed(0)+"%");
}

*/

function drawMapaConectividad(containerId, field, label) {

    const container = document.getElementById(containerId);
    const W = container.clientWidth  || 600;
    const H = container.clientHeight || 360;

    // 1. Crear un elemento SVG con ID propio dentro del contenedor
    const svgId = containerId + "-svg";
    const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgEl.setAttribute("id", svgId);
    svgEl.style.width = "100%";
    svgEl.style.height = "100%";
    container.appendChild(svgEl);

    // 2. Pasar el ID como string, no el objeto D3
    const mapa1 = eurostatmap
        .map('choropleth')
        .svgId(svgId)                          // ← string del ID, no objeto svg
        .width(W)                    // ← ancho total del SVG
        .height(H)                   // ← alto total del SVG
        .position({ x: 4500000, y: 3000000, z: W * 2.5 })
        //.title('Acceso a internet en Europa')
        //.subtitle('Porcentaje de hogares con acceso a internet, 2025')
        .nutsLevel(0)
        .nutsYear(2024)
        .stat({
            eurostatDatasetCode: 'isoc_ci_in_h',
            filters: { hhtyp: 'TOTAL', time: '2024', unit: 'PC_HH' }, // 2025 puede no existir aún
            unitText: '%',
        })
        .colors(['#2166AC','#4393C3','#92C5DE','#D1E5F0','#FDDBC7','#F4A582','#D6604D','#B2182B'])
        .classificationMethod('quantile')
        .legend({
            x: W - 200,
            y: H - 250,
            title: '% hogares con internet',
            titleFontSize: 10,
            labelFontSize: 10,
        });

    mapa1.build();

    console.log(Object.keys(mapa1));
}


/* -------------------------------------------------------------------------------------------
   SCATTER PLOT (Capacidades digitales)
  -----------------------------------------------------------------------------------------------  */


function drawScatter(containerId) {
  const container = document.getElementById(containerId);
  const W = container.clientWidth || 600;
  const H = container.clientHeight || 360;
  const margin = {top:20, right:20, bottom:50, left:50};
  const w = W - margin.left - margin.right;
  const h = H - margin.top - margin.bottom;

  const svg = d3.select("#"+containerId).append("svg").attr("width",W).attr("height",H);
  const g = svg.append("g").attr("transform",`translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain([80,100]).range([0,w]);
  const y = d3.scaleLinear().domain([20,85]).range([h,0]);

  g.append("g").attr("transform",`translate(0,${h})`)
    .call(d3.axisBottom(x).ticks(6).tickFormat(d=>d+"%"))
    .call(ax=>ax.select(".domain").remove())
    .selectAll("text").style("font-size","10px").style("fill","var(--ink-light)");

  g.append("g")
    .call(d3.axisLeft(y).ticks(6).tickFormat(d=>d+"%").tickSize(-w))
    .call(ax=>ax.select(".domain").remove())
    .selectAll("line").style("stroke","var(--border)").style("stroke-width","0.5");
  g.selectAll(".tick text").style("font-size","10px").style("fill","var(--ink-light)");

  g.append("text").attr("x",w/2).attr("y",h+38).attr("text-anchor","middle")
    .style("font-size","10px").style("fill","var(--ink-light)").text("Cobertura banda ancha (%)");
  g.append("text").attr("transform","rotate(-90)").attr("x",-h/2).attr("y",-38)
    .attr("text-anchor","middle").style("font-size","10px").style("fill","var(--ink-light)")
    .text("Competencias digitales básicas (%)");

  const dots = g.selectAll(".dot").data(DATA.paises).enter().append("g");

  dots.append("circle")
    .attr("cx", d=>x(d.conn)).attr("cy", d=>y(d.cap))
    .attr("r", d=>(d.geo==="ES"||d.geo==="DE")?8:5)
    .attr("fill", d=>barColor(d))
    .attr("opacity", d=>(d.geo==="ES"||d.geo==="DE")?1:0.4)
    .attr("stroke", d=>(d.geo==="ES"||d.geo==="DE")?"#fff":"none")
    .attr("stroke-width",1.5)
    .style("cursor","pointer")
    .on("mouseover",(event,d)=>showTip(
      `<strong>${d.name}</strong>Banda ancha: ${d.conn}%<br>Competencias: ${d.cap}%`,event))
    .on("mousemove",moveTip).on("mouseout",hideTip);

  dots.filter(d=>d.geo==="ES"||d.geo==="DE").append("text")
    .attr("x",d=>x(d.conn)+10).attr("y",d=>y(d.cap)+4)
    .style("font-size","11px").style("font-weight","600")
    .style("fill",d=>barColor(d)).text(d=>d.name);
}



/* ------------------------------------------------------------------------------------------------------------------ 
   RADAR CHART (uso digital)
---------------------------------------------------------------------------------------------------------------------*/


const RADAR_COLORS = {
    EU: "#E6194B",
    BE: "#3CB44B",
    BG: "#33E119",
    CZ: "#4363D8",
    DK: "#F58231",
    DE: "var(--de-color)",
    EE: "#911EB4", 
    IE: "#42D4F4",
    EL: "#F032E6",
    ES: "var(--es-color)",
    FR: "#BFEF45",
    HR: "#FABED4",
    IT: "#469990",
    CY: "#DCBEFF",
    LV: "#9A6324",
    LT: "#FFFAC8",
    LU: "#800000",
    HU: "#808000",
    MT: "#FFD8B1",
    NL: "#000075",
    AT: "#A9A9A9",
    PL: "#3366CC",
    PT: "#FF9900",
    RO: "#990099",
    SI: "#0099C6",
    SK: "#673AB7",
    FI: "#3F51B5", 
    SE: "#FFE119"
};
let radarSelected = ["ES","DE"];

function drawRadar() {
  const sel = document.getElementById("radarCountrySel");
  Object.keys(DATA.radarData).forEach(geo => {
    const p = DATA.paises.find(d=>d.geo===geo);
    const btn = document.createElement("button");
    btn.className = "radar-btn" + (radarSelected.includes(geo)?" active":"");
    btn.textContent = p ? p.name : geo;
    btn.style.borderColor = radarSelected.includes(geo) ? RADAR_COLORS[geo] : "";
    btn.style.background = radarSelected.includes(geo) ? RADAR_COLORS[geo] : "";
    btn.onclick = () => {
      if (radarSelected.includes(geo)) {
        if (radarSelected.length > 1) radarSelected = radarSelected.filter(g=>g!==geo);
      } else { radarSelected = [...radarSelected, geo]; }
      document.getElementById("chart-uso").innerHTML = "";
      document.getElementById("radar-legend").innerHTML = "";
      renderRadarSvg();
      document.getElementById("radarCountrySel").innerHTML = "";
      drawRadar();
    };
    sel.appendChild(btn);
  });
  renderRadarSvg();
}


/*
function renderRadarSvg() {
  const container = document.getElementById("chart-uso");
  const W = container.clientWidth || 480;
  const H = container.clientHeight || 360;
  const cx = W/2, cy = H/2, R = Math.min(W,H)*0.36;
  const n = DATA.radarLabels.length;
  const toXY = (i,v) => {
    const a = (i/n)*Math.PI*2 - Math.PI/2;
    return [cx+R*(v/100)*Math.cos(a), cy+R*(v/100)*Math.sin(a)];
  };

  const svg = d3.select("#chart-uso").append("svg").attr("width",W).attr("height",H);

  for(let ring=1;ring<=4;ring++){
    const pts = DATA.radarLabels.map((_,i)=>toXY(i,ring*25).join(",")).join(" ");
    svg.append("polygon").attr("points",pts)
      .attr("fill","none").attr("stroke","var(--border)").attr("stroke-width","0.5");
  }

  DATA.radarLabels.forEach((_,i)=>{
    const [x2,y2] = toXY(i,100);
    svg.append("line").attr("x1",cx).attr("y1",cy).attr("x2",x2).attr("y2",y2)
      .attr("stroke","var(--border)").attr("stroke-width","0.5");
    const [lx,ly] = toXY(i,118);
    svg.append("text").attr("x",lx).attr("y",ly)
      .attr("text-anchor","middle").attr("dominant-baseline","middle")
      .style("font-size","10px").style("fill","var(--ink-mid)")
      .text(DATA.radarLabels[i]);
  });

  radarSelected.forEach(geo=>{
    const vals = DATA.radarData[geo];
    const pts = vals.map((v,i)=>toXY(i,v).join(",")).join(" ");
    svg.append("polygon").attr("points",pts)
      .attr("fill",RADAR_COLORS[geo]).attr("fill-opacity","0.15")
      .attr("stroke",RADAR_COLORS[geo]).attr("stroke-width","2");
  });

  const legend = document.getElementById("radar-legend");
  radarSelected.forEach(geo=>{
    const p = DATA.paises.find(d=>d.geo===geo);
    const item = document.createElement("div");
    item.className = "legend-item";
    item.innerHTML = `<div class="legend-dot" style="background:${RADAR_COLORS[geo]}"></div>${p?p.name:geo}`;
    legend.appendChild(item);
  });
}

*/


function renderRadarSvg() {
    // Limpiar el contenedor
    document.getElementById("chart-uso").innerHTML = "";
    document.getElementById("radar-legend").innerHTML = "";

    // Transformar DATA al formato {axis, value} que espera RadarChart
    // Cada país es un array de objetos → RadarChart recibe un array de esos arrays
    const radarData = radarSelected.map(geo =>
        DATA.radarLabels.map((label, i) => ({
            axis: label,
            value: DATA.radarData[geo][i] / 100  // RadarChart usa decimales (0–1) por el Format('.2%')
        }))
    );

    const container = document.getElementById("chart-uso");
    //const W = container.clientWidth  || 480;
    //const H = container.clientHeight || 360;
    //const size = Math.min(W, H) - 40;
    //const rect = container.getBoundingClientRect();
    //const W = rect.width  || 480;
    //const H = rect.height || 360;
    const rect = container.getBoundingClientRect();
    const W = Math.min(rect.width,  500);   // maximo 500px
    const H = Math.min(rect.height, 400);   // maximo 400px
    const size = Math.min(W, H) * 1.5;
    //const size = Math.min(W, H,) * 0.5;
   

    RadarChart("#chart-uso", radarData, {
        w: size,
        h: size,
        margin: { top: 20, right: 20, bottom: 20, left: 20 },
        maxValue: 1,
        levels: 4,
        roundStrokes: false,
        color: d3.scaleOrdinal()
            .domain(radarSelected)
            .range(radarSelected.map(geo => RADAR_COLORS[geo]))
    });

    // Centrar el SVG generado dentro del contenedor flex
    d3.select("#chart-uso svg")
        .style("margin", "auto")
        .style("display", "block");

    // Reconstruir la leyenda
    const legend = document.getElementById("radar-legend");
    radarSelected.forEach(geo => {
        const p = DATA.paises.find(d => d.geo === geo);
        const item = document.createElement("div");
        item.className = "legend-item";
        item.innerHTML = `<div class="legend-dot" style="background:${RADAR_COLORS[geo]}"></div>${p ? p.name : geo}`;
        legend.appendChild(item);
    });
}


/////////////////////////////////////////////////////////
/////////////// The Radar Chart Function ////////////////
/////////////// Written by Nadieh Bremer ////////////////
////////////////// VisualCinnamon.com ///////////////////
/////////// Inspired by the code of alangrafu ///////////
/////////////////////////////////////////////////////////
	
function RadarChart(id, data, options) {
	var cfg = {
	 w: 600,				//Width of the circle
	 h: 600,				//Height of the circle
	 margin: {top: 20, right: 20, bottom: 20, left: 20}, //The margins of the SVG
	 levels: 3,				//How many levels or inner circles should there be drawn
	 maxValue: 0, 			//What is the value that the biggest circle will represent
	 labelFactor: 1.25, 	//How much farther than the radius of the outer circle should the labels be placed
	 wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
	 opacityArea: 0.35, 	//The opacity of the area of the blob
	 dotRadius: 4, 			//The size of the colored circles of each blog
	 opacityCircles: 0.1, 	//The opacity of the circles of each blob
	 strokeWidth: 2, 		//The width of the stroke around each blob
	 roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
	 //color: d3.scale.category10()	//Color function
	 color: d3.scaleOrdinal(d3.schemeCategory10)
	};
	
	//Put all of the options into a variable called cfg
	if('undefined' !== typeof options){
	  for(var i in options){
		if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
	  }//for i
	}//if
	
	//If the supplied maxValue is smaller than the actual one, replace by the max in the data
	var maxValue = Math.max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));
		
	var allAxis = (data[0].map(function(i, j){return i.axis})),	//Names of each axis
		total = allAxis.length,					//The number of different axes
		radius = Math.min(cfg.w/2, cfg.h/2), 	//Radius of the outermost circle
		Format = d3.format('.2%'),			 	//Percentage formatting with 2 decimals
		angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"
	
	//Scale for the radius
	var rScale = d3.scaleLinear()
		.range([0, radius])
		.domain([0, maxValue]);
		
	/////////////////////////////////////////////////////////
	//////////// Create the container SVG and g /////////////
	/////////////////////////////////////////////////////////

	//Remove whatever chart with the same id/class was present before
	d3.select(id).select("svg").remove();
	
	//Initiate the radar chart SVG
	var svg = d3.select(id).append("svg")
			.attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
			.attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
			.attr("class", "radar"+id);
	//Append a g element		
	var g = svg.append("g")
			.attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");

	/////////////////////////////////////////////////////////
	////////// Glow filter for some extra pizzazz ///////////
	/////////////////////////////////////////////////////////
	
	//Filter for the outside glow
	var filter = g.append('defs').append('filter').attr('id','glow'),
		feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
		feMerge = filter.append('feMerge'),
		feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
		feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

	/////////////////////////////////////////////////////////
	/////////////// Draw the Circular grid //////////////////
	/////////////////////////////////////////////////////////
	
	//Wrapper for the grid & axes
	var axisGrid = g.append("g").attr("class", "axisWrapper");
	
	//Draw the background circles
	axisGrid.selectAll(".levels")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter()
		.append("circle")
		.attr("class", "gridCircle")
		.attr("r", function(d, i){return radius/cfg.levels*d;})
		.style("fill", "#CDCDCD")
		.style("stroke", "#CDCDCD")
		.style("fill-opacity", cfg.opacityCircles)
		.style("filter" , "url(#glow)");

	//Text indicating at what % each level is
	axisGrid.selectAll(".axisLabel")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter().append("text")
	   .attr("class", "axisLabel")
	   .attr("x", 4)
	   .attr("y", function(d){return -d*radius/cfg.levels;})
	   .attr("dy", "0.4em")
	   .style("font-size", "10px")
	   .attr("fill", "#737373")
	   .text(function(d,i) { return Format(maxValue * d/cfg.levels); });

	/////////////////////////////////////////////////////////
	//////////////////// Draw the axes //////////////////////
	/////////////////////////////////////////////////////////
	
	//Create the straight lines radiating outward from the center
	var axis = axisGrid.selectAll(".axis")
		.data(allAxis)
		.enter()
		.append("g")
		.attr("class", "axis");
	//Append the lines
	axis.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", function(d, i){ return rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("y2", function(d, i){ return rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2); })
		.attr("class", "line")
		.style("stroke", "white")
		.style("stroke-width", "2px");

	//Append the labels at each axis
	axis.append("text")
		.attr("class", "legend")
		.style("font-size", "11px")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("y", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })
		.text(function(d){return d})
		.call(wrap, cfg.wrapWidth);

	/////////////////////////////////////////////////////////
	///////////// Draw the radar chart blobs ////////////////
	/////////////////////////////////////////////////////////
	
	// D3 v4+
var radarLine = d3.lineRadial()
    .curve(d3.curveLinearClosed)        // interpolate("linear-closed") → curve(d3.curveLinearClosed)
    .radius(function(d) { return rScale(d.value); })
    .angle(function(d, i) { return i * angleSlice; });
		
	if (cfg.roundStrokes) {
    radarLine.curve(d3.curveCardinalClosed);
	}
				
	//Create a wrapper for the blobs	
	var blobWrapper = g.selectAll(".radarWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarWrapper");
			
	//Append the backgrounds	
	blobWrapper
		.append("path")
		.attr("class", "radarArea")
		.attr("d", function(d,i) { return radarLine(d); })
		.style("fill", function(d,i) { return cfg.color(i); })
		.style("fill-opacity", cfg.opacityArea)
		.on('mouseover', function (event, d){
			//Dim all blobs
			d3.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", 0.1); 
			//Bring back the hovered over blob
			d3.select(this)
				.transition().duration(200)
				.style("fill-opacity", 0.7);	
		})
		.on('mouseout', function(){
			//Bring back all blobs
			d3.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", cfg.opacityArea);
		});
		
	//Create the outlines	
	blobWrapper.append("path")
		.attr("class", "radarStroke")
		.attr("d", function(d,i) { return radarLine(d); })
		.style("stroke-width", cfg.strokeWidth + "px")
		.style("stroke", function(d,i) { return cfg.color(i); })
		.style("fill", "none")
		.style("filter" , "url(#glow)");		
	
	//Append the circles
	blobWrapper.selectAll(".radarCircle")
		.data(function(d,i) { return d; })
		.enter().append("circle")
		.attr("class", "radarCircle")
		.attr("r", cfg.dotRadius)
		.attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
		.style("fill", function(d,i,j) { return cfg.color(j); })
		.style("fill-opacity", 0.8);

	/////////////////////////////////////////////////////////
	//////// Append invisible circles for tooltip ///////////
	/////////////////////////////////////////////////////////
	
	//Wrapper for the invisible circles on top
	var blobCircleWrapper = g.selectAll(".radarCircleWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarCircleWrapper");
		
	//Append a set of invisible circles on top for the mouseover pop-up
	blobCircleWrapper.selectAll(".radarInvisibleCircle")
		.data(function(d,i) { return d; })
		.enter().append("circle")
		.attr("class", "radarInvisibleCircle")
		.attr("r", cfg.dotRadius*1.5)
		.attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
		.style("fill", "none")
		.style("pointer-events", "all")	
		.on("mouseover", function(event, d) {	
			newX =  parseFloat(d3.select(this).attr('cx')) - 10;
			newY =  parseFloat(d3.select(this).attr('cy')) - 10;
					
			tooltip
				.attr('x', newX)
				.attr('y', newY)
				.text(Format(d.value))  // Este es el valor que se muestra en el tooltip, formateado como porcentaje
				.transition().duration(200)
				.style('opacity', 1);
		})
		.on("mouseout", function(){
			tooltip.transition().duration(200)
				.style("opacity", 0);
		});
		
	//Set up the small tooltip for when you hover over a circle
	var tooltip = g.append("text")
		.attr("class", "tooltip")
		.style("opacity", 0);
	
	/////////////////////////////////////////////////////////
	/////////////////// Helper Function /////////////////////
	/////////////////////////////////////////////////////////

	//Taken from http://bl.ocks.org/mbostock/7555321
	//Wraps SVG text	
	function wrap(text, width) {
	  text.each(function() {
		var text = d3.select(this),
			words = text.text().split(/\s+/).reverse(),
			word,
			line = [],
			lineNumber = 0,
			lineHeight = 1.4, // ems
			y = text.attr("y"),
			x = text.attr("x"),
			dy = parseFloat(text.attr("dy")),
			tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
			
		while (word = words.pop()) {
		  line.push(word);
		  tspan.text(line.join(" "));
		  if (tspan.node().getComputedTextLength() > width) {
			line.pop();
			tspan.text(line.join(" "));
			line = [word];
			tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
		  }
		}
	  });
	}//wrap	
	
}//RadarChart



/* ----------------------------------------------------------------------------------
   SCATTER SERVICIOS PÚBLICOS
 ------------------------------------------------------------------------------------*/


function drawScatterServicios(containerId) {

  const container = document.getElementById(containerId);
  const W = container.clientWidth || 600;
  const H = container.clientHeight || 360;
  const margin = {top:20, right:20, bottom:50, left:50};
  const w = W - margin.left - margin.right;
  const h = H - margin.top - margin.bottom;

  const egov = DATA.paises;

  const svg = d3.select("#"+containerId).append("svg").attr("width",W).attr("height",H);
  const g = svg.append("g").attr("transform",`translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain([80,100]).range([0,w]);
  const y = d3.scaleLinear().domain([15,100]).range([h,0]);

  g.append("g").attr("transform",`translate(0,${h})`)
    .call(d3.axisBottom(x).ticks(6).tickFormat(d=>d))
    .call(ax=>ax.select(".domain").remove())
    .selectAll("text").style("font-size","10px").style("fill","var(--ink-light)");

  g.append("g")
    .call(d3.axisLeft(y).ticks(6).tickFormat(d=>d+"%").tickSize(-w))
    .call(ax=>ax.select(".domain").remove())
    .selectAll("line").style("stroke","var(--border)").style("stroke-width","0.5");
  g.selectAll(".tick text").style("font-size","10px").style("fill","var(--ink-light)");

  g.append("text").attr("x",w/2).attr("y",h+38).attr("text-anchor","middle")
    .style("font-size","10px").style("fill","var(--ink-light)")
    .text("Calidad e-gobierno — eGov Benchmark (puntuación 0-100)");

  g.append("text").attr("transform","rotate(-90)").attr("x",-h/2).attr("y",-38)
    .attr("text-anchor","middle").style("font-size","10px").style("fill","var(--ink-light)")
    .text("Ciudadanos que usan e-gobierno (%)");

  g.selectAll(".dot").data(egov).enter().append("circle")
    .attr("cx",d=>x(d.benchmark)).attr("cy",d=>y(d.srv))
    .attr("r",d=>(d.geo==="ES"||d.geo==="DE")?8:5)
    .attr("fill",d=>barColor(d))
    .attr("opacity",d=>(d.geo==="ES"||d.geo==="DE")?1:0.4)
    .attr("stroke",d=>(d.geo==="ES"||d.geo==="DE")?"#fff":"none")
    .attr("stroke-width",1.5)
    .on("mouseover",(event,d)=>showTip(
      `<strong>${d.name}</strong>Benchmark: ${d.benchmark.toFixed(0)}<br>Uso: ${d.srv}%`,event))
    .on("mousemove",moveTip).on("mouseout",hideTip);

  egov.filter(d=>d.geo==="ES"||d.geo==="DE").forEach(d=>{
    g.append("text").attr("x",x(d.benchmark)+10).attr("y",y(d.srv)+4)
      .style("font-size","11px").style("font-weight","600")
      .style("fill",barColor(d)).text(d.name);
  });
}

/*  ---------------------------------------------------------------------------------
   TRAYECTORIAS (cierre)
 ------------------------------------------------------------------------------------*/


function drawTrayectorias(containerId) {
  const container = document.getElementById(containerId);
  const W = container.clientWidth || 600;
  const H = container.clientHeight || 360;
  const margin = {top:30, right:120, bottom:40, left:50};
  const w = W - margin.left - margin.right;
  const h = H - margin.top - margin.bottom;

  const svg = d3.select("#"+containerId).append("svg").attr("width",W).attr("height",H);
  const g = svg.append("g").attr("transform",`translate(${margin.left},${margin.top})`);

  const years = [2018, 2025];
  const x = d3.scalePoint().domain(years).range([0,w]).padding(0.3);
  const y = d3.scaleLinear().domain([60,100]).range([h,0]);

  g.append("g").attr("transform",`translate(0,${h})`)
    .call(d3.axisBottom(x).tickFormat(d=>d))
    .call(ax=>ax.select(".domain").remove())
    .selectAll("text").style("font-size","11px").style("fill","var(--ink-mid)").style("font-weight","600");
  g.append("g")
    .call(d3.axisLeft(y).ticks(6).tickFormat(d=>d).tickSize(-w))
    .call(ax=>ax.select(".domain").remove())
    .selectAll("line").style("stroke","var(--border)").style("stroke-width","0.5");
  g.selectAll(".tick text").style("font-size","10px").style("fill","var(--ink-light)");

  //g.append("line")
  //  .attr("x1",0).attr("x2",w).attr("y1",y(80)).attr("y2",y(80))
  //  .attr("stroke","#5a9a78").attr("stroke-width",1.5).attr("stroke-dasharray","5 3");

  //g.append("text").attr("x",w+4).attr("y",y(80)+4)
  //  .style("font-size","9px").style("fill","#5a9a78").text("Obj. 2030");

  DATA.trayectorias.forEach(d=>{
    const isES = d.geo==="ES";
    const growth = (d.y2025 - d.y2018) / 6;
    const y2030proj = Math.min(88, d.y2025 + growth * 6);
    const pts = [[2018,d.y2018],[2025,d.y2025],[2030,y2030proj]];

    g.append("path")
      .datum(pts)
      .attr("fill","none")
      .attr("stroke",d.color)
      .attr("stroke-width",isES?2.5:1.5)
      .attr("opacity",isES?1:0.55)
      .attr("stroke-dasharray",p => p[2] ? "0" : "")
      .attr("d", d3.line().x(p=>x(p[0])).y(p=>y(p[1])));

    g.append("path")
      .datum([[2025,d.y2025],[2030,y2030proj]])
      .attr("fill","none")
      .attr("stroke",d.color)
      .attr("stroke-width",isES?2:1.5)
      .attr("opacity",isES?0.7:0.35)
      .attr("stroke-dasharray","5 3")
      .attr("d", d3.line().x(p=>x(p[0])).y(p=>y(p[1])));

    g.append("circle")
      .attr("cx",x(2025)).attr("cy",y(d.y2025))
      .attr("r",isES?6:4)
      .attr("fill",d.color).attr("opacity",isES?1:0.6);

    //g.append("text")
    //  .attr("x",x(2030)+8).attr("y",y(y2030proj)+4)
    //  .style("font-size",isES?"12px":"10px")
    //  .style("font-weight",isES?"600":"400")
    //  .style("fill",d.color)
    //  .text(d.name);
  });
}



/* 
   NAVEGACIÓN
*/
const SECTIONS = ["intro","conectividad","capital","uso","servicios","cierre"];
let currentSection = "intro";
let chartsDrawn = {};

function goTo(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".sidebar-link").forEach(l => {
    l.classList.toggle("active", l.dataset.section === id);
  });
  document.getElementById("sec-"+id).classList.add("active");
  currentSection = id;
  updateProgress();
  if (!chartsDrawn[id]) { drawChart(id); chartsDrawn[id] = true; }
  window.scrollTo(0,0);
}

function updateProgress() {
  const idx = SECTIONS.indexOf(currentSection);
  const dots = document.getElementById("stepDots");
  dots.innerHTML = "";
  SECTIONS.forEach((s,i) => {
    const d = document.createElement("div");
    d.className = "step-dot" + (i < idx ? " done" : "") + (i === idx ? " active" : "");
    d.onclick = () => goTo(s);
    dots.appendChild(d);
  });
  document.getElementById("progressLabel").textContent =
    ["Introducción","Conectividad","Capacidades digitales","Uso digital","Servicios públicos","El espejo europeo"][idx]
    + " · " + (idx+1) + " de 6";
}



/* IMPORTANTE: Estas funciones tienen que ser globales y deben poder alcanzarse desde el index.html*/


document.addEventListener('DOMContentLoaded', () => {
window.goTo = goTo;
window.updateProgress = updateProgress;
window.showTip = showTip;
window.moveTip = moveTip;
window.hideTip = hideTip;
});



/* ══════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════ */
updateProgress();
drawChart("intro");
chartsDrawn["intro"] = true;
