(function(){
  "use strict";

  var Kell = function(){

    if(Kell.instance){
      return Kell.instance;
    }

    Kell.instance = this;

    this.clock = document.querySelector(".outer_clock");
    this.clock_year = document.querySelector("#clock_year");
    this.clock_month = document.querySelector("#clock_month");
    this.clock_date = document.querySelector("#clock_date");
    this.clock_day = document.querySelector("#clock_day");
    this.clock_hour = document.querySelector("#clock_hour");
    this.clock_minute = document.querySelector("#clock_minute");
    this.clock_second = document.querySelector("#clock_second");

    this.today = new Date();
    this.year = this.today.getFullYear();
    this.month = this.today.getMonth() + 1;
    this.date = this.today.getDate();
    this.day = this.today.getDay();
    this.hour = this.today.getHours();
    this.minute = this.today.getMinutes();
    this.second = this.today.getSeconds();

    this.theme = "style_1";
    this.day_as_word = "style_1";
    this.days = ["ESMASPÄEV", "TEISIPÄEV", "KOLMAPÄEV", "NELJAPÄEV", "REEDE", "LAUPÄEV", "PÜHAPÄEV"];

    this.init();
  };

  window.Kell = Kell;

  Kell.prototype = {

    init: function(){

      this.writeTime();
      this.changeBackground();
      this.writeDay();
      this.changeSize();
    },
    writeTime: function(){

      clock_year.innerHTML = "";
      clock_month.innerHTML = "";
      clock_date.innerHTML = "";
      clock_hour.innerHTML = "";
      clock_minute.innerHTML = "";
      clock_second.innerHTML = "";

      for(var i = 1; i < 13; i++){
        if(i%2 === 0){
          clock_month.innerHTML += this.showCurrentTime(this.setZeroBefore(i), "select_month") + "<br>";
        }else{
          clock_month.innerHTML += this.showCurrentTime(this.setZeroBefore(i), "select_month");
        }
      }

      for(i = 1; i < 37; i++){
        if(i > 31){
          clock_date.innerHTML += "00";
        }else if(i%6 === 0){
          clock_date.innerHTML += this.showCurrentTime(this.setZeroBefore(i), "select_date") + "<br>";
        }else{
          clock_date.innerHTML += this.showCurrentTime(this.setZeroBefore(i), "select_date");
        }
      }

      for(i = 1; i < 25; i++){
        if(i === 24){
          clock_year.innerHTML += this.showCurrentTime(2024, "select_year");
          clock_hour.innerHTML += this.showCurrentTime(this.setZeroBefore(0), "select_hour");
        }else if(i%4 === 0){
          clock_year.innerHTML += this.showCurrentTime(i + 2000, "select_year") + "<br>";
          clock_hour.innerHTML += this.showCurrentTime(this.setZeroBefore(i), "select_hour") + "<br>";
        }else{
          clock_year.innerHTML += this.showCurrentTime(i + 2000, "select_year");
          clock_hour.innerHTML += this.showCurrentTime(this.setZeroBefore(i), "select_hour");
        }
      }

      for(i = 1; i < 61; i++){
        if(i === 60){
          clock_minute.innerHTML += this.showCurrentTime(this.setZeroBefore(0), "select_minute");
          clock_second.innerHTML += this.showCurrentTime(this.setZeroBefore(0), "select_second");
        }else if(i%10 === 0){
          clock_minute.innerHTML += this.showCurrentTime(this.setZeroBefore(i), "select_minute") + "<br>";
          clock_second.innerHTML += this.showCurrentTime(this.setZeroBefore(i), "select_second") + "<br>";
        }else{
          clock_minute.innerHTML += this.showCurrentTime(this.setZeroBefore(i), "select_minute");
          clock_second.innerHTML += this.showCurrentTime(this.setZeroBefore(i), "select_second");
        }
      }
    },
    showCurrentTime: function(number, format){

      if(format === "select_year" && number === this.year){
          number = "<font color='black'><b>" + number + "</font></b>";
      }else if(format === "select_month" && number === this.setZeroBefore(this.month)){
          number = "<font color='black'><b>" + number + "</font></b>";
      }else if(format === "select_date" && number === this.setZeroBefore(this.date)){
          number = "<font color='black'><b>" + number + "</font></b>";
      }else if(format === "select_hour" && number === this.setZeroBefore(this.hour)){
          number = "<font color='black'><b>" + number + "</font></b>";
      }else if(format === "select_minute" && number === this.setZeroBefore(this.minute)){
          number = "<font color='black'><b>" + number + "</font></b>";
      }else if(format === "select_second" && number === this.setZeroBefore(this.second)){
          number = "<font color='black'><b>" + number + "</font></b>";
      }
      return number;
    },
    setZeroBefore: function(number){
      if(number < 10){
        number = '0' + number;
      }
      return number;
    },
    changeBackground: function(){
      clock.addEventListener('dblclick', this.changeColor.bind(this));
    },
    changeColor: function(){
      if(this.theme === "style_1"){
        document.querySelector("body").style.backgroundColor="#989898";
        document.querySelector("body").style.color="#FFFFFF";
        this.theme = "style_2";
      } else {
        document.querySelector("body").style.backgroundColor="#FFFFFF";
        document.querySelector("body").style.color="#989898";
        this.theme = "style_1";
      }
    },
    writeDay: function(){
      clock_date.addEventListener('click', this.selectDay.bind(this));
    },
    selectDay: function(){
      if(this.day_as_word === "style_1"){
        clock_day.innerHTML = this.days[this.day - 1];
        this.day_as_word = "style_2";
      } else {
        clock_day.innerHTML = "";
        this.day_as_word = "style_1";
      }
    },
    changeSize: function(){
      window.addEventListener('keypress', this.smallBigSize.bind(this));
    },
    smallBigSize: function(){
      if(event.keyCode === 49) {
        document.querySelector("body").style.fontSize="10px";
      }else if(event.keyCode === 50){
        document.querySelector("body").style.fontSize="15px";
      }else if(event.keyCode === 51){
        document.querySelector("body").style.fontSize="20px";
      }
    }
  };

  window.onload = function(){
    var app = new Kell();
  };


})();

//window.setInterval(function(){writeTime();}, 1000);
