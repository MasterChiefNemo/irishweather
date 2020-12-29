function compare(){
    var firstrequest = new XMLHttpRequest(), secondrequest = new XMLHttpRequest(), measurement;
    var location1 = document.getElementById("locationA").value, location2 = document.getElementById("locationB").value;
    var urlA = "https://api.openweathermap.org/data/2.5/forecast?q=" + location1 + ",IE&appid=267da990896ed4171e17aeac2c355e6d&units=";
    var urlB = "https://api.openweathermap.org/data/2.5/forecast?q=" + location2 + ",IE&appid=267da990896ed4171e17aeac2c355e6d&units=";
    var array1 = [], array2 = [];

    if(document.getElementById('metA').checked){
        measurement = document.getElementById('metA').value;
        urlA = urlA + measurement;
        urlB = urlB + measurement;
    }
    else if(document.getElementById('impA').checked){
        measurement = document.getElementById('impA').value;
        urlA = urlA + measurement;
        urlB = urlB + measurement;
    }
    
    firstrequest.onreadystatechange = function(){
        if(firstrequest.readyState == XMLHttpRequest.DONE){
            if(firstrequest.status == 200){
                if(urlA.includes("metric")){
                    var z = JSON.parse(firstrequest.responseText);
                    for(var i = 0; i < 5; i++){
                        var string = z["list"];
                        array1.push(string[i].main.temp);
                    }

                    var layout = {
                        title: 'Temperature Forecast for ' + location1,
                        barmode: 'stack'
                    };

                    var data = [
                    {
                        x: [string[0].dt_txt, string[1].dt_txt, string[2].dt_txt, string[3].dt_txt, string[4].dt_txt],
                        y: [array1[0], array1[1], array1[2], array1[3], array1[4]],
                        type: 'line'
                    }]; 
                    Plotly.newPlot('graphA', data, layout);
                }
                else if(urlA.includes("imperial")){
                    var z = JSON.parse(firstrequest.responseText);
                    for(var i = 0; i < 5; i++){
                        var string = z["list"];
                        array1.push(string[i].main.temp);
                    }

                    var layout = {
                        title: 'Temperature Forecast for ' + location1,
                        barmode: 'stack'
                    };

                    var data = [
                    {
                        x: [string[0].dt_txt, string[1].dt_txt, string[2].dt_txt, string[3].dt_txt, string[4].dt_txt],
                        y: [array1[0], array1[1], array1[2], array1[3], array1[4]],
                        type: 'line'
                    }]; 
                    Plotly.newPlot('graphA', data, layout);
                }
            }
            else if(firstrequest.status == 400){
                window.alert('The get request is malformed for the service is down!');
            }
            else{
                window.alert('Did you enter a location and chose a measurement system?');
            }
        }
    };

    secondrequest.onreadystatechange = function(){
        if(secondrequest.readyState == XMLHttpRequest.DONE){
            if(secondrequest.status == 200){
                if(urlB.includes("metric")){
                    var z = JSON.parse(secondrequest.responseText);

                    for(var i = 0; i < 5; i++){
                        var string = z["list"];
                        array2.push(string[i].main.temp);
                    }

                    var layout = {
                        title: 'Temperature Forecast for ' + location2,
                        barmode: 'stack'
                    };

                    var data = [
                    {
                        x: [string[0].dt_txt, string[1].dt_txt, string[2].dt_txt, string[3].dt_txt, string[4].dt_txt],
                        y: [array2[0], array2[1], array2[2], array2[3], array2[4]],
                        type: 'line'
                    }]; 
                    Plotly.newPlot('graphB', data, layout);
                }
                else if(urlB.includes("imperial")){
                    var z = JSON.parse(secondrequest.responseText);

                    for(var i = 0; i < 5; i++){
                        var string = z["list"];
                        array2.push(string[i].main.temp);
                    }

                    var layout = {
                        title: 'Temperature Forecast for ' + location2,
                        barmode: 'stack'
                    };

                    var data = [
                    {
                        x: [string[0].dt_txt, string[1].dt_txt, string[2].dt_txt, string[3].dt_txt, string[4].dt_txt],
                        y: [array2[0], array2[1], array2[2], array2[3], array2[4]],
                        type: 'line'
                    }]; 
                    Plotly.newPlot('graphB', data, layout);
                }
            }
            else if(secondrequest.status == 400){
                window.alert('There was an error 400');
            }
            else{
                window.alert('something else other than 200 was returned');
            }
        }
    };

    firstrequest.open("GET", urlA, true);
    secondrequest.open("GET", urlB, true);
    firstrequest.send();
    secondrequest.send();
}

window.onload = function(){
    $("submit").onclick = compare();
    $("location").focus();
};