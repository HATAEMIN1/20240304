//전역변수
let map;
let cities;
let cityCnt = 0;
const weatherApi = "https://api.openweathermap.org/data/2.5/weather";
const params = {
  appid: "dc4fc39cdef965dc7a229cab2c4b15d5",
  units: "metric",
  lang: "kr",
  exclude: "minutely,current",
};
moment.locale("ko");
//함수
function mapInit() {
  var mapOptions = {
    center: new kakao.maps.LatLng(35.8, 127.7), // 지도의 중심좌표
    level: 13, // 지도의 확대 레벨
    // draggable: false,
    // zoomable: false,
    disableDoubleClick: true,
  };
  // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
  map = new kakao.maps.Map($("#map")[0], mapOptions);
  axios.get("./json/city.json").then(onGetCity);
}

function onGetCity(res) {
  //   console.log(res.data);
  cities = res.data.cities;
  cities.forEach(function (item, idx) {
    params.lat = item.lat;
    params.lon = item.lon;
    params.id = item.id;
    console.log(params.lat);
    axios.get(weatherApi, { params }).then(onCreateMaker);
  });
}

function onCreateMaker(res) {
  //   console.log(res.data);
  console.log(res.data.coord.lat);
  cityCnt++;
  let city = cities.filter(function (v) {
    // console.log(v.id === res.data.id);
    return v.id === res.data.id;
  });
  console.log(city);
  let content = `<div class="layer">
                <div><img src="http://openweathermap.org/img/wn/${res.data.weather[0].icon}.png"></div>
                ${city[0].name}
                <div>${res.data.main.temp}˚
                </div>`;
  let position = new kakao.maps.LatLng(res.data.coord.lat, res.data.coord.lon);
  //   console.log(content, position);
  //   커스텀 오버레이를 생성합니다
  var customOverlay = new kakao.maps.CustomOverlay({
    position: position,
    content: content,
  });
  //   console.log(customOverlay);
  // 커스텀 오버레이를 지도에 표시합니다
  customOverlay.setMap(map);
}
//실행
mapInit();

// axios.get(url,{params}.then(function(res){}))
