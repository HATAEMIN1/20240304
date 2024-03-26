function mapInit() {
  var mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(35.8, 127.7), // 지도의 중심좌표
      level: 13, // 지도의 확대 레벨
    };

  var map = new kakao.maps.Map($("#map")[0], mapOption);
  axios.get("./json/city.json").then(onGetCity);
}

function onGetCity(res) {
  console.log(res.data);
  cities = res.data.cities;
  cities.forEach(function (item) {
    // params.lat = item.lat;
    // params.lon = item.lon;
    // params.id = item.id;
    // axios.get().then();
  });
}

function name(params) {
  var content =
    '<div class ="label"><span class="left"></span><span class="center">카카오!</span><span class="right"></span></div>';

  // 커스텀 오버레이가 표시될 위치입니다
  var position = new kakao.maps.LatLng(33.450701, 126.570667);

  // 커스텀 오버레이를 생성합니다
  var customOverlay = new kakao.maps.CustomOverlay({
    position: position,
    content: content,
  });

  // 커스텀 오버레이를 지도에 표시합니다
  customOverlay.setMap(map);
}

mapInit();
