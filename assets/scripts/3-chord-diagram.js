"use strict";

// /**
//  * File allowing to draw the chord diagram.
//  */

/**
 * Creates the groups for the chord diagram.
 *
 * @param g               The SVG group in which the bar chart has to be drawn.
 * @param data            Data from JSON file.
 * @param layout          The layout used by the chord diagram.
 * @param arc             Function that draws acrcs.
 * @param color           The color scale that associates a distinct color to a BIXI station.
 * @param total           The total number of trips made for the month of August 2015.
 * @param formatPercent   Function allowing to correctly format a percentage from a number.
 *
 * @see https://bl.ocks.org/mbostock/4062006
 */
function createGroups(g, data, layout, arc, color, total, formatPercent) {
  /* TODO:
     - Créer les groupes du diagramme qui sont associés aux stations de BIXI fournies.
     - Utiliser un "textPath" pour que les nom de stations suivent la forme des groupes.
     - Tronquer les noms des stations de BIXI qui sont trop longs (Pontiac et Métro Mont-Royal).
     - Afficher un élément "title" lorsqu'un groupe est survolé par la souris.
  */

  var groups = g.selectAll("g")
  .data(layout.groups)
  .enter()

  groups.append("path")
  .attr("id", d => "group" + d.index)
  .style("fill", d => color(data[d.index].name))
  .style("stroke", d => color(data[d.index].name))
  .attr("d", arc)
  .classed("group", true)
  .append("svg:title")
  .text(d => titleGroup(data, d, total, formatPercent))


  groups.append("text")
  .attr("dx", 4)
  .attr("dy", 15)
  .append("textPath")
  .classed("text", true)
  .attr("xlink:href", d => "#group" + d.index)
  .text(d => tronc(data[d.index].name))
  .style("fill", "white")
  .style("font-size", "12px")

}
/**
 * Function that truncates station names «Métro Mont-Royal (Rivard/Mont-Royal)» et «Pontiac / Gilford».
 *
 * @param name    Le nom de la station qui doit etre tronqué si trop long.
 */
function tronc(name) {
  switch(name) {
    case "Pontiac / Gilford":
      return "Pontiac"
    case "Métro Mont-Royal (Rivard/Mont-Royal)":
      return "Métro Mont-Royal"
    default:
      return name
  }
}

/**
 * Returns the text that should appear when the mouse is over a group.
 *
 * @param data            Data from JSON file.
 * @param d               Data associated with the mouse over chord.
 * @param total           The total number of trips made for the month of August 2015.
 * @param formatPercent   Function allowing to correctly format a percentage from a number.
 */
function titleGroup(data, d,total, formatPercent) {
  var name = data[d.index].name
  var totStation = d3.sum(data[d.index].destinations.map(dest => dest.count))
  var percent = formatPercent(totStation/total)
  return name + ": " + percent + " des départs"
}


/**
 * Creates the chords for the chord diagram.
 *
 * @param g               The SVG group in which the bar chart has to be drawn.
 * @param data            Data from JSON file.
 * @param layout          The layout used by the chord diagram.
 * @param path            Function that draws acrcs.
 * @param color           The color scale that associates a distinct color to a BIXI station.
 * @param total           The total number of trips made for the month of August 2015.
 * @param formatPercent   Function allowing to correctly format a percentage from a number.
 *
 * @see https://beta.observablehq.com/@mbostock/d3-chord-dependency-diagram
 */
function createChords(g, data, layout, path, color, total, formatPercent) {
  /* TODO:
     - Créer les cordes du diagramme avec une opacité de 80%.
     - Create the diagram's chords with an 80% opacity.
     - Create the diagram's chords with an 80% opacity.
     - Show a "title" element when a chord is hovered by the user's mouse.
  */
  g.selectAll("g")
    .data(layout)
    .enter()
    .append("path")
    .attr("d", path)
    .classed("chord", true)
    .style("fill", d => color(data[d.source.index].name))
    .append("svg:title")
    .text(d => titleChord(data, d, total, formatPercent))
}

/**
 *  Returns the text that should appear when the mouse is over the chord.
 *
 * @param data            Data from JSON file.
 * @param d               Data associated with the mouse over chord.
 * @param total           The total number of trips made for the month of August 2015.
 * @param formatPercent   Function allowing to correctly format a percentage from a number.
 */
function titleChord(data, d, total, formatPercent) {
  var nameChordSource = data[d.source.index].name
  var nameChordTarget = data[d.target.index].name
  var percentSource = formatPercent(data[d.source.index].destinations[d.target.index].count/total)
  var percentTarget = formatPercent(data[d.target.index].destinations[d.source.index].count/total)
  return nameChordSource + " → " + nameChordTarget + ": " + percentSource + "\n"
      +  nameChordTarget + " → " + nameChordSource + ": " + percentTarget
}



/**
 * initializes the logic when a chord from the chord diagram is hovered.
 *
 * @param g     The SVG group in which the bar chart is drawn.
 */
function initializeGroupsHovered(g) {
  /* TODO:
     - When a group is hovered, show the incoming and outgoing chords for this groups with an 80% opacity.
       The other chords have to drawn with an 10% opacity.
     - Reset the default style for the diagram when the user mouse's leaves the diagram's group.
  */
  g.selectAll(".group")
  .on("mouseenter", function(group) {
  g.selectAll(".chord").classed("fade", function(chord) {
    return !(group.index === chord.source.index || group.index === chord.target.index)
     })
  })
}
