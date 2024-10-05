// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metaData = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let filteredData = metaData.filter(sampleObj => sampleObj.id == sample);
    let result = filteredData[0];
    console.log("Data: ", result);

    // Use d3 to select the panel with id of `#sample-metadata`
    let sampleData = d3.select("#sample-metadata");
    console.log("Sample data is: ", sampleData);

    // Use `.html("") to clear any existing metadata
    sampleData.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (key in result){
      sampleData.append("h6").text(`${key.toUpperCase()} : ${result[key]}`);
    };
  });
};


// function to build both charts
function buildCharts(sample) {
  d3.json("https:static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let fData = samples.filter(sampleObj => sampleObj.id == sample);
    let result = fData[0];
    console.log("Data: ", result);

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    // Build a Bubble Chart
    let bubbleLabels = {
      title : "Bacteria Cultures Per Sample",
      xaxis : {title: "OTU ID"},
      yaxis : {title: "Number of Bacteria"}
    };
    let bubbleData = {
      x : otu_ids,
      y : sample_values,
      text: otu_ids,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
      }
    };

    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleLabels, bubbleData);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let slicedYData = result.otu_ids.slice(0,10);
    slicedYData.reverse();
    //let sortedXData = result.sample_values.sort((a,b) => b.sample_values - a.sample_values);
    let xData = result.sample_values.slice(0,10).reverse();



    let barData = {
      x: xData.map(object => object.sample_values), 
      y : slicedYData.map(object => object.otu_ids), 
      text: xData,
      type: "bar",
      orientation: "h",
    };

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let barLabels = {
      title : "Top 10 Bacteria Cultures Found",
      xaxis : {title: "Number of Bacteria"}
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", barData, barLabels);
  });
};

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropDown = d3.select("#selDataset");
    console.log("Dropdown options: ", dropDown);

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (id in names){
      dropDown.append("Options").attr("value", id).text(id);
    };

    // Get the first sample from the list
    let first = names[0];
    console.log(first);

    // Build charts and metadata panel with the first sample
    buildCharts(first);
    buildMetadata(first);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
