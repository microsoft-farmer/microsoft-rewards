window.addEventListener("load", function () {
  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 100);
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function newTab() {
  const userInput = document.getElementById("userInput").value;
  const warn = document.getElementById("#warn");
  let flag = 0;
  let wt = parseInt(userInput) * 1000;
  // console.log(wt) // Parse the user's input as a number
  if (isNaN(wt)) {
    warn.innerHTML = "Please enter a number";
    flag = 1;
  }
  if (wt < 1000) {
    warn.innerHTML = "Please enter a number greater than 1";
    flag = 1;
  }
  if (wt > 60000) {
    warn.innerHTML = "Too Much wait time! enter something less than 1 min";
    flag = 1;
  }
  if (flag == 1) {
    return;
  } else {
    let words = [];
    try {
      const response = await fetch("words.json");
      words = await response.json();
      shuffleArray(words);

      const used = new Set();
      for (let i = 1; i <= 36; i++) {
        let index = Math.floor(Math.random() * words.length);
        while (used.has(index)) {
          index = Math.floor(Math.random() * words.length);
        }
        used.add(index);
        const openedWindow = window.open(
          `https://www.bing.com/search?q=${words[index]}+${words[index+2]}+${words[index+1]}`,
          "_blank"
        );
        await sleep(wt);
        if (openedWindow) {
          openedWindow.close();
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
