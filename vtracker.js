var vid = document.getElementById("myVideo");
var ply_next = document.getElementById("play-next");

var ratechangelogs = [];
var timeobj = {};
var inactiveTabCount = 0;
var myInterval;

function cleanVars(){
    ratechangelogs = [];
    timeobj = {};
    inactiveTabCount = 0;
}

// Calculate Played Time Function
function calcPlayedTime(){
    // console.log(vid.played.length);
    var i,watchtime=0;
    for(i=0;i<vid.played.length;i++){
        watchtime += vid.played.end(i) - vid.played.start(i);
        // console.log(vid.played.start(i)+" "+vid.played.end(i));
    }
    // console.log("total duration:"+vid.duration);
    // console.log("total watch duration:"+watchtime);
    return watchtime;
}

function calcSeekCount(){
    return vid.played.length;
}


vid.onratechange = () => {
    if(vid.playbackRate>3){
        console.log('speed limit -> 3')
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
    // timeobj = {};
};


// function GetSortOrder(prop) {  
//     return function(a, b) {  
//         if (a[prop] > b[prop]) {  
//             return 1;  
//         } else if (a[prop] < b[prop]) {  
//             return -1;  
//         }  
//         return 0;  
//     }  
// } 

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

        // avg across logs
        avg_rate = 0;
        ratechangelogs.forEach(function(obj) {
            avg_rate += obj.rate;
        });
        avg_rate /= ratechangelogs.length;
        return avg_rate;
    }
    return vid.defaultPlaybackRate;
}


// Tab inactive calc
// InActive
window.addEventListener('blur', startTimer);
// active
window.addEventListener('focus', stopTimer);
function timerHandler() {
 inactiveTabCount++;
//  document.getElementById("seconds").innerHTML = inactiveTabCount;
}
// Start timer
function startTimer() {
//  console.log('out1');
 myInterval = window.setInterval(timerHandler, 1000);
}
// Stop timer
function stopTimer() {
 window.clearInterval(myInterval);
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
    //temp IDs
    data['video_id'] = vid.getAttribute('src');
    data['student_id'] = "abc@gmail.com";
    data['course_id'] = 1;

    data['video_length'] = vid.duration;
    // watchtime
    data['watch_time'] = calcPlayedTime();
    // seek_count
    data['seek_count'] = calcSeekCount();
    // playback_rate
    data['playback_rate'] = calcPlaybackRate();
    // tab inactive time
    data['tab_inactive_time'] = inactiveTabCount;
    // eye gaze
    console.log("Json:"+JSON.stringify(data))
    console.log('Uploading..');
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    var theUrl = "http://127.0.0.1:80/analysis.php";
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(data));
    cleanVars();
}





vid.addEventListener("DOMAttrModified", function(event) {
    if (event.attrName == "src") {
       // The `src` attribute changed!
       console.log("src change");
       uploadData();
       cleanVars();
    }
    else
    console.log('ddd');
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
    uploadData();
  if(vid.getAttribute('src')=='media/gru.mp4'){
    vid.setAttribute('src','media/nlp.mp4')
  }else{
    vid.setAttribute('src','media/gru.mp4')
  }
//   cleanVars();
}

ply_next.addEventListener('click',playNext);
// function updatePlaybackVal(){
//     pbr.innerHTML = vid.playbackRate;
// }

