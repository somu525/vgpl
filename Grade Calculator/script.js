function validateMarks(marks, maxMarks) {
    if (marks < 0) {
        alert("Marks cannot be negative");
        return false;
    }
    if (isNaN(marks)) {
        alert("Please fill all the fields");
        return false;
    }
    if (marks > maxMarks) {
        alert("Marks obtained cannot be greater than max marks!");
        return false;
    }
    return true;
}
function calculateGrade() {
    
    let marks1 = parseFloat(document.getElementById("marks1").value);
    let marks2 = parseFloat(document.getElementById("marks2").value);
    let marks3 = parseFloat(document.getElementById("marks3").value);
    let marks4 = parseFloat(document.getElementById("marks4").value);
    let marks5 = parseFloat(document.getElementById("marks5").value);

    
    let maxMarks1 = parseFloat(document.getElementById("maxMarks1").value);
    let maxMarks2 = parseFloat(document.getElementById("maxMarks2").value);
    let maxMarks3 = parseFloat(document.getElementById("maxMarks3").value);
    let maxMarks4 = parseFloat(document.getElementById("maxMarks4").value);
    let maxMarks5 = parseFloat(document.getElementById("maxMarks5").value);

    
    let totalMarks = marks1 + marks2 + marks3 + marks4 + marks5;
    let totalMaxMarks = maxMarks1 + maxMarks2 + maxMarks3 + maxMarks4 + maxMarks5;

    let percentage,p1,p2,p3,p4,p5;
    function percal(tm,tmm){
        let p=(tm/tmm)*100;
        return p;
    }
    percentage=percal(totalMarks,totalMaxMarks);
    p1=percal(marks1,maxMarks1);
    p2=percal(marks2,maxMarks2);
    p3=percal(marks3,maxMarks3);
    p4=percal(marks4,maxMarks4);
    p5=percal(marks5,maxMarks5);
    if (!validateMarks(marks1, maxMarks1)) {
        pstatus="Fail";
    }
    if (!validateMarks(marks2, maxMarks2)) {
        pstatus="Fail";
    }
    if (!validateMarks(marks3, maxMarks3)) {
        pstatus="Fail";
    }
    if (!validateMarks(marks4, maxMarks4)) {
        pstatus="Fail";
    }
    if (!validateMarks(marks5, maxMarks5)) {
        pstatus="Fail";
    }
    let g1,g2,g3,g4,g5;
    function gradecal(percentage){
        let grade;
        if (percentage >= 90) {
            grade = "A";
        } else if (percentage >= 80) {
            grade = "B";
        } else if (percentage >= 70) {
            grade = "C";
        } else if (percentage >= 60) {
            grade = "D";
        } else if (percentage >= 50) {
            grade = "E";
        } else {
            grade = "F";
        }
        return grade;
    }
    grade=gradecal(percentage)
    g1=gradecal(p1);
    g2=gradecal(p2);
    g3=gradecal(p3);
    g4=gradecal(p4);
    g5=gradecal(p5);

    let pstatus = "Pass";
    if (g1=="F" || g2=="F" || g3=="F" || g4=="F" || g5=="F") {
        pstatus = "Fail"; 
    }

    document.getElementById("g1").innerText=gradecal(p1);
    document.getElementById("g2").innerText=gradecal(p2);
    document.getElementById("g3").innerText=gradecal(p3);
    document.getElementById("g4").innerText=gradecal(p4);
    document.getElementById("g5").innerText=gradecal(p5);
    document.getElementById("totalMarks").innerText = totalMarks + " / " + totalMaxMarks;
    document.getElementById("percentage").innerText = percentage.toFixed(2);
    document.getElementById("pstatus").innerText = pstatus;
    console.log(pstatus);


    document.getElementById("result").style.display = "block";
}
