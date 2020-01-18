var vid = document.getElementById("myVideo");
var t = document.getElementById("r");
var pbr = document.getElementById("pbr");

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
    return watchtime;
}

function calcSeekCount(){
    return vid.played.length;
}



var ratechangelogs = [];
var timeobj = {};

vid.onratechange = () => {
    if(vid.playbackRate>3){
        console.log('speed limit -> 2')
        vid.playbackRate = 3;
    }
    if(ratechangelogs.length==0){
        timeobj['start'] = 0;
        timeobj['rate'] = vid.defaultPlaybackRate;
        ratechangelogs.push(timeobj);
    }
    timeobj['start'] = vid.currentTime;
    timeobj['rate'] = vid.playbackRate;
    ratechangelogs.push(timeobj);
    timeobj = {};
};


function GetSortOrder(prop) {  
    return function(a, b) {  
        if (a[prop] > b[prop]) {  
            return 1;  
        } else if (a[prop] < b[prop]) {  
            return -1;  
        }  
        return 0;  
    }  
} 

function calcPlaybackRate(){

    if(ratechangelogs.length>0){
        //ratechangelogs.sort(GetSortOrder("rate"));
        // var prev_rate = 1;
        // var rate = 1;
        // var time_temp = 0;
        // ratechangelogs.forEach(function(obj) {
        //     if(obj.rate==prev_rate){
        //         time_temp += 
        //     }
        // });

        return ratechangelogs;
    }
    return vid.defaultPlaybackRate;
}


vid.onended = uploadData;

window.onbeforeunload = function() {
    this.console.log('Calling upload from on beforeload');
    this.uploadData();
    return "Dude, are you sure you want to leave? Think of the kittens!";
}




function uploadData(){
    var data = {};
    // TODOs
    // duration done
    data['duration'] = vid.duration;
    // watchtime
    data['watch_time'] = calcPlayedTime();
    // seek_count
    data['seek_count'] = calcSeekCount();
    // playback_rate
    data['playback_rate'] = calcPlaybackRate();
    // tab inactive time
    // eye gaze
    console.log("Json:"+JSON.stringify(data))
    console.log('Uploading..');
}





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






// for manipulating test videos

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


function updatePlaybackVal(){
    pbr.innerHTML = vid.playbackRate;
}


function onex(){
    vid.playbackRate = 1;
}
function twox(){
    vid.playbackRate = 2;
}
function threex(){
    vid.playbackRate = 3;
}