/* global d3, turf */
var centroid = turf.centroid;
var bboxPoly = turf.bboxPolygon;
var extent = turf.extent;
var area = turf.area;

var mainDiv = document.getElementById('gallery');

var w = 300,
    h = 300;

var projection = d3.geo.mercator()
    .translate([w / 2, h / 2]);

var path = d3.geo.path()
    .projection(projection);

function render(ls, id) {
    var div = document.createElement('div');
    mainDiv.appendChild(div);
    div.setAttribute('id', 'r' + id);

    var bbox = bboxPoly(extent(ls));
    var scale = area(bbox) / 2;

    projection
        .scale(scale)
        .center(centroid(bbox).geometry.coordinates);

    var svg = d3.select('#r' + id).append('svg')
        .attr('class', 'map')
        .attr('width', w)
        .attr('height', h);

    svg.append('path')
        .datum(ls)
        .attr('d', path)
        .attr('x', 100)
        .attr('y', 100)
        .style('stroke', '#000')
        .style('stroke-width', '0.5px')
        .style('fill', 'none');

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
