import { latestReadings } from "./readings.js";

displayData(latestReadings)

function displayData (readings){
  let timeDate = [];
  let soilMoisture = [];
  let lightIntensity = [];
  let temperature = [];
  let relHumidity = [];
  for (let reading of readings){
    timeDate.push(reading.timestamp);
    soilMoisture.push(reading.soil_moisture);
    lightIntensity.push(reading.light_intensity)
    temperature.push(reading.temp);
    relHumidity.push(reading.relative_humidity);
  }
  let xStart = timeDate[0];
  //console.log(xStart)
  let xEnd = timeDate.slice(-1)[0];
  //console.log(xEnd);


  let trace1 = {
    x: timeDate,
    y: soilMoisture,
    name: 'Soil Moisture',
    type: 'scatter',
    line: {
      color: '#1a7beb'
    }
  };
  
  let trace2 = {
    x: timeDate,
    y: lightIntensity,
    name: 'Light Intensity',
    yaxis: 'y2',
    type: 'scatter',
    line:{
      color: '#ffcc66'
    }
  };

  let trace3 = {
    x: timeDate,
    y: relHumidity,
    name: 'Humidity',
    yaxis: 'y',
    type: 'scatter'
  };

  let trace4 = {
    x: timeDate,
    y: temperature,
    name: 'Temperature',
    yaxis: 'y2',
    type: 'scatter',
    line:{
      color: '#ffcc66'
    }
  };
  
  let data = [trace1, trace2];
  let data2 = [trace3, trace4];
  
  let layout = {
    //paper_bgcolor: '#fafa6e',
    //plot_bgcolor:'#fafa6e',
    title: { 
      text: 'SOIL MOISTURE, LIGHT INTENSITY',
      font: {
        color: 'grey',
      }
    },
    yaxis: {
      title: {
        text: 'Soil Moisture',
        font: { color: 'grey' }
      },
      autorange:'reversed',
      range:[1332, 1400]
    },
    yaxis2: {
      title: {
        text: 'Light Intensity',
        font: { color: 'grey' }
      },
      range:[-1000, 70000],
      tickfont: { color: 'rgb(255, 204, 102)' },
      overlaying: 'y',
      side: 'right'
    },
    shapes:[
      {
        type:'line',
        x0:`${xStart}`,
        y0:1370,
        x1:`${xEnd}`,
        y1: 1370,
        line: {
          color: '#f08490',
          width: 4,
          dash: 'dashdot'
        },
        label: {
          text: 'Dry if blue line crosses this',
          font: { size: 10, color: '#f08490' },
          textposition: 'top center',
        },
      },
      {
        type:'line',
        x0:`${xStart}`,
        y0:1335,
        x1:`${xEnd}`,
        y1: 1335,
        line: {
          color: '#f08490',
          width: 4,
          dash: 'dashdot'
        },
        label: {
          text: 'Wet if blue line crosses this',
          font: { size: 10, color: '#f08490' },
          yanchor: 'top'
        },
      }
    ]    
  }

  let layout2 = {
    title: { 
      text: 'TEMPERATURE, HUMIDITY',
      font: {
        color:'grey'
      }       
    },
    yaxis: {
      title: {
        text: 'Humidity',
        font: { color: 'grey' }
      }
    },
    yaxis2: {
      title: {
        text: 'Temperature',
        font: { color: 'grey' }
      },
      tickfont: { color: 'rgb(255, 204, 102)' },
      overlaying: 'y',
      side: 'right'
    }  
  };

  // Responsive width
  let  config = {responsive: true}
  
  stopSpinner()
  Plotly.newPlot('sensor1', data, layout, config);
  Plotly.newPlot('sensor2', data2, layout2, config);
}

function stopSpinner(){
  let spinner = document.getElementById('spinner');
  spinner.style.display = 'none';
}

