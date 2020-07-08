// inilisiasi websocket connection (setiap node di stop, jangan lupa ganti IP publicnya)
var socket = io.connect('3.236.153.188:3000');

var suhuChart;
var suhuData = [
    {
      values: [],     
      key: 'Min Suhu', 
      color: '#42b3ab'  
    },
    {
      values: [],     
      key: 'Avg Suhu', 
      color: '#428ab3'  
    },
    {
      values: [],     
      key: 'Max Suhu', 
      color: '#424db3'  
    }
    ];

nv.addGraph(function(){
    suhuChart = nv.models.lineChart()
                  .margin({left: 50, right: 30})
                  .useInteractiveGuideline(true)
                  .showLegend(true)
                  .showYAxis(true)
                  .showXAxis(true);

    suhuChart.xAxis
            .axisLabel('Waktu')
            .tickFormat(function(d){return d3.time.format('%H:%M:%S')(new Date(d));});

    suhuChart.yAxis
            .axisLabel('Suhu')
            .tickFormat(d3.format('.2f'));

    d3.select('#suhu')
        .append('svg')
        .datum(suhuData)
        .transition().duration(100)
        .call(suhuChart);

    nv.utils.windowResize(function() { suhuChart.update(); });
    return suhuChart;
});

var kelembapanChart;
var kelembapanData = [
    {
      values: [],      
      key: 'Min Kelembapan', 
      color: '#59b342'  
    },
    {
      values: [],      
      key: 'Avg Kelembapan', 
      color: '#42b37b'  
    },
    {
      values: [],      
      key: 'Max Kelembapan', 
      color: '#42b393'  
    }
    ];

nv.addGraph(function(){
    kelembapanChart = nv.models.lineChart()
                  .margin({left: 50, right: 30})
                  .useInteractiveGuideline(true)
                  .showLegend(true)
                  .showYAxis(true)
                  .showXAxis(true);

    kelembapanChart.xAxis
            .axisLabel('Waktu')
            .tickFormat(function(d){return d3.time.format('%H:%M:%S')(new Date(d));});

    kelembapanChart.yAxis
            .axisLabel('Kelembapan')
            .tickFormat(d3.format('.2f'));

    d3.select('#kelembapan')
        .append('svg')
        .datum(kelembapanData)
        .transition().duration(100)
        .call(kelembapanChart);

    nv.utils.windowResize(function() { kelembapanChart.update(); });
    return kelembapanChart;
});


var phChart;
var phData = [
    {
      values: [],      
      key: 'Min pH', 
      color: '#b39942'  
    },
    {
      values: [],      
      key: 'Avg pH', 
      color: '#b38a42'  
    },
    {
      values: [],      
      key: 'Max pH', 
      color: '#b37742'  
    }
    ];

nv.addGraph(function(){
    phChart = nv.models.lineChart()
                  .margin({left: 50, right: 30})
                  .useInteractiveGuideline(true)
                  .showLegend(true)
                  .showYAxis(true)
                  .showXAxis(true);

    phChart.xAxis
            .axisLabel('Waktu')
            .tickFormat(function(d){return d3.time.format('%H:%M:%S')(new Date(d));});

   phChart.yAxis
            .axisLabel('pH')
            .tickFormat(d3.format('.2f'));

    d3.select('#ph')
        .append('svg')
        .datum(phData)
        .transition().duration(100)
        .call(phChart);

    nv.utils.windowResize(function() { phChart.update(); });
    return phChart;
});


//--------------------------------------Socket.io event handlers------------------------------------

socket.on('hasilmin', function (data) {
  var msg = JSON.parse(data);
  suhuData[0].values.push({x: new Date(msg[0]), y: Number(msg[1][0])});
  kelembapanData[0].values.push({x: new Date(msg[0]), y: Number(msg[1][1])});
  phData[0].values.push({x: new Date(msg[0]), y: Number(msg[1][2])});

  if(suhuData[0].values.length > 30) {
    suhuData[0].values.shift();
  }
  suhuChart.update();

  if(kelembapanData[0].values.length > 30) {
    kelembapanData[].values.shift();
  }
  kelembapanChart.update();

  if(phData[0].values.length > 30) {
    phData[0].values.shift();
  }
  phChart.update();
});

socket.on('hasilavg', function (data) {
        var msg = JSON.parse(data);
  suhuData[1].values.push({x: new Date(msg[0]), y: Number(msg[1][0])});
  kelembapanData[1].values.push({x: new Date(msg[0]), y: Number(msg[1][1])});
  phData[1].values.push({x: new Date(msg[0]), y: Number(msg[1][2])});

  if(suhuData[1].values.length > 30) {
    suhuData[1].values.shift();
  }
  suhuChart.update();

  if(kelembapanData[1].values.length > 30) {
    kelembapanData[1].values.shift();
  }
  kelembapanChart.update();

  if(phData[1].values.length > 30) {
    phData[1].values.shift();
  }
  phChart.update();
});

socket.on('hasilmax', function (data) {
  var msg = JSON.parse(data);
  suhuData[2].values.push({x: new Date(msg[0]), y: Number(msg[1][0])});
  kelembapanData[2].values.push({x: new Date(msg[0]), y: Number(msg[1][1])});
  phData[2].values.push({x: new Date(msg[0]), y: Number(msg[1][2])});
  if(suhuData[2].values.length > 30) {
    suhuData[2].values.shift();
  }
  suhuChart.update();

  if(kelembapanData[2].values.length > 30) {
    kelembapanData[2].values.shift();
  }
  kelembapanChart.update();

  if(phData[2].values.length > 30) {
    phData[2].values.shift();
  }
  phChart.update();
});

// Buat Charts

// Line Chart Data Primer

//var dataprimerChart;
//var dataprimerData = [
 //   {
   //   values: [],      //representasi nilai titik x dan y
     // key: 'Suhu (Celcius)', //Nilai serinya di chart
      //color: '#42b38b' //warna garis
    //},
    //{
     // values: [],      //representasi nilai titik x dan y
      //key: 'Kelembapan (%)', //Nilai serinya di chart
      //color: '#7cb342' //warna garis
    //},
    //{
     // values: [],      //representasi nilai titik x dan y
      //key: 'pH', //Nilai serinya di chart
      //color: '#afb342' //warna garis
    //}
    //];

// Rata-Rata Chart
//socket.on('data-sensor-primer', function (data) {
 // var msg = JSON.parse(data);
  //dataprimerData[0].values.push([x: new Date(msg[0]), y: Number(msg[1].value)]);
  //dataprimerData[1].values.push([x: new Date(msg[0]), y: Number(msg[2].value)]);
  //dataprimerData[2].values.push([x: new Date(msg[0]), y: Number(msg[3].value)]);
  //if(dataprimerData[0].values.length > 30) {
    //dataprimerData[0].values.shift();
    //dataprimerData[1].values.shift();
    //dataprimerData[2].values.shift();
  //}
  //dataprimerChart.update();
//});