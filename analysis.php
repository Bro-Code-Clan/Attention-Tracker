<?php
    $con = mysqli_connect("localhost","root","","attention_tracker");
    if($con){
        echo "Connected";
    }
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    echo $data['video_length'];
    $course_id = $data['course_id'];
    $student_email = $data['student_id'];
    $student_id = 0;
    $res = mysqli_query($con,"Select student_id from students where student_email='".$student_email."';");
    if (mysqli_num_rows($res) == 1) {
        while($row = mysqli_fetch_assoc($res)) {
            $student_id = $row['student_id'];
        }
    }
    $video_id = $data['video_id'];
    $video_length = $data['video_length'];
    $watch_time = $data['watch_time'];
    $seek_count = $data['seek_count'];
    $playback_rate = $data['playback_rate'];
    $tab_inactive_time = $data['tab_inactive_time'];
    $eye_gaze = "";
    $time_ratio = 0;
    if ($watch_time>0) {
        $time_ratio = $watch_time * 100 / $video_length;
    }
    $attention_score = "";
    $quer = "INSERT INTO `video_analysis`(`course_id`, `student_id`, `video_id`, `video_length`, `watch_time`, `seek_count`, `playback_rate`, `tab_inactive_time`, `eye_gaze`, `time_ratio`, `attention_score`) VALUES ('".$course_id."','".$student_id."','".$video_id."','".$video_length."','".$watch_time."','".$seek_count."','".$playback_rate."','".$tab_inactive_time."',0,'".$time_ratio."',0)";
    $res = mysqli_query($con,$quer);
    if($res) {
        echo "Successfull";
    } else {
        echo "asdfghjkl". mysqli_error($con);
    }
?>