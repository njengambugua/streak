<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Retrieve</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <?php
    // Retrieve the taskid from the query parameter
    include("./database.php");
    $taskid = $_GET['taskid'];
    

    // Check if the connection was successful
    if ($connectDb->connect_error) {
    die("Connection failed: " . $connectDb->connect_error);
    }

    // Retrieve the existing data from the database for the given taskid
    $selectQuery = "SELECT * FROM Tasks WHERE taskid = '$taskid'";
    $result = $connectDb->query($selectQuery);
    $row = $result->fetch_assoc();

    // Close the database connection
    $connectDb->close();
  ?>
  <div class="update-form">
    <form action="update.php" method="post" id="updateform">
      <input type="hidden" name="taskid" value="
      <?php echo $taskid; ?>
      ">
      <label for="taskname">Task Name:</label>
      <input type="text" name="taskname" id="taskname" value="
      <?php echo $row['taskname']; ?>
      ">
      <br>
      <label for="imagelink">Image Link:</label>
      <input type="text" name="imagelink" id="imagelink" value="
      <?php echo $row['imagelink']; ?>
      ">
      <br>
      <label for="date">Date:</label>
      <input type="date" name="date" id="date" value="
      <?php echo $row['date']; ?>
      ">
      <br>
      <input class="update" type="submit" value="Update">
    </form>
  </div>
  <script src="./src/index.js"></script>

</body>
</html>