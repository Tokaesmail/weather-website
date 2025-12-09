var inputElement=document.querySelector(".search-input")
var findBtn=document.querySelector(".search-btn")


let APY_KEY='3cb9d3f55a7242e48de145043250612';
let BASE_URL=`https://api.weatherapi.com/v1/forecast.json?key=${APY_KEY}&days=3&q=`;

async function Api(cityName="cairo"){
    showLoading();
    const response = await fetch(BASE_URL+cityName);
    const data = await response.json();

    displayWeather(data);
    return data;
}

async function getWeather(cityName){
    const data= await Api(cityName);
    console.log(data);
}
// getWeather();
getlocation();

function showLoading() {
    document.querySelector(".cards-container").innerHTML = `
        <div class="d-flex justify-content-center align-items-center" style="min-height: 400px;">
            <div class="spinner-border text-info" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;
}

let count=0;
let inpFun;

inputElement.addEventListener("input",function(){
    clearTimeout(inpFun);
    inpFun= setTimeout( ()=>{
        getWeather(this.value);
    },800)
})


findBtn.addEventListener("click",function(){

    const cityName = inputElement.value;
    if(cityName) {
        getWeather (cityName);
    }});

    function getlocation(){
        navigator.geolocation.getCurrentPosition(displayLocation)
    }

    function displayLocation(position){
        console.log(position)
        const lat=position.coords.latitude
        const long=position.coords.longitude
        getWeather(`${lat},${long}`)
        return displayLocation
    }

function displayWeather(data){

    const{location, current,forecast}=data;
    const{name}=location;
    const{temp_c, condition ,wind_kph , humidity }=current;
    const {text , icon}=condition;
    const{forecastday}=forecast;
    
    const dataTime=new Date(location.localtime);
    const Day=dataTime.getDate();
    const month=dataTime.toLocaleDateString('en-US',{month:'long'});
    
    //^ day0
    const day0 =forecastday[0].day;
    const{maxtemp_c, mintemp_c,condition:forecastCondition}=day0;
    const{text:forecastText, icon:forecastIcon}=forecastCondition;
    
    //^ day1
    const day1 =forecastday[1].day;
    const{maxtemp_c:day1Maxtemp, mintemp_c:day1Mintemp,condition:day1Condition}=day1;
    const{text:day1Text, icon:day1Icon}=day1Condition;
    
    const day1Date=new Date(forecastday[1].date);
    const day1Day=day1Date.toLocaleDateString('en-US',{weekday:'long'});
    //^ day2
    const day2 =forecastday[2].day;
    const{maxtemp_c:day2Maxtemp, mintemp_c:day2Mintemp,condition:day2Condition}=day2;
    const{text:day2Text, icon:day2Icon}=day2Condition;

    const day2Date= new Date(forecastday[2].date)
    const day2Day= day2Date.toLocaleDateString('en-us',{weekday:'long'})
    

    var Weather="";
        Weather=`
        <div class="cards">
            <div class="border-0 position-relative">
                <div class="box border-0 row row-cols-md-1 row-cols-lg-3 w-75 container-xlg position-absolute start-50 translate-middle">
                    <div class="card text-white p-0 border-0">
                        <div class="inner">
                            <div class="header style-top-left d-flex flex-row justify-content-between">
                            <p>${name}</p>
                            <p>${Day}  ${month}</p>
                        </div>
                        <div class="body style-bottom-left p-3">
                            <div class="d-sm-flex flex-sm-row flex-lg-column">
                                <div class="data">
                                    <p>${name}</p>
                                    <h1>${temp_c}°C</h1>
                                </div>
                                <div class="img-cloud mb-lg-3 my-xsm-5 my-lg-0 ">
                                    <img class="mt-sm-5 mt-lg-0 ms-3 fs-1" src=${icon} alt="cloudy">
                                </div>
                            </div>
                            <p class="text-info fs-5 my-5">${text}</p>
                            <div class="mode d-flex flex-row justify-content-between">
                                <div class="wind d-flex flex-row">
                                    <span><img src="./imgs/icon-umberella.png" alt=""></span>
                                    <span class="ms-2">${humidity}%</span>
                                </div>
                                <div class="humidity d-flex flex-row">
                                    <span><img src="./imgs/icon-wind.png" alt=""></span>
                                    <span class="ms-2">${wind_kph}km/h</span>
                                </div>
                                <div class="rain d-flex flex-row">
                                    <span><img src="./imgs/icon-compass.png" alt=""></span>
                                    <span class="ms-2">East</span>
                                </div>

                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="card text-white p-0 border-0">
                        <div class="header1 text-center">
                            <p>${day1Day}</p>
                        </div>
                        <div class="body2 text-center">
                            <img class="mt-5 mb-3" src=${day1Icon} alt="sunny">
                            <div class="numder mb-5">
                                <p>${day1Maxtemp}°C</p>
                                <p>${day1Mintemp}°</p>
                            </div>
                            <div class="mode">
                                <p class="text-info">${day1Text}</p>
                            </div>
                        </div>
                    </div>
                    <div class="card text-white p-0 border-0">
                        <div class="header style-top-right text-center">
                            <p>${day2Day}</p>
                        </div>
                        <div class="body style-bottom-right text-center">
                            <img class="mt-5 mb-3" src=${day2Icon} alt="sunny">
                            <div class="numder mb-5">
                                <p>${day2Maxtemp}°C</p>
                                <p>${day2Mintemp}°</p>
                            </div>
                            <div class="mode">
                                <p class="text-info">${day2Text}</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        `
        document.querySelector(".cards-container").innerHTML=Weather;
    }


