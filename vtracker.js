var vid = document.getElementById("myVideo");
var t = document.getElementById("r");
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
        // String.toString
    }
    console.log("total duration:"+vid.duration);
    console.log("total watch duration:"+watchtime);
}
vid.onended = calcPlayedTime;
vid.onratechange = () => {
    if(vid.playbackRate>2){
        console.log('speed limit -> 2')
        vid.playbackRate = 2;
    }
};
vid.onseekend = () => {
    var vid = document.getElementById("myVideo");
    console.log(vid.currentTime)
};
// vid.onratechange()
window.onhashchange = () => {
    alert('stop ');
};
function myFunction() { 
  //alert("Start: " + vid.played.start(0) + " End: "  + vid.played.end(0));
    var t = document.getElementById("r");
    t.innerHTML = vid.played.start(1);
}