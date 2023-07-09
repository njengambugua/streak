<?php
include('./database.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $taskid = $_POST['taskid'];
  $taskname = $_POST['taskname'];
  $imagelink = $_POST['imagelink'];
  $date = $_POST['date'];

  if (mysqli_error($connectDb)) {
    die("Connection failed: " . $connectDb->connect_error);
  }
  if(!empty($taskname) && !empty($imagelink) && !empty($date)){
    $updateQuery = "UPDATE Tasks SET taskname = '$taskname', imagelink = '$imagelink', date = '$date' WHERE taskid = '$taskid'";
    $rs = mysqli_query($connectDb, $updateQuery);
    if ($rs) {
      echo "Record updated successfully";
      header("Location: ./streak.php");
      exit;
    } else {
      echo "Error updating record: " . mysqli_error($connectDb);
    }
  } else{
    echo "<p class='server-msg'>Please fill in all the fields</p>";
  }
}

$connectDb->close();
?>