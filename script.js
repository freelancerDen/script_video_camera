let currentCamera = "user";
const video = document.getElementById("video");
const btnPlay = document.querySelector("#btnPlay");
const btnPause = document.querySelector("#btnPause");
const btnReturn = document.querySelector("#btnReturn");
const switchBtn = document.getElementById("switch-btn");
const btnScreenshot = document.querySelector("#btnScreenshot");
const fullscreenBtn = document.getElementById("fullscreen-btn");
const fullscreenContainer = document.getElementById("fullscreen-container");
const fullscreenVideo = document.getElementById("fullscreen-video");
const fullscreenSwitchBtn = document.getElementById("fullscreen-switch-btn");
const fullscreenExitBtn = document.getElementById("fullscreen-exit-btn");
const fullscreenBtnScreenshot = document.getElementById("fullscreen-btnScreenshot")
const fullscreenBtnReturn = document.getElementById("fullscreen-btnReturn");
const fullscreenBtnPlay = document.getElementById("fullscreen-btnPlay");
const fullscreenPause = document.getElementById("fullscreen-btnPause");

const constraints = {
  video: {
    width: 450,
    // {
    //   min: 450,
    //   ideal: 1920,
    //   max: 2560,
    // },
    height: 600,
    // {
    //   min: 600,
    //   ideal: 1080,
    //   max: 1440,
    // },
  },
};
//
const canvas = document.createElement("canvas");
const canvas2 = document.createElement("canvas");
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "350px";
canvas.style.height = "450px";

canvas2.style.position = "absolute";
canvas2.style.top = "50px";
canvas2.style.left = "0";
canvas2.style.width = "100%";
canvas2.style.height = "100%";

document.body.appendChild(canvas);
document.body.appendChild(canvas2);

video.style.display = "none";
canvas2.style.display = "none";
btnReturn.style.display = "none";
fullscreenBtnReturn.style.display = "none";
fullscreenVideo.style.display = "none";

const image = document.createElement("img");

navigator.mediaDevices
  .getUserMedia(constraints)
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  })
  .catch((error) => {
    console.error(error);
  });

const ctx = canvas.getContext("2d");
// Загружаем изображение
const maskImage = new Image();
maskImage.src = "images/safety.png";
maskImage.onload = () => {
  // Отображаем видеопоток на canvas с добавлением изображения
  setInterval(() => {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      maskImage,
      canvas.width / 2 - 50,
      canvas.height / 2 - 50,
      100,
      100
    ); // размер и положение изображения на canvas
  }, 10);
};

//play
btnPlay.addEventListener("click", function () {
  video.play();
  btnPlay.classList.add("is-hidden");
  btnPause.classList.remove("is-hidden");
});

// pause
btnPause.addEventListener("click", function () {
  video.pause();
  btnPause.classList.add("is-hidden");
  btnPlay.classList.remove("is-hidden");
});

btnReturn.addEventListener("click", function () {
  video.play();
  btnReturn.style.display = "none";
});

switchBtn.addEventListener("click", () => {
  if (currentCamera === "user") {
    currentCamera = "environment";
  } else {
    currentCamera = "user";
  }
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: { exact: currentCamera } } })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((error) => {
      console.error(error);
    });
});

btnScreenshot.addEventListener("click", () => {
  // Останавливаем видеопоток и скрываем его
  video.pause();
  video.style.display = "none";
  btnReturn.style.display = "block";
  // Останавливаем отображение видеопотока на canvas
  clearInterval("1000");
  // Отображаем нарисованный видеопоток и изображение на canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(maskImage, 0, 0, canvas.width, canvas.height);
  // Отображаем фото на странице
  const imgData = canvas.toDataURL("image/png");
  image.src = imgData;
  image.style.display = "block";
  // Отправляем фото на сервер
  fetch("/upload", {
    method: "POST",
    body: imgData,
  })
    .then((response) => {
      console.log("Фото успешно отправлено на сервер");
    })
    .catch((error) => {
      console.error("Ошибка отправки фото на сервер", error);
    });
});

