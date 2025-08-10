function openReport() {
  document.getElementById("myForm").style.display = "block";
}
function closeReport() {
  document.getElementById("myForm").style.display = "none";
}
function closeLinkModal() {
  document.getElementById("link-modal").style.display = "none";
}
function shareButton() {
  if (navigator.share) {
    const e = window.location.href,
      t = document.title;
    navigator
      .share({
        title: t,
        text:
          "You can watch high-quality videos on this Stream page, one of the most powerful streaming platforms.\n\n" +
          t +
          "\n",
        url: e,
      })
      .then(() => {
        console.log("Thanks for sharing!");
      })
      .catch((e) => {
        console.log(`Couldn't share because of ${e.message}`);
      });
  } else
    alert(
      "Sorry, sharing isn't supported in this browser. Try Google Chrome or copy the link manually."
    );
}
function showAdsLinkModal(e) {
  const t = document.getElementById("link-modal"),
    n = document.getElementById("link-timer");
  t.style.display = "block";
  let o = 5;
  const l = setInterval(() => {
    o--,
      (n.innerHTML = o),
      0 === o &&
        (clearInterval(l),
        (n.innerHTML = ""),
        (window.location.href = e),
        closeLinkModal());
  }, 1e3);
}
document.addEventListener("DOMContentLoaded", () => {
  Plyr.setup("#myVideo", {
    controls: [
      "play-large",
      "rewind",
      "audio",
      "play",
      "fast-forward",
      "progress",
      "current-time",
      "duration",
      "captions",
      "settings",
      "pip",
      "airplay",
      "fullscreen",
    ],
  });
  const e = document.getElementById("theme-toggle-btn");
  let t = localStorage.getItem("theme") || "dark";
  const n = (t) =>
    "light" === t
      ? (document.body.classList.remove("bg-dark", "text-light"),
        document.body.classList.add("bg-light", "text-dark"),
        (e.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode'),
        e.classList.replace("btn-light", "btn-dark"))
      : (document.body.classList.remove("bg-light", "text-dark"),
        document.body.classList.add("bg-dark", "text-light"),
        (e.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode'),
        e.classList.replace("btn-dark", "btn-light"));
  e.addEventListener("click", () => {
    const e = document.body.classList.contains("bg-dark") ? "light" : "dark";
    n(e);
  }),
    n(t);
});
function Open_Link(e) {
  e && window.open(e, "_blank");
}
function showLinkModal(e) {
  window.open(e, "_blank");
}
function Open_DL(e) {
  window.location.href = e.replace("replace", "dl");
}
function Open_TG(e) {
  window.location.href = e.replace("replace", "tg");
}
const videolink = window.location.href,
  streamlink = videolink.replace("/watch/", "/dl/");
function vlc_player() {
  const e = streamlink.replace(/^https?:\/\//, "");
  window.location.href = `vlc://${e}`;
}
function mx_player() {
  const e = streamlink.replace(/^https?:\/\//, "");
  window.location.href = `intent://${e}#Intent;scheme=https;package=com.mxtech.videoplayer.ad;action=android.intent.action.VIEW;end`;
}
function playit_player() {
  const e = streamlink.replace(/^https?:\/\//, "");
  window.location.href = `intent://${e}#Intent;package=com.playit.videoplayer;action=android.intent.action.VIEW;end`;
}
function streamDownload() {
  window.location.href = streamlink;
}
document.addEventListener("DOMContentLoaded", () => {
  const e = document.createElement("style");
  (e.innerHTML =
    "@keyframes devBounce{0%,100%{transform:translateY(0);}50%{transform:translateY(-4px);}}.dev-icon{display:inline-block;animation:devBounce 1.2s infinite;color:#0dcaf0;margin-left:6px;}.footer-text{color:#0dcaf0;text-decoration:none;}"),
    document.head.appendChild(e);
  const t = document.createElement("footer");
  t.className =
    "py-2 text-center border-top border-secondary bg-dark text-light";
  const n = document.createElement("p");
  n.className = "mb-0";
  const o = document.createElement("a");
  (o.href = "tg://resolve?domain=Contact_Vicky_via_bot"),
    (o.target = "_blank"),
    (o.className = "footer-text");
  const l = document.createElement("i");
  l.className = "fa-solid fa-robot me-2";
  const a = document.createTextNode("Made by Filmyswap Developer"),
    c = document.createElement("i");
  (c.className = "fa-solid fa-laptop-code dev-icon"),
    o.appendChild(l),
    o.appendChild(a),
    o.appendChild(c),
    n.appendChild(o),
    t.appendChild(n),
    document.body.appendChild(t);
});
