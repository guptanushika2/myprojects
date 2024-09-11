let apikey = "ed8c37818a944c29adf40311232510";
let cityEle = document.querySelector(".city");
let tempEle = document.querySelector(".temp");
let iconEle = document.querySelector(".icon");
let humidEle = document.querySelector(".hum");

let input = document.querySelector(".cityInput");
let btn = document.querySelector("#search-addon");


btn.addEventListener('click',function(){
    let city = input.value;
    input.value = "";

    getData(city);
});



async function getData(city="New York"){
    let data = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}&aqi=no`);
    data = await data.json();
    console.log("data",data);
    screenUpdate(data);
};



function screenUpdate(obj){
    let temp = obj.current.temp_c;
    let cityName = obj.location.name;
    let humidity = obj.current.humidity;
    let icon = obj.current.condition.icon;

    // console.table([temp , cityName , humidity , icon])

    tempEle.innerHTML = temp ;
    cityEle.innerHTML = cityName;
    humidEle.innerHTML = humidity;
    iconEle.src = icon;
}