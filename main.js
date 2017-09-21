import * as d3 from 'd3';

var filename = 'data/fileB.txt';

d3.text(filename, function(error, text) {
    if (error) throw error;

    let rects = [];
    let loc = []

    let line_padding = 1;
    let rect_w = 3;
    let line_h = 2;
    
    let lines = text.split('\n');

    let current_x = 0;
    let current_y = 0;

    let width = 0;

    for(let line of lines) {

    	
    	let new_width = line.length * rect_w
    	
    	if(new_width > width) {
    		width = new_width;
    	}

    	loc.push( {
    		x: 0,
    		y: current_y,
    		w: rect_w,
    		h: line_h
    	})
    
    	for(let letter of line) {
    
    		if(letter !== ' ') {
    			rects.push({
    				x: current_x,
    				y: current_y,
    				w: rect_w,
    				h: line_h
    			})
    		}
    		current_x += rect_w;
    	}

    	//reset x pos
    	current_x = 0;

    	//move y pos down
    	current_y += line_h + line_padding;
    }

    //calc svg_width
    let height = ((rects.length * line_h) * line_padding) + 2;
    width += 17
    
    let svg = d3.select('body').append('svg')
    	.attr('width', width)
    	.attr('height', height)

    let line_numbers = svg.append('g')
    	.attr('transform', (d) => { return `translate(${1},${1})` });
    
    let line_rects = svg.append('g')
        .attr('transform', (d) => { return `translate(${16},${1})` });

    line_numbers.selectAll('rect')
    	.data(loc)
    	.enter()
    	.append('rect')
    		.attr('width', function(d) { return d.w })
    		.attr('height', function(d) { return d.h })
    		.attr('x', function(d) { return d.x })
    		.attr('y', function(d) { return d.y })
    		.attr('fill', '#387D7A')


    line_rects.selectAll('rect')
    	.data(rects)
    	.enter()
    	.append('rect')
    		.attr('width', function(d) { return d.w })
    		.attr('height', function(d) { return d.h })
    		.attr('x', function(d) { return d.x })
    		.attr('y', function(d) { return d.y })
    		.attr('fill', '#5C5552')
    		//.attr('stroke', 'black');
});

// svg height = number of lines * 10px?
// svg width = ??
// each char is 10x10px