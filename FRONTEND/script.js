const generateBtn = document.getElementById("generateBtn");
const outputImg = document.getElementById("output");
const loader = document.getElementById("loader");

generateBtn.addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value;
  if (!prompt) {
    alert("Please enter a prompt!");
    return;
  }

  loader.style.display = "block";
  outputImg.style.display = "none";

  try {
    const response = await fetch("http://127.0.0.1:5000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    if (data.image) {
      outputImg.src = "data:image/png;base64," + data.image;
      outputImg.style.display = "block";
    } else {
      alert("Error: " + data.error);
    }

  } catch (err) {
    console.error(err);
    alert("Failed to fetch image. Make sure the backend is running.");
  } finally {
    loader.style.display = "none";
  }
});
