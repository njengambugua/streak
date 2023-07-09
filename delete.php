<?php
include('./database.php');
$taskid = $_GET['taskid'];
echo $taskid;
if($connectDb->connect_error){
  die("Connection failed: " . $connectDb->connect_error);
}
$deleteQuery =  "DELETE FROM Tasks WHERE taskid = '$taskid'";
if($connectDb->query($deleteQuery) === TRUE){
  echo "Record deleted successfully";
  header("Location: ./streak.php");
} else{
  echo "Error deleting record:" . $connectDb->error;
}

$connectDb->close();
?>