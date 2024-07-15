<script>
export default {
  data() {
    return {
      country: {
        北部: ["新北市", "臺北市", "桃園市", "基隆市", "宜蘭縣", "新竹市", "新竹縣"],
        中部: ["苗栗縣", "臺中市", "彰化縣", "南投縣", "雲林縣"],
        南部: ["嘉義縣", "嘉義市", "臺南市", "高雄市", "屏東縣"],
        東部: ["花蓮縣", "臺東縣"],
        離島: ["澎湖縣", "金門縣", "連江縣"],
      },
      weatherList: [
        "新北市",
        "臺北市",
        "基隆市",
        "宜蘭縣",
        "桃園市",
        "新竹市",
        "新竹縣",
        "苗栗縣",
        "臺中市",
        "彰化縣",
        "南投縣",
        "雲林縣",
        "嘉義縣",
        "嘉義市",
        "臺南市",
        "高雄市",
        "屏東縣",
        "花蓮縣",
        "臺東縣",
        "澎湖縣",
        "金門縣",
        "連江縣",
      ],
      url:
        "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-B340F7A4-E1B1-4BF8-B488-B174A377F333&format=JSON&locationName=&elementName=",
      allArea: "全臺",
      timeHour: new Date().getHours(),
    };
  },
  mounted() {
    this.fetchWeather();
    this.setTime();
    this.timeInterval = setInterval(this.setTime, 1000);
    this.weatherInterval = setInterval(this.updateWeather, 60 * 1000, "全臺");
  },
  computed: {
    updateWeather() {
      if (!this.weatherList || this.weatherList.length == 0) {
        return [];
      }

      let filterWeather =
        this.allArea === "全臺"
          ? this.weatherList
          : this.weatherList.filter((country) => country.area === this.allArea);
      filterWeather = filterWeather.map((country) => ({
        ...country,
        weatherIconNumber: ("0" + country.weatherIconNumber).slice(-2),
      }));
      console.log(filterWeather);
      return filterWeather;
    },
    dayNight() {
      let time = this.timeHour;
      return time < 6 && time > 18 ? "night" : "day";
    },
  },
  methods: {
    findRegion(city) {
      for (let region in this.country) {
        if (this.country[region].includes(city)) {
          return region;
        }
      }
      return null;
    },
    fetchWeather() {
      fetch(this.url)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.records && data.records.location) {
            data.records.location.forEach((location) => {
              let index = this.weatherList.indexOf(location["locationName"]);
              if (index != -1) {
                this.weatherList[index] = {
                  area: this.findRegion(location["locationName"]),
                  city: location["locationName"],
                  weather:
                    location["weatherElement"][0]["time"][0]["parameter"][
                      "parameterName"
                    ],
                  weatherIconNumber:
                    location["weatherElement"][0]["time"][0]["parameter"][
                      "parameterValue"
                    ],
                  pop:
                    location["weatherElement"][1]["time"][0]["parameter"][
                      "parameterName"
                    ],
                  MinT:
                    location["weatherElement"][2]["time"][0]["parameter"][
                      "parameterName"
                    ],
                  CI:
                    location["weatherElement"][3]["time"][0]["parameter"][
                      "parameterName"
                    ],
                  MaxT:
                    location["weatherElement"][4]["time"][0]["parameter"][
                      "parameterName"
                    ],
                };
              }
            });
          } else {
            console.log("error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setTime() {
      const now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      let hour = ("0" + now.getHours()).slice(-2);
      let minute = ("0" + now.getMinutes()).slice(-2);
      let second = ("0" + now.getSeconds()).slice(-2);
      let separator = now.getSeconds() % 2 === 0 ? ":" : "&nbsp;";
      const dayNames = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];

      this.$el.querySelector(".time").innerHTML = `${year}年${month}月${day}日 ${
        dayNames[now.getDay()]
      } ${hour}${separator}${minute}${separator}${second}`;
    },
  },
};
</script>
<template>
  <div class="w-full min-h-screen flex flex-col justify-start items-center front-mono">
    <div
      class="navbar flex flex-wrap items-center justify-center lg:justify-between gap-3 px-10 py-5"
    >
      <h1 class="text-3xl">天氣預報</h1>
      <div class="flex py-2">
        <p class="time text-3xl"></p>
      </div>
      <div class="flex flex-wrap justify-center items-center gap-5">
        <button
          @click="allArea = '全臺'"
          class="btn bg-gradient-to-tr from-[#86ff9ed2] via-[#98fa6ed2] to-[#fafafa] hover:bg-[#b6ffa0] border-0 hover:border-none rounded-lg text-2xl font-normal"
        >
          全臺
        </button>
        <button
          @click="allArea = '北部'"
          class="btn bg-gradient-to-tr from-[#ae86ffc7] via-[#a56dfad2] to-[#fafafa] hover:bg-[#d6a0ff] border-0 hover:border-none rounded-lg text-2xl font-normal"
        >
          北部
        </button>
        <button
          @click="allArea = '中部'"
          class="btn bg-gradient-to-tr from-[#86cfffd6] via-[#6dd4fad5] to-[#fafafa] hover:bg-[#A0DEFF] border-0 hover:border-none rounded-lg text-2xl font-normal"
        >
          中部
        </button>
        <button
          @click="allArea = '南部'"
          class="btn bg-gradient-to-tr from-[#ffc486dc] via-[#fabf6ddc] to-[#fafafa] hover:bg-[#ffe4a0] border-0 hover:border-none rounded-lg text-2xl font-normal"
        >
          南部
        </button>
        <button
          @click="allArea = '東部'"
          class="btn bg-gradient-to-tr from-[#fffd86d9] via-[#f8fa6dd1] to-[#fafafa] hover:bg-[#fdffa0] border-0 hover:border-none rounded-lg text-2xl font-normal"
        >
          東部
        </button>
        <button
          @click="allArea = '離島'"
          class="btn bg-gradient-to-tr from-[#ff8686d5] via-[#fa7d6dd2] to-[#fafafa] hover:bg-[#ffa0a0] border-0 hover:border-none rounded-lg text-2xl font-normal"
        >
          離島
        </button>
      </div>
    </div>

    <div
      class="info grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3 gap-20 py-5"
    >
      <div
        data-aos="flip-right"
        data-aos-easing="linear"
        data-aos-duration="700"
        v-for="weather in updateWeather"
        :key="weather.city"
        class="weather-card"
      >
        <div
          class="card bg-gradient-to-bl from-[#c9ffd7] to-[#FFFFFF] w-[270px] shadow-xl justify-self-center"
        >
          <h2 class="text-center text-2xl mt-5">
            <i class="fa-solid fa-map-location-dot"></i>&nbsp;&nbsp;<span></span
            >{{ weather.city }}
          </h2>
          <div class="flex flex-col justify-center items-center py-4">
            <img
              :src="
                'https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/' +
                dayNight +
                '/' +
                weather.weatherIconNumber +
                '.svg'
              "
              alt=".."
              class="size-40"
            />
            <p><span></span>{{ weather.weather }}</p>
          </div>
          <div class="card-body px-4">
            <div class="flex justify-around">
              <p>
                <i class="fa-solid fa-temperature-full"></i>&nbsp;&nbsp;<span></span
                >{{ weather.MinT }} &deg;C ~ {{ weather.MaxT }} &deg;C
              </p>
              <p>
                <i class="fa-solid fa-umbrella"></i>&nbsp;&nbsp;<span></span
                >{{ weather.pop }}%
              </p>
              <p>
                <i class="fa-solid fa-seedling"></i>&nbsp;&nbsp;<span></span
                >{{ weather.CI }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
