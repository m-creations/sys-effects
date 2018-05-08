// (c) 2018 m-creations GmbH - All rights reserved

import * as d3 from 'd3';

import style from './effect-graph.scss';

/**
 * @class Initialises the D3 graph and modifies it on change. 
 *
 */

class EffectGraphController {

  /**
   * @return {undefined} undefined
   */
  constructor ($element) {
    'ngInject';

    this.$element = $element;
    this.width = $($element).width();
    this.height = $($element).height();

    this.svg = d3.select(this.$element[0]).append("svg")
      .attr("width", this.width)
      .attr("height", this.height);
    this.g = null;
  }

  /**
   * @return {undefined} undefined
   */
  $onInit () {
    console.log('graph: ' + this.$element);
    this.width = this.$element.offsetWidth;
    this.height = this.width / 2;
    this.margin = {
      top: 20,
      right: 75,
      bottom: 45,
      left: 50
    };
  }

  $doCheck() {
    this.width = $(this.$element).width();
    this.height = $(this.$element).height();

    this.svg
      .attr("width", this.width)
      .attr("height", this.height);
  }

  $onChanges(changes) {
    console.log('graph: onChanges');
    if(changes.effect) {
      if(this.svg) {
        this.svg.selectAll('*').remove();
        // this is the <g> element where our tree is drawn
        this.g = this.svg.append("g")
          .attr("transform", "translate(40, 0)");
      }
      if(!changes.effect.currentValue) {
        return;
      }
      
      console.log('graph: onChanges effect: ' + changes.effect.currentValue.title);
      let effect = changes.effect.currentValue;
      let data = {
        name: effect.title,
        idx: 0,
        children: []
      };
      if(effect.related_effects) {
        data.children = effect.related_effects.map( (val, idx) => { return { name: val.title, idx: idx, children: [] }; } );
      }
      // create a hierarchy from the root
      const treeRoot = d3.hierarchy(data);
      const tree = d3.tree(treeRoot).size([300,150]);
      // nodes
      const nodes = treeRoot.descendants();
      // links
      const links = treeRoot.links(nodes);

      var link = this.svg.selectAll(".link")
          .data(links)
          .enter().append("path")
          .attr("class", "link")
          .attr("d", d3.linkHorizontal()
                .x(function(d) { return (d.depth + 1) * 100 + 40; })
                .y(function(d) { return (d.data.idx + 1) * 30 + 40; }));

      var node = this.g.selectAll("g.node")
          .data(nodes)
          .enter().append("g")
          .attr("transform", function(d) { return "translate(" + ((d.depth + 1) * 100) + "," + ((d.data.idx + 1) * 30 + 40) + ")"; });

      node.append("circle").attr("r", 4.5);
      node.append("text")
        .attr("dx", function(d) { return d.children ? -8 : 8; })
        .attr("dy", 3)
        .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
        .text(function(d) { return d.data.name; });
    }
  }
}

/**
 * @class Shows a tree of the selected effect and its related elements
 */

export const EffectGraph = {
  bindings: {
    effect: '<'
  },
  template: '<div class="tree"></div>',
  controller: EffectGraphController
};
