let margin = {left: 30, top: 10, right: 20, bottom: 30};
let width = 500 - margin.left - margin.right;
let height = 300 - margin.bottom - margin.top;
let bd = d3.select('body');
let svg = bd.append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)

let data = [
  {
    time: 0,
    value: 10,
  },
  {
    time: 1,
    value: 80,
  },
  {
    time: 2,
    value: 100,
  },
  {
    time: 3,
    value: null,
  },
  {
    time: 4,
    value: 60,
  },
  {
    time: 5,
    value: 50,
  },{
    time: 6,
    value: 20,
  },
  {
    time: 7,
    value: 90,
  },
  {
    time: 8,
    value: 10,
  },
]

let x = d3.scaleLinear().range([0, width]).domain(d3.extent(data, d => d.time))
let y = d3.scaleLinear().range([height, 0]).domain([0, 200])

let g = svg.append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

g.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(0,' + height + ')')
  .call(d3.axisBottom(x))

g.append('g')
  .attr('class', 'axis')
  .call(d3.axisLeft(y))

var line = d3.line()
  .curve(d3.curveMonotoneX)
  .defined(function (d) { return d.value !== null; })
  .x(function(d) { return x(d.time); })
  .y(function(d) { return y(d.value); });
  

g.append('g')
  .attr('class', 'trace')
  .append('path')
  .attr('d', line(data))
