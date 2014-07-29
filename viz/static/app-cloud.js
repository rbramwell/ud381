var source = new EventSource('/stream');
var hash = {};
var width = 1200;
var height = 700;

var updates = 0;
var UPDATE_RESET = 10;

source.onmessage = function (event) {
  updates += 1;
  word = event.data.split(":")[0];
  count = event.data.split(":")[1];
  if(!skip(word)){
    hash[word]=count;
  }

  if(updates > UPDATE_RESET){
    d3.select("svg").remove();
    console.log("cloudArray-10" + JSON.stringify(d3.entries(hash)));

    var frequency_list = d3.entries(hash);

    d3.layout.cloud().size([800, 300])
    .words(frequency_list)
    .rotate(0)
    .fontSize(function(d) { return d.value; })
    .on("end", draw)
    .start();

    //hash={};
    updates=0;
  }

};

var skipList = ["https","follow","fucking","1","2","please","following","followers"];

var skip = function(tWord){
  for(var i=0; i<skipList.length; i++){
    if(tWord === skipList[i]){
      return true;
    }
  }
  return false;
};
