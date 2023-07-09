<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="./validation.css">
</head>
<body>
    <form action="./register.php" method="post" onsubmit="validateForm(event)">
        <h1>Sign up</h1>
        <p class = err_msg></p>
        <label>
            First Name:<br>
            <input type="text" name="firstname" id="first_name" oninput="validateName(event)">
        </label>
        <label>
            Last Name:<br>
            <input type="text" name="lastname" id="last_name" oninput="validateName(event)">
        </label>
        <label>
            Email:<br>
            <input type="text" name="email" id="email" onchange="validateEmail(event)">
        </label>
        <label>
            Password:<br>
            <div class="z">
                <input type="text" name="pass" id="password" onchange="validatePassword(event)">
                <span class="material-icons" id="r">visibility_off</span>
            </div>
        </label>
        <label>
            Confirm Password:<br>
            <div class="z">
                <input type="text" name="cpass" id="confirm_password" onchange="PasswordMatch(event)">
                <span class="material-icons" id="s">visibility_off</span>
            </div>
        </label>
        <button class="btn" type="submit">Register</button>
        <h4>If you already have an account then:</h4>
        <a href="./index.php">Login here</a>
    </form>
    <script src="./src/register.js"></script>
</body>
<?php
session_start();
include("./database.php");
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $firstname = $_POST["firstname"];
    $lastname = $_POST["lastname"];
    $email = $_POST["email"];
    $password1 = $_POST["pass"];
    $password2 = $_POST["cpass"];
    $userid ;

    if (($password1 == $password2)) {
        $insertQuery = "INSERT INTO Credentials(firstname, lastname, email, password) VALUES ('$firstname', '$lastname', '$email', '$password1')";
        if (mysqli_query($connectDb, $insertQuery)) {
            echo "<p class=server-msg>User registered</p>";
            $selectQuery = "SELECT * FROM Credentials WHERE firstname = '$firstname' AND password = '$password1'";
            $results = mysqli_query($connectDb, $selectQuery);
            if (!$results) {
                echo "<p class=server-msg>Try to loggin manually the auto loging failed</p>";
            } else {
                if (mysqli_num_rows($results) > 0) {
                    while ($row = mysqli_fetch_assoc($results)) {
                        $currentUser = $row['firstname'];
                        $userid = $row['id'];
                    }
                    $_SESSION['userid'] = $userid;
                    $_SESSION['username'] = $currentUser;
                    header("Location: ./streak.php?username={$currentUser}");
                }
            };
        } else {
            echo "<p class=server-msg>Failed to register: " . mysqli_error($connectDb) . "</p>";
        }
    } else {
        echo "<p class=server-msg>Please confirm your password</p>";
    }

    mysqli_close($connectDb);
}
?>
</html>