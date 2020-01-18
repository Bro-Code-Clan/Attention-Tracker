var vid = document.getElementById("myVideo");
var t = document.getElementById("r");

// Calculate Played Time Function
function calcPlayedTime(){
    var vid = document.getElementById("myVideo");
    var t = document.getElementById("r");
    var times = Array();
    console.log(vid.played.length);
    t.innerHTML = vid.played.length;
    var i,watchtime=0;
    for(i=0;i<vid.played.length;i++){
        t.innerHTML = t.innerHTML + vid.played.start(i) + "   " + vid.played.end(i) + "<br>";
        watchtime += vid.played.end(i) - vid.played.start(i);
        console.log(vid.played.start(i)+" "+vid.played.end(i));
    }
    console.log("total duration:"+vid.duration);
    console.log("total watch duration:"+watchtime);
}
vid.onended = uploadData;

window.onbeforeunload = function() {
    this.console.log('Calling upload from on beforeload');
    this.uploadData();
    return "Dude, are you sure you want to leave? Think of the kittens!";
}




function uploadData(){
    var data = {};
    data['duration'] = vid.duration;
    console.log("Json:"+JSON.stringify(data))
    // TODOs
    // duration done
    // watchtime
    // seek_count
    // playback_rate
    // tab inactive time
    // eye gaze
    calcPlayedTime();
    console.log('Uploading..');
}




vid.onratechange = () => {
    if(vid.playbackRate>2){
        console.log('speed limit -> 2')
        vid.playbackRate = 2;
    }
};

vid.addEventListener("DOMAttrModified", function(event) {
    if (event.attrName == "src") {
       // The `src` attribute changed!
       calcPlayedTime();
    }
});

vid.onseekend = () => {
    var vid = document.getElementById("myVideo");
    console.log(vid.currentTime)
};
// vid.onratechange()
window.onhashchange = () => {
    alert('stop ');
};
function playNext() { 
  //alert("Start: " + vid.played.start(0) + " End: "  + vid.played.end(0));
  if(vid.getAttribute('src')=='gru.mp4'){
    vid.setAttribute('src','media/nlp.mp4')
  }else{
    vid.setAttribute('src','media/gru.mp4')
  }
}