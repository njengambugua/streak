<?php
session_start();
if (!isset($_SESSION['userid'])) {
    header("Location: ./index.php");
    exit();
}
include("./database.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Streak Counter</title>
    <link rel="stylesheet" href="style.css"><link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
</head>
<body>
    <main>
        <div class="upper">
            <i class="bi bi-plus-circle toggle-btn" ></i>
            <section class="add">
                <div class="phone-icon">
                    <img class="avator" src="./images/demo2-with-watch.png" alt="">
                <h3>Welcome <?php echo $_SESSION['username'] ?> to My Streak Counter</h3>
                </div>
                <a href="./logout.php"><i class="bi bi-box-arrow-right"></i></a>
            </section>
            
            <section class="close">
                <div class="menu-icon">
                    <i class="bi bi-list-task"></i>
                    <h4>Add a Todo Here</h4>
                </div>
                <div class="input-form">
                    <form action="./formchecker.php" method="post" id="taskForm" class="task-input">
                        <p class="error-message">Please fill in all Fields</p>
                        <div class="please">Please Add a task</div>
                        <div class="task-name"><h4>Task Name</h4> <br> <input id="task-name" name="taskname"type="text"><br></div>
                        <div class="im"><h4>Image</h4> <br> <input id="im" type="text" name="imagelink"><br></div>
                        <div class="date"><h4>Date</h4> <br> <input id="date" type="date" name="date"><br></div>
                        <div class="add-taski"><input id="add-taski" class="add-task" type="submit" value="Add Task"></div>
                    </form>
                </div>     
            </section>
        </div>
        <div class="lower">
            <section class="activity-status">
                You Don't Have Any Activities!!
            </section>
            <section>
                <section class="best-streak">
                    <?php
                    include("./database.php");
                    $userid = $_SESSION['userid'];
                    $selectQuer = "SELECT * FROM Tasks WHERE userId=$userid ORDER BY date ASC LIMIT 1";
                    $resul = mysqli_query($connectDb, $selectQuer);
                    if(mysqli_num_rows($resul)>0){
                        while ($row = mysqli_fetch_assoc($resul)) {
                            $tasknam = $row["taskname"];
                            $imagelin = $row["imagelink"];
                            $taskdat = $row["date"];
                            echo "<div id={$row['taskid']} class='task'>
                            <h4>$tasknam</h4>
                            <img src='$imagelin' onclick='createModal()' alt=''>
                            <p>$taskdat</p>
                            </div>";
                        }
                        
                    }
                    ?>
                    <div class="task"></div>
                </section>
                <section class="other-streaks">
                    <div id="activity-section">
                    <?php
                    include("./database.php");
                    $userid = $_SESSION['userid'];
                    $selectQuery = "SELECT * FROM Tasks WHERE userId ='$userid'";
                    $result = mysqli_query($connectDb, $selectQuery);
                    if(mysqli_num_rows($result)>0){
                        while ($row = mysqli_fetch_assoc($result)) {
                            $taskname = $row["taskname"];
                            $imagelink = $row["imagelink"];
                            $taskdate = $row["date"];
                            echo "<div id={$row['taskid']}>
                            <h4>$taskname</h4>
                            <img src='$imagelink' onclick='createModal()' alt=''>
                            <p>$taskdate</p>
                            </div>";
                        }
                      
                    }
                    ?>
                    <!-- <h2 id="all-activities">All Activities</h2> -->
                    </div>
                </section>
        </div>
    </main>
    <section id="overlay" class="overlay"></section>
    <script src="./src/index.js"></script>
</body>
</html>
