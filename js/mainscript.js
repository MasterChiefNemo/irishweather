function alerted(){
    var request = new XMLHttpRequest(), location = document.getElementById("location").value, measure;
    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + ",IE&appid=267da990896ed4171e17aeac2c355e6d&units=";

    if(document.getElementById('metric').checked){
        measure = document.getElementById('metric').value;
        url = url + measure;
    }
    else if(document.getElementById('imperial').checked){
        measure = document.getElementById('imperial').value;
        url = url + measure;
    }
    
    request.onreadystatechange = function(){
        if(request.readyState == XMLHttpRequest.DONE){
            if(request.status == 200){
                if(url.includes("metric")){
                    var z = JSON.parse(request.responseText), string = z["list"], direction = "";

                    if(string[0].wind.deg < 22.5 && string[0].wind.deg > 337.6){
                        direction = "North";
                    }
                    else if(string[0].wind.deg > 22.6 && string[0].wind.deg < 67.5){
                        direction = "North East";
                    }
                    else if(string[0].wind.deg > 67.6 && string[0].wind.deg < 112.5){
                        direction = "East";
                    }
                    else if(string[0].wind.deg > 112.6 && string[0].wind.deg < 157.5){
                        direction = "South East";
                    }
                    else if(string[0].wind.deg > 157.6 && string[0].wind.deg < 202.5){
                        direction = "South";
                    }
                    else if(string[0].wind.deg > 202.6 && string[0].wind.deg < 247.5){
                        direction = "South West";
                    }
                    else if(string[0].wind.deg > 247.6 && string[0].wind.deg < 292.5){
                        direction = "West";
                    }
                    else if(string[0].wind.deg > 292.6 && string[0].wind.deg < 337.5){
                        direction = "North West";
                    }
                    else{}

                    var zero = "<b>Forcast for " + location + "<br>Date and Time: " + string[0].dt_txt + "<br>Temperature: " + string[0].main.temp + "<sup>o</sup>C<br>Feels Like: " + string[0].main.feels_like + "<sup>o</sup>C<br>Minimum Temperature: " + string[0].main.temp_min + "<sup>o</sup>C<br>Maximum Temperature: " + string[0].main.temp_max + "<sup>o</sup>C<br>Wind Speed: " + string[0].wind.speed + " kph<br>Wind Direction: " + direction;
                    document.getElementById("firstoutput").innerHTML = zero;
                }
                if(url.includes("imperial")){
                    var z = JSON.parse(request.responseText), string = z["list"], direction = "";

                    if(string[0].wind.deg < 22.5 && string[0].wind.deg > 337.6){
                        direction = "North";
                    }
                    else if(string[0].wind.deg > 22.6 && string[0].wind.deg < 67.5){
                        direction = "North East";
                    }
                    else if(string[0].wind.deg > 67.6 && string[0].wind.deg < 112.5){
                        direction = "East";
                    }
                    else if(string[0].wind.deg > 112.6 && string[0].wind.deg < 157.5){
                        direction = "South East";
                    }
                    else if(string[0].wind.deg > 157.6 && string[0].wind.deg < 202.5){
                        direction = "South";
                    }
                    else if(string[0].wind.deg > 202.6 && string[0].wind.deg < 247.5){
                        direction = "South West";
                    }
                    else if(string[0].wind.deg > 247.6 && string[0].wind.deg < 292.5){
                        direction = "West";
                    }
                    else if(string[0].wind.deg > 292.6 && string[0].wind.deg < 337.5){
                        direction = "North West";
                    }
                    else{}

                    var zero = "<b>Forcast for " + location + "<br>Date and Time: " + string[0].dt_txt + "<br>Temperature: " + string[0].main.temp + "<sup>o</sup>F<br>Feels Like: " + string[0].main.feels_like + "<sup>o</sup>F<br>Minimum Temperature: " + string[0].main.temp_min + "<sup>o</sup>F<br>Maximum Temperature: " + string[0].main.temp_max + "<sup>o</sup>F<br>Wind Speed: " + string[0].wind.speed + " mph<br>Wind Direction: " + direction;
                    document.getElementById("firstoutput").innerHTML = zero;
                }
            }
            else if(request.status == 400){
                window.alert('The get request is malformed for the service is down!');
            }
            else{
                window.alert('Did you enter a location and chose a measurement system?');
            }
        }
    };
    request.open("GET", url, true);
    request.send();
}

window.onload = function(){
    $("submit").onclick = alerted();
    $("location").focus();
};