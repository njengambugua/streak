<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
    <style>
        body{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            color: white;
            background: linear-gradient(to right, rgb(3, 48, 146), rgb(21, 187, 151));
        }
        form{
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-weight: bold;
            border: solid 2px #fff;
            width: 500px;
            align-items: center;
            height: 500px;
            border-radius: 40px;
        }
        #name, #psw{
            border-radius: 30px;
            text-align: center;
            width: 250px;
            height: 50px;
        }
        .btn{
            background-color: rgb(12, 86, 155);
            transition: transform 0.3s ease;
            border-radius: 25px;
            width: 75px;
            padding: 15px 10px;
            border: 1px solid rgb(60, 66, 155);
        }
        .btn:hover{
            transform: scale(1.5);
            background-color: rgb(165, 113, 36);
            cursor: pointer;
        }
        label{
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        .material-icons{
            display: flex;
            position: absolute;
            color: black;
            right: 0;
            cursor: pointer;
        }
        .err_msg{
            color: red;
        }
        #p{
            height: 24px;
            width: 40px;
            display: flex;
            position: absolute;
            color: black;
            right: 10px;
            cursor: pointer;
            pointer-events: visibleStroke;
        }
        #r{
            height: 24px;
            width: 40px;
            display: flex;
            position: absolute;
            color: black;
            right: 10px;
            cursor: pointer;
            pointer-events: visible;
        }
    </style>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
    <div id="root">
        <form action="./index.php" method="post" onsubmit="validateForm(event)">
            <h1>Sign in</h1>
            <p class = err_msg></p>
            <label>
                Username:
                <input type="text" name="firstname" id="name" placeholder="Enter your username">
            </label>
            <label>
                Password:
                <input type="text" name="password" id="psw" onchange="validatePassword(event)">
                <img src="./icons/visibility.jpeg" class="material-icons" id="p" alt="">
                <img src="./icons/invisible.png" class="material-icons" id = "r" alt="visibility">
            </label>
            <input type="submit" class="btn" value="Login">
            <h4>If you don't have an account then:</h4>
            <a href="./register.php">Register here</a>
        </form>
    </div>
    <script src="./src/login.js"></script>
</body>


<?php
session_start();
include("./database.php");
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $firstname = $_POST["firstname"];
    $password = $_POST["password"];
    $userid ;
    // echo $firstname;

    $selectQuery = "SELECT * FROM Credentials WHERE firstname ='$firstname'";
    $result = mysqli_query($connectDb, $selectQuery);

    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $dbUsername = $row['firstname'];
                $dbPassword = $row['password'];
                $userid = $row['id'];
            }
            if (($dbPassword == $password) && ($dbUsername == $firstname)) {
                $_SESSION['userid'] = $userid;
                $_SESSION['username'] = $dbUsername;
                header("Location: ./streak.php");
                exit();
            } else {
                echo "<p class=server-msg >account does not exist</p>";
            } 
        } else {
            echo "<p class=server-msg >Account does not exist</p>";
        }
    } else {
        echo "<p class=server-msg>Query failed</p>";
    }
}

mysqli_close($connectDb);
?>
</html>