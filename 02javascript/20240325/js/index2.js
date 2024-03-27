let map;
let cities;
const weatherApi = "https://api.openweathermap.org/data/2.5/weather";
const params = {
  appid: "dc4fc39cdef965dc7a229cab2c4b15d5",
  units: "metric",
  lang: "kr",
  exclude: "minutely,current",
};

function mapInit() {
  mapOption = {
    center: new kakao.maps.LatLng(35.8, 127.7), // 지도의 중심좌표
    level: 13, // 지도의 확대 레벨
  };

  map = new kakao.maps.Map($("#map")[0], mapOption); // 지도를 생성합니다
  axios.get("./json/city.json").then(onGetCity);
}
mapInit();

function onGetCity(res) {
  // console.log(res.data.cities);
  cities = res.data.cities;
  cities.forEach((item) => {
    params.lat = item.lat;
    params.lon = item.lon;
    params.id = item.id;
    axios.get(weatherApi, { params }).then(onGetMaker);
  });
}

function onGetMaker(res) {
  // 커스텀 오버레이에 표시할 내용입니다
  // HTML 문자열 또는 Dom Element 입니다
  // console.log(res.data);
  let city = cities.filter(function (v) {
    return v.id === res.data.id;
  });
  console.log(city);
  var content = `<div class="layer">
                <div><img src="https://openweathermap.org/img/wn/${res.data.weather[0].icon}.png">       </div>
                ${city[0].name}
                <div>${res.data.main.temp}</div>
                </div>`;
  // console.log(content);
  // 커스텀 오버레이가 표시될 위치입니다
  var position = new kakao.maps.LatLng(res.data.coord.lat, res.data.coord.lon);

  // 커스텀 오버레이를 생성합니다
  var customOverlay = new kakao.maps.CustomOverlay({
    position: position,
    content: content,
  });

  // 커스텀 오버레이를 지도에 표시합니다
  customOverlay.setMap(map);
}