// FULLSCREEN

fullscreenBtn.addEventListener("click", () => {
  canvas.style.display = "none";
  canvas2.style.display = "block";
  btnPlay.style.display = "none";
  btnPause.style.display = "none";
  switchBtn.style.display = "none";
  fullscreenBtn.style.display = "none";
  btnScreenshot.style.display = "none";
  btnReturn.style.display = "none";
  video.pause();
  fullscreenVideo.srcObject = video.srcObject;
  fullscreenVideo.play();
  fullscreenContainer.style.display = "flex";
  document.documentElement.requestFullscreen();
});

fullscreenSwitchBtn.addEventListener("click", () => {
  if (currentCamera === "user") {
    currentCamera = "environment";
  } else {
    currentCamera = "user";
  }
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: { exact: currentCamera } } })
    .then((stream) => {
      fullscreenVideo.srcObject = stream;
      fullscreenVideo.play();
    })
    .catch((error) => {
      console.error(error);
    });
});

//play
fullscreenBtnPlay.addEventListener("click", function () {
  fullscreenVideo.play();
  fullscreenBtnPlay.classList.add("is-hidden");
  fullscreenPause.classList.remove("is-hidden");
});

// pause
fullscreenPause.addEventListener("click", function () {
  fullscreenVideo.pause();
  fullscreenPause.classList.add("is-hidden");
  fullscreenBtnPlay.classList.remove("is-hidden");
});

fullscreenBtnReturn.addEventListener("click", function () {
  fullscreenVideo.play();
  fullscreenBtnReturn.style.display = "none";
});

const ctx2 = canvas2.getContext("2d");
// Загружаем изображение
const maskImage2 = new Image();
maskImage2.src = "images/safety.png";
maskImage2.onload = () => {
  // Отображаем видеопоток на canvas с добавлением изображения
  setInterval(() => {
    ctx2.drawImage(fullscreenVideo, 0, 0, canvas2.width, canvas2.height);
    ctx2.drawImage(
      maskImage2,
      canvas2.width / 2 - 50,
      canvas2.height / 2 - 50,
      100,
      100
    ); // размер и положение изображения на canvas
  }, 10);
};

fullscreenExitBtn.addEventListener("click", () => {
  canvas.style.display = "block";
  canvas2.style.display = "none";
  btnPlay.style.display = "block";
  btnPause.style.display = "block";
  switchBtn.style.display = "block";
  fullscreenBtn.style.display = "block";
  btnScreenshot.style.display = "block";
  fullscreenVideo.pause();
  document.exitFullscreen();
  fullscreenContainer.style.display = "none";
  video.play();
});

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement === null) {
    canvas.style.display = "block";
    canvas2.style.display = "none";
    btnPlay.style.display = "block";
    btnPause.style.display = "block";
    switchBtn.style.display = "block";
    fullscreenBtn.style.display = "block";
    btnScreenshot.style.display = "block";
    fullscreenVideo.pause();
    fullscreenContainer.style.display = "none";
    video.play();
  }
});

fullscreenBtnScreenshot.addEventListener("click", () => {
  // Останавливаем видеопоток и скрываем его
  fullscreenVideo.pause();
  fullscreenVideo.style.display = "none";
  fullscreenBtnReturn.style.display = "block";
  // Останавливаем отображение видеопотока на canvas
  clearInterval("1000");
  // Отображаем нарисованный видеопоток и изображение на canvas
  ctx2.drawImage(fullscreenVideo, 0, 0, canvas2.width, canvas2.height);
  ctx2.drawImage(maskImage2, 0, 0, canvas2.width, canvas2.height);
  // Отображаем фото на странице
  const imgData = canvas.toDataURL("image/png");
  image.src = imgData;
  image.style.display = "block";
  // Отправляем фото на сервер
  fetch("/upload", {
    method: "POST",
    body: imgData,
  })
    .then((response) => {
      console.log("Фото успешно отправлено на сервер");
    })
    .catch((error) => {
      console.error("Ошибка отправки фото на сервер", error);
    });
});