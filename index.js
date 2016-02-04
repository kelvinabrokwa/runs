/* global d3 */
var mainDiv = document.getElementById('gallery');

var w = 300,
    h = 300;

function render(ls, id) {
    var div = document.createElement('div');
    mainDiv.appendChild(div);
    div.setAttribute('id', 'r' + id);

    var projection = d3.geo.mercator()
        .scale(1)
        .translate([0, 0]);

    var path = d3.geo.path()
        .projection(projection);

    var b = path.bounds(ls);
    var s = .95 / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / h);
    var t = [(w - s * (b[1][0] + b[0][0])) / 2, (h - s * (b[1][1] + b[0][1])) / 2];

    projection
        .scale(s)
        .translate(t);

    var svg = d3.select('#r' + id).append('svg')
        .attr('class', 'map')
        .attr('width', w)
        .attr('height', h);

    svg.append('path')
        .datum(ls)
        .attr('d', path)
        .attr('class', 'ls');
}

function main(error, data) {
    if (error) {
        throw error;
    }

    var feats = data.features;

    for (var i = 0; i < feats.length; i++) {
        render(feats[i], i);
    }
}

var icon = document.getElementById('about-icon');
var about = document.getElementById('about');
icon.addEventListener('mouseover', iconMouseOver);
icon.addEventListener('mouseleave', iconMouseLeave);

function iconMouseOver() {
    about.style.visibility = 'visible';
}

function iconMouseLeave() {
    about.style.visibility = 'hidden';
}

d3.json('./runs.geojson', main);
