const height = 300;
const width = 300;

const margin = {
  top: 20,
  right: 0,
  bottom: 30,
  left: 40,
};

const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

const data = [
  { name: "Z", value: 0.00074 },
  { name: "Q", value: 0.00095 },
  { name: "X", value: 0.0015 },
  { name: "J", value: 0.00153 },
  { name: "K", value: 0.00772 },
  { name: "V", value: 0.00978 },
  { name: "B", value: 0.01492 },
  { name: "P", value: 0.01929 },
  { name: "Y", value: 0.01974 },
  { name: "G", value: 0.02015 },
  { name: "F", value: 0.02288 },
  { name: "W", value: 0.0236 },
  { name: "M", value: 0.02406 },
  { name: "U", value: 0.02758 },
  { name: "C", value: 0.02782 },
  { name: "L", value: 0.04025 },
  { name: "D", value: 0.04253 },
  { name: "R", value: 0.05987 },
  { name: "H", value: 0.06094 },
  { name: "S", value: 0.06327 },
  { name: "N", value: 0.06749 },
  { name: "I", value: 0.06966 },
  { name: "O", value: 0.07507 },
  { name: "A", value: 0.08167 },
  { name: "T", value: 0.09056 },
  { name: "E", value: 0.12702 },
];

const x = d3
  .scaleBand()
  .domain(data.map((d) => d.name))
  .range([margin.left, width - margin.right])
  .padding(0.1);

const y = d3
  .scaleLinear()
  .domain([0, d3.max(data, (d) => d.value)])
  .nice()
  .range([height - margin.bottom, margin.top]);

const xAxis = (g) =>
  g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0));

const yAxis = (g) =>
  g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call((g) => g.select(".domain").remove());

const bar = svg
  .append("g")
  .attr("fill", "steelblue")
  .selectAll("rect")
  .data(data)
  .join("rect")
  .style("mix-blend-mode", "multiply")

  .attr("x", (d) => x(d.name))
  .attr("y", (d) => y(d.value))
  .attr("height", (d) => y(0) - y(d.value))
  .attr("width", x.bandwidth());

const gx = svg.append("g").call(xAxis);

const gy = svg.append("g").call(yAxis);

const chart = Object.assign(svg.node(), {
  update(order) {
    x.domain(data.sort(order).map((d) => d.name));

    const t = svg.transition().duration(750);

    bar
      .data(data, (d) => d.name)
      .order()
      .transition(t)
      .delay((d, i) => i * 20)
      .attr("x", (d) => x(d.name));

    gx.transition(t)
      .call(xAxis)
      .selectAll(".tick")
      .delay((d, i) => i * 20);
  },
});

const options = [
  { label: "Alphabetical", value: (a, b) => a.name.localeCompare(b.name) },
  { label: "Frequency, ascending", value: (a, b) => a.value - b.value },
  { label: "Frequency, descending", value: (a, b) => b.value - a.value },
];

const form = d3.select("form");

console.log(form);

form
  .on("change", (x) => {
    clearTimeout(5000);
    form.value = options.find((b) => b.label === x.target.value).value;
    form.dispatchEvent(new CustomEvent("input"));
  })
  .append("select")
  .attr("name", "i")
  .selectAll("option")
  .data(options)
  .join("option")
  .text((x) => x.label);

document.getElementById("root").append(chart);
