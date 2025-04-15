function Signout(){

    window.location.href="Homepage.html";
  }

document.getElementById("scoreForm").addEventListener("submit", function(event) {
    event.preventDefault();
   
    

    const matchDate = document.getElementById("matchDate").value;
    const aTeam = document.getElementById("aTeam").value;
    const bTeam = document.getElementById("bTeam").value;
    const set1TeamA = parseInt(document.getElementById("set1TeamA").value);
    const set1TeamB = parseInt(document.getElementById("set1TeamB").value);
    const set2TeamA = parseInt(document.getElementById("set2TeamA").value);
    const set2TeamB = parseInt(document.getElementById("set2TeamB").value);
    const set3TeamA = parseInt(document.getElementById("set3TeamA").value);
    const set3TeamB = parseInt(document.getElementById("set3TeamB").value);
    const ref1 = document.getElementById("ref1").value;
    const ref2 = document.getElementById("ref2").value;
    const line1 = document.getElementById("line1").value;
    const line2 = document.getElementById("line2").value;
    const line3 = document.getElementById("line3").value;
    const line4 = document.getElementById("line4").value;
    const skeeper = document.getElementById("skeeper").value;
    const pool = document.getElementById("pool").value;
    const teamGender = document.querySelector('input[name="teamGender"]:checked').value;
    const fixture = document.getElementById("fixture");
    const originalfile = fixture.files[0];

    const reader = new FileReader();

    reader.onloadend = function () {
      const fileData = reader.result;
      sessionStorage.setItem("uploadedFile", fileData);

      const winsTeamA = [set1TeamA > set1TeamB, set2TeamA > set2TeamB, set3TeamA > set3TeamB].filter(Boolean).length;
      const winsTeamB = [set1TeamB > set1TeamA, set2TeamB > set2TeamA, set3TeamB > set3TeamA].filter(Boolean).length;

      let winner = "Draw";
      let winningPoints = 0;

      if (winsTeamA > winsTeamB) {
        winner = aTeam;
        winningPoints = winsTeamA;
      } else if (winsTeamB > winsTeamA) {
        winner = bTeam;
        winningPoints = winsTeamB;
      }

      const totalPointsA = set1TeamA + set2TeamA + set3TeamA;
      const totalPointsB = set1TeamB + set2TeamB + set3TeamB;

      const matchData = {
        matchDate,
        aTeam,
        bTeam,
        teamGender,
        sets: [
          { teamA: set1TeamA, teamB: set1TeamB },
          { teamA: set2TeamA, teamB: set2TeamB },
          { teamA: set3TeamA, teamB: set3TeamB },
        ],
        winner,
        winningPoints,
        totalPointsA,
        totalPointsB,
        skeeper,
        ref1,
        ref2,
        line1,
        line2,
        line3,
        line4,
        pool,
        fileData
      };

      let matchHistory = JSON.parse(localStorage.getItem("matchHistory")) || [];
      matchHistory.push(matchData);
      localStorage.setItem("matchHistory", JSON.stringify(matchHistory));

      document.getElementById("scoreForm").reset();
      alert("Match record saved successfully!");
      window.location.href = "Results.html";
    };


    

    reader.readAsDataURL(originalfile);

    
  }
  
);
