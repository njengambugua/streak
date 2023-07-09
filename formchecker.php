<?php
  session_start();
  include("./database.php");
  $userid = $_SESSION["userid"];
  $taskid = time();
  // $id;
    
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
      $taskname = $_POST["taskname"];
      $imagelink = $_POST["imagelink"];
      $date = $_POST["date"];
      
      if(!empty($taskname) && !empty($imagelink) && !empty($date)){
          // echo $taskname;
          $insertQuery = "INSERT INTO Tasks(taskid,taskname,imagelink,date,userId)VALUES('$taskid','$taskname','$imagelink','$date','$userid')";
          $rs = mysqli_query($connectDb, $insertQuery);

          if($rs){
            echo "<p class='server-msg'>Task Added</p>";
            header("Location: ./streak.php");
            exit;
          }else{
            echo "error insertion" .mysqli_error($connectDb);
          }
      } else{
          echo "<p class='server-msg'>Please fill in all the fields</p>";
      }
  }
?>