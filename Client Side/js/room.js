function showAlert(message, type = "info", duration = 2000) {
  const alertBox = document.getElementById("global-alert");
  const alertMessage = document.getElementById("alert-message");

  alertBox.className = `alert ${type}`;
  alertMessage.textContent = message;
  alertBox.classList.remove("hidden");

  setTimeout(() => {
    hideAlert();
  }, duration);
}

function hideAlert() {
  const alertBox = document.getElementById("global-alert");
  alertBox.classList.add("hidden");
}

// const params = new URLSearchParams(window.location.search);
// const roomId = params.get("id");

const url = sessionStorage.getItem("cardUrl");
const roomSection = document.querySelector(".room-container");

window.addEventListener("load", async () => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const result = await response.json();

      const {
        name,
        images,
        type,
        city,
        guests,
        bedrooms,
        beds,
        bathrooms,
        cityMapUrl,
      } = result.data;

      let country = "";
      if (city == "Dubai") {
        country = "UAE";
      } else {
        country = "Pakistan";
      }

      const roomHtml = `
              <div class="room-header">
            <h3 class="title">${name}</h3>
            <div class="wrapper">
                <span class="share icon"> <i class="fa-solid fa-arrow-up-from-bracket"></i>Share</span>
                <span class="heart icon"> <i class="fa-regular fa-heart heart-icon"></i>Save</span>
            </div>
        </div>
        <div class="images-view">
            <div class="main-image">
                <img src="${images?.[0].url}" alt="Room Image">
            </div>
            <div class="sub-images">
                <img src="${images?.[1].url}" alt="Room Image">
                <img src="${images?.[2].url}" alt="Room Image">
                <img src="${images?.[3].url}" alt="Room Image">
                <img src="${images?.[4].url}" alt="Room Image">
            </div>
        </div>

        <div class="image-lightbox hidden">
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
                <button class="close-lightbox">&times;</button>
                <div class="swiper lightbox-swiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide"><img src="${images?.[0].url}" /></div>
                        <div class="swiper-slide"><img src="${images?.[1].url}" /></div>
                        <div class="swiper-slide"><img src="${images?.[2].url}" /></div>
                        <div class="swiper-slide"><img src="${images?.[3].url}" /></div>
                        <div class="swiper-slide"><img src="${images?.[4].url}" /></div>
                    </div>
                    <!-- Arrows -->
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </div>
            </div>
        </div>

        <div class="room-details">
            <div class="info">
                <h3 class="title">${type} in ${city}, ${country}</h3>
                <ol class="details">
                    <li>${guests} guests </li>
                    <li><span class="seprator">•</span>${bedrooms} bedroom </li>
                    <li><span class="seprator">•</span>${beds} bed </li>
                    <li><span class="seprator">•</span>${bathrooms} bathrooms</li>
                </ol>

            </div>

            <div class="guests-favorite">
                <div class="favorite-badge">
                    <svg viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg" height="36">
                        <g clip-path="url(#clip0_5880_37773)">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M15.4895 25.417L14.8276 24.4547L16.5303 23.6492L17.1923 24.6116L16.3409 25.0143L17.1923 24.6116C18.6638 26.751 17.9509 29.3868 15.5999 30.4989C14.8548 30.8513 14.0005 31.0196 13.1221 30.987L12.8044 30.9752L12.7297 29.2305L13.0474 29.2423C13.5744 29.2618 14.0871 29.1608 14.5341 28.9494C15.9447 28.2821 16.3725 26.7007 15.4895 25.417Z"
                                fill="#222222"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M8.32441 10.235C10.0819 8.96204 10.9247 7.4878 10.853 5.81232C10.7813 4.13685 9.80929 2.59524 7.93708 1.18749C6.17964 2.46049 5.33678 3.93473 5.40851 5.6102C5.48024 7.28568 6.45221 8.82729 8.32441 10.235Z"
                                fill="#F7F7F7"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M7.19425 0.489275C7.55718 0.226387 8.10753 0.246818 8.49416 0.537533C10.5385 2.07473 11.7071 3.84975 11.7923 5.84026C11.8775 7.83076 10.8574 9.52453 8.93841 10.9146C8.57548 11.1775 8.02513 11.157 7.6385 10.8663C5.59415 9.32914 4.4256 7.55411 4.34039 5.56361C4.25517 3.57311 5.27521 1.87933 7.19425 0.489275ZM7.92362 2.3684C6.77985 3.38355 6.29788 4.47199 6.3478 5.63813C6.39772 6.80428 6.97457 7.93203 8.20904 9.03547C9.35281 8.02032 9.83478 6.93187 9.78486 5.76573C9.73493 4.59959 9.15809 3.47184 7.92362 2.3684Z"
                                fill="#222222"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M15.6806 24.0529C14.1314 22.353 12.4326 21.4688 10.5842 21.4001C8.73575 21.3315 7.10737 22.0923 5.69905 23.6824C7.24822 25.3823 8.94702 26.2666 10.7955 26.3352C12.6439 26.4038 14.2723 25.6431 15.6806 24.0529Z"
                                fill="#F7F7F7"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M4.90529 24.1787C4.60807 23.8526 4.58911 23.4097 4.8593 23.1046C6.38985 21.3765 8.27538 20.4331 10.521 20.5164C12.7666 20.5998 14.7391 21.6864 16.4227 23.5339C16.7199 23.86 16.7389 24.303 16.4687 24.608C14.9381 26.3361 13.0526 27.2795 10.807 27.1962C8.56134 27.1128 6.5889 26.0262 4.90529 24.1787ZM6.98781 23.7198C8.22307 24.8808 9.46778 25.4045 10.7323 25.4515C11.9968 25.4984 13.2005 25.0656 14.3402 23.9928C13.1049 22.8318 11.8602 22.3081 10.5957 22.2611C9.3312 22.2142 8.12744 22.6471 6.98781 23.7198Z"
                                fill="#222222"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M10.6766 20.7043C10.2137 18.5957 9.16392 17.0928 7.52727 16.1956C5.89062 15.2984 3.99442 15.1864 1.83867 15.8596C2.30157 17.9683 3.35135 19.4712 4.988 20.3684C6.62465 21.2656 8.52085 21.3775 10.6766 20.7043Z"
                                fill="#F7F7F7"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M0.791956 15.9443C0.703053 15.5393 0.94431 15.1569 1.37329 15.023C3.7337 14.2859 5.9714 14.3695 7.95247 15.4554C9.92449 16.5364 11.1013 18.3139 11.6022 20.5956C11.6911 21.0006 11.4499 21.3829 11.0209 21.5169C8.66048 22.254 6.42277 22.1704 4.4417 21.0844C2.46969 20.0034 1.29285 18.226 0.791956 15.9443ZM2.95349 16.4656C3.43375 17.9951 4.27991 19.007 5.41321 19.6282C6.5306 20.2407 7.84423 20.4286 9.44069 20.0743C8.96043 18.5448 8.11427 17.5329 6.98097 16.9116C5.86358 16.2991 4.54995 16.1113 2.95349 16.4656Z"
                                fill="#222222"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M7.90911 15.6267C8.65652 13.6743 8.53705 11.9555 7.55072 10.4702C6.56438 8.98484 4.90844 8.03014 2.58291 7.60605C1.8355 9.55846 1.95497 11.2773 2.9413 12.7626C3.92764 14.2479 5.58357 15.2026 7.90911 15.6267Z"
                                fill="#F7F7F7"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M1.66037 7.28295C1.80927 6.89397 2.26578 6.67525 2.74598 6.76282C5.29848 7.22831 7.26368 8.31371 8.44396 10.0911C9.61955 11.8614 9.70866 13.854 8.89805 15.9715C8.74915 16.3605 8.29264 16.5792 7.81244 16.4916C5.25994 16.0261 3.29474 14.9407 2.11446 13.1634C0.938866 11.393 0.849755 9.40048 1.66037 7.28295ZM3.3385 8.6613C2.94038 10.1267 3.14588 11.3465 3.83454 12.3835C4.51397 13.4067 5.60091 14.1584 7.21992 14.5931C7.61804 13.1278 7.41254 11.9079 6.72388 10.8709C6.04445 9.84774 4.95751 9.09607 3.3385 8.6613Z"
                                fill="#222222"></path>
                        </g>
                        <defs>
                            <clipPath id="clip0_5880_37773">
                                <rect width="18.8235" height="32" fill="white"
                                    transform="translate(0.453125 0.000488281)">
                                </rect>
                            </clipPath>
                        </defs>
                    </svg>
                    <span class="badge-text">Guest favorite</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 32" fill="none" height="36" class="">
                        <g clip-path="url(#clip0_5880_37786)">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M4.06516 25.417L4.72713 24.4547L3.02437 23.6492L2.3624 24.6116L3.21378 25.0143L2.3624 24.6116C0.890857 26.751 1.60381 29.3868 3.95483 30.4989C4.69986 30.8513 5.55423 31.0196 6.43257 30.987L6.75025 30.9752L6.82494 29.2305L6.50726 29.2423C5.98026 29.2618 5.46764 29.1608 5.02062 28.9494C3.61001 28.2821 3.18223 26.7007 4.06516 25.417Z"
                                fill="#222222"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.2303 10.235C9.47283 8.96204 8.62998 7.4878 8.70171 5.81232C8.77344 4.13685 9.7454 2.59524 11.6176 1.18749C13.375 2.46049 14.2179 3.93473 14.1462 5.6102C14.0744 7.28568 13.1025 8.82729 11.2303 10.235Z"
                                fill="#F7F7F7"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M12.3604 0.489275C11.9975 0.226387 11.4472 0.246818 11.0605 0.537533C9.01618 2.07473 7.84763 3.84975 7.76242 5.84026C7.6772 7.83076 8.69724 9.52453 10.6163 10.9146C10.9792 11.1775 11.5296 11.157 11.9162 10.8663C13.9605 9.32914 15.1291 7.55411 15.2143 5.56361C15.2995 3.57311 14.2795 1.87933 12.3604 0.489275ZM11.6311 2.3684C12.7748 3.38355 13.2568 4.47199 13.2069 5.63813C13.157 6.80428 12.5801 7.93203 11.3456 9.03547C10.2019 8.02032 9.71991 6.93187 9.76983 5.76573C9.81975 4.59959 10.3966 3.47184 11.6311 2.3684Z"
                                fill="#222222"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M3.87411 24.0529C5.42328 22.353 7.12208 21.4688 8.97051 21.4001C10.8189 21.3315 12.4473 22.0923 13.8556 23.6824C12.3065 25.3823 10.6077 26.2666 8.75924 26.3352C6.9108 26.4038 5.28243 25.6431 3.87411 24.0529Z"
                                fill="#F7F7F7"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M14.6494 24.1787C14.9466 23.8526 14.9656 23.4097 14.6954 23.1046C13.1648 21.3765 11.2793 20.4331 9.03368 20.5164C6.78805 20.5998 4.81561 21.6864 3.13199 23.5339C2.83478 23.86 2.81582 24.303 3.08601 24.608C4.61655 26.3361 6.50208 27.2795 8.74771 27.1962C10.9933 27.1128 12.9658 26.0262 14.6494 24.1787ZM12.5669 23.7198C11.3316 24.8808 10.0869 25.4045 8.82241 25.4515C7.55791 25.4984 6.35415 25.0656 5.21452 23.9928C6.44977 22.8318 7.69449 22.3081 8.95899 22.2611C10.2235 22.2142 11.4272 22.6471 12.5669 23.7198Z"
                                fill="#222222"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M8.87809 20.7043C9.34099 18.5957 10.3908 17.0928 12.0274 16.1956C13.6641 15.2984 15.5603 15.1864 17.716 15.8596C17.2531 17.9683 16.2033 19.4712 14.5667 20.3684C12.93 21.2656 11.0338 21.3775 8.87809 20.7043Z"
                                fill="#F7F7F7" class=""></path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M18.7627 15.9443C18.8516 15.5393 18.6104 15.1569 18.1814 15.023C15.821 14.2859 13.5833 14.3695 11.6022 15.4554C9.6302 16.5364 8.45336 18.3139 7.95247 20.5956C7.86356 21.0006 8.10482 21.3829 8.5338 21.5169C10.8942 22.254 13.1319 22.1704 15.113 21.0844C17.085 20.0034 18.2618 18.226 18.7627 15.9443ZM16.6012 16.4656C16.1209 17.9951 15.2748 19.007 14.1415 19.6282C13.0241 20.2407 11.7105 20.4286 10.114 20.0743C10.5943 18.5448 11.4404 17.5329 12.5737 16.9116C13.6911 16.2991 15.0047 16.1113 16.6012 16.4656Z"
                                fill="#222222" class=""></path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.6456 15.6267C10.8982 13.6743 11.0176 11.9555 12.004 10.4702C12.9903 8.98484 14.6462 8.03014 16.9718 7.60605C17.7192 9.55846 17.5997 11.2773 16.6134 12.7626C15.6271 14.2479 13.9711 15.2026 11.6456 15.6267Z"
                                fill="#F7F7F7"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M17.8943 7.28295C17.7454 6.89397 17.2889 6.67525 16.8087 6.76282C14.2562 7.22831 12.291 8.31371 11.1107 10.0911C9.93513 11.8614 9.84602 13.854 10.6566 15.9715C10.8055 16.3605 11.262 16.5792 11.7422 16.4916C14.2947 16.0261 16.26 14.9407 17.4402 13.1634C18.6158 11.393 18.7049 9.40048 17.8943 7.28295ZM16.2162 8.6613C16.6143 10.1267 16.4088 11.3465 15.7201 12.3835C15.0407 13.4067 13.9538 14.1584 12.3348 14.5931C11.9366 13.1278 12.1421 11.9079 12.8308 10.8709C13.5102 9.84774 14.5972 9.09607 16.2162 8.6613Z"
                                fill="#222222" class=""></path>
                        </g>
                        <defs>
                            <clipPath id="clip0_5880_37786">
                                <rect width="18.8235" height="32" fill="white"
                                    transform="matrix(-1 0 0 1 19.1016 0.000488281)"></rect>
                            </clipPath>
                        </defs>
                    </svg>
                </div>

                <div class="favorite-description">One of the most loved homes on Airbnb, according to guests</div>

                <div class="rating-container">
                    <span class="rating-value">4.97</span>
                    <span class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </span>
                </div>
                <div class="rating-count">
                    <span class="review-count">34</span>
                    <span class="review-text">reviews</span>
                </div>
            </div>

            <div class="host">
                <div class="profile">
                    <img src="./assets/profile.jpg" alt="">
                </div>
                <div class="details">
                    <span class="host-name">Hosted by Muhammad Bilal</span>
                    <span class="host-subline">Superhost • months hosting</span>
                </div>
            </div>

            <div class="features">
                <div class="feature-item">
                    <div class="logo">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"
                            role="presentation" focusable="false"
                            style="display: block; height: 30px; width: 30px; fill: currentcolor;" class=""
                            data-label="svg">
                            <path
                                d="M20.33 3.08c1.5 2.24.96 5.55-1.38 9.9l-.12.2.18.18c.1.13.21.26.3.4l.23.38.14.02c.7.06 1.78-.11 2.87-.48.89-.3 1.78-.78 2.68-1.45l.66-.52a3 3 0 0 1 4.77 1.33l.12.44c.59 3.35.02 5.73-1.86 6.98-2.24 1.5-5.54.96-9.9-1.39a3 3 0 0 1-.27-.16l-.07.07-.39.3-.28.19V20c-.03.7.15 1.68.48 2.68.3.88.78 1.78 1.45 2.68l.26.33.26.33a3 3 0 0 1-.36 4.22C19 31 17.95 31 17 31h-.54l-1.39-.1c-1.24-.19-2.56-.65-3.36-1.84-1.5-2.25-.96-5.55 1.39-9.91.04-.09.1-.17.15-.25a4.12 4.12 0 0 1-.37-.4.82.82 0 0 0-.18-.23.5.5 0 0 0-.21-.11c-.7-.1-1.85.06-3.04.46-.88.3-1.78.78-2.68 1.45l-.66.52a3 3 0 0 1-4.77-1.33l-.12-.44c-.59-3.35-.02-5.73 1.86-6.98 2.24-1.5 5.55-.96 9.9 1.38l.1.05c.3-.3.55-.5.72-.61l.2-.13.03-.2c.06-.7-.11-1.78-.48-2.88a9.6 9.6 0 0 0-1.45-2.68l-.52-.66a3 3 0 0 1 1.33-4.77l.44-.12c3.35-.59 5.73-.02 6.98 1.86zm-5.31 16.8-.16.22c-2.04 3.77-2.5 6.45-1.49 7.85 1.13 1.55 4.63 1.55 5.44.77.38-.36.47-.89.2-1.31l-.37-.45a11.94 11.94 0 0 1-2.05-3.64 10.93 10.93 0 0 1-.59-3.03V20h-.14a4.01 4.01 0 0 1-.63-.07l-.21-.05zM4.09 13.52c-1.56 1.13-1.56 4.63-.78 5.44.36.38.9.46 1.32.19l.44-.36c1.2-.96 2.42-1.64 3.65-2.05 1.16-.4 2.33-.6 3.28-.6V16c0-.14 0-.28.02-.42l.08-.46-.16-.12c-3.78-2.03-6.46-2.5-7.85-1.48zm23.24-.36-.45.36c-1.2.96-2.41 1.64-3.64 2.05-1.15.38-2.3.6-3.24.6-.01.25-.05.5-.1.74l-.07.26.19.14c3.77 2.03 6.45 2.5 7.85 1.48 1.55-1.13 1.55-4.63.78-5.44-.36-.38-.9-.47-1.32-.19zM16 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13.2 3.39c-.37.36-.46.89-.18 1.31l.36.45c.95 1.2 1.64 2.42 2.05 3.64.37 1.14.59 2.27.59 3.2l.54.05.3.05.2.05.1-.13c2.04-3.77 2.5-6.45 1.49-7.84-1.13-1.56-4.63-1.56-5.44-.78z"
                                class=""></path>
                        </svg>
                    </div>
                    <div class="details">
                        <span class="title">Designed for staying cool</span>
                        <span class="subtitle">Beat the heat with the AC and ceiling fan.</span>
                    </div>
                </div>
                <div class="feature-item">
                    <div class="logo">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"
                            role="presentation" focusable="false"
                            style="display: block; height: 30px; width: 30px; fill: currentcolor;" class="">
                            <path
                                d="M24.33 1.67a2 2 0 0 1 2 1.85v24.81h3v2H2.67v-2h3V3.67a2 2 0 0 1 1.85-2h.15zm-4 2H7.67v24.66h12.66zm4 0h-2v24.66h2zm-7 11a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66z"
                                class=""></path>
                        </svg>
                    </div>
                    <div class="details">
                        <span class="title">Self check-in</span>
                        <span class="subtitle">Check yourself in with the smartlock..</span>
                    </div>
                </div>
                <div class="feature-item">
                    <div class="logo">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"
                            role="presentation" focusable="false"
                            style="display: block; height: 24px; width: 24px; fill: currentcolor;" class="">
                            <path
                                d="M16 0a12 12 0 0 1 12 12c0 6.34-3.81 12.75-11.35 19.26l-.65.56-1.08-.93C7.67 24.5 4 18.22 4 12 4 5.42 9.4 0 16 0zm0 2C10.5 2 6 6.53 6 12c0 5.44 3.25 11.12 9.83 17.02l.17.15.58-.52C22.75 23 25.87 17.55 26 12.33V12A10 10 0 0 0 16 2zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
                                class=""></path>
                        </svg>
                    </div>
                    <div class="details">
                        <span class="title">Peace and quiet</span>
                        <span class="subtitle">Guests say this home is in a quiet area.</span>
                    </div>
                </div>
            </div>

            <div class="room-description">
                <span>Enjoy your stay at our coziest self check in one bedroom family friendly apartment. Situated in
                    Gulberg , center of city. 24 hour generator backup. Peaceful atmosphere. Petrol pump, Shopping mall,
                    Cafes and Cinema at walking distance. It comes with a huge lounge, king size bed, one extra
                    mattress, cooking unit, dining table, refrigerator, oven, washer/dryer, warm water, TV and internet
                    facility. This place is designed to add to your peace and comfort.</span>
            </div>

            <div class="features">
                <div class="feature-item">
                    <div class="logo">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"
                            role="presentation" focusable="false"
                            style="display: block; height: 24px; width: 24px; fill: currentcolor;">
                            <path
                                d="M26 1a5 5 0 0 1 5 5c0 6.39-1.6 13.19-4 14.7V31h-2V20.7c-2.36-1.48-3.94-8.07-4-14.36v-.56A5 5 0 0 1 26 1zm-9 0v18.12c2.32.55 4 3 4 5.88 0 3.27-2.18 6-5 6s-5-2.73-5-6c0-2.87 1.68-5.33 4-5.88V1zM2 1h1c4.47 0 6.93 6.37 7 18.5V21H4v10H2zm14 20c-1.6 0-3 1.75-3 4s1.4 4 3 4 3-1.75 3-4-1.4-4-3-4zM4 3.24V19h4l-.02-.96-.03-.95C7.67 9.16 6.24 4.62 4.22 3.36L4.1 3.3zm19 2.58v.49c.05 4.32 1.03 9.13 2 11.39V3.17a3 3 0 0 0-2 2.65zm4-2.65V17.7c.99-2.31 2-7.3 2-11.7a3 3 0 0 0-2-2.83z">
                            </path>
                        </svg>
                    </div>
                    <div class="details">
                        <span class="title">Kitchen</span>
                    </div>
                </div>
                <div class="feature-item">
                    <div class="logo">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"
                            role="presentation" focusable="false"
                            style="display: block; height: 24px; width: 24px; fill: currentcolor;">
                            <path
                                d="M16 20.33a3.67 3.67 0 1 1 0 7.34 3.67 3.67 0 0 1 0-7.34zm0 2a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34zM16 15a9 9 0 0 1 8.04 4.96l-1.51 1.51a7 7 0 0 0-13.06 0l-1.51-1.51A9 9 0 0 1 16 15zm0-5.33c4.98 0 9.37 2.54 11.94 6.4l-1.45 1.44a12.33 12.33 0 0 0-20.98 0l-1.45-1.45A14.32 14.32 0 0 1 16 9.66zm0-5.34c6.45 0 12.18 3.1 15.76 7.9l-1.43 1.44a17.64 17.64 0 0 0-28.66 0L.24 12.24c3.58-4.8 9.3-7.9 15.76-7.9z">
                            </path>
                        </svg>
                    </div>
                    <div class="details">
                        <span class="title">Wifi</span>
                    </div>
                </div>
                <div class="feature-item">
                    <div class="logo">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"
                            role="presentation" focusable="false"
                            style="display: block; height: 24px; width: 24px; fill: currentcolor;">
                            <path
                                d="M13.7 13.93a4 4 0 0 1 5.28.6l.29.37 4.77 6.75a4 4 0 0 1 .6 3.34 4 4 0 0 1-4.5 2.91l-.4-.08-3.48-.93a1 1 0 0 0-.52 0l-3.47.93a4 4 0 0 1-2.94-.35l-.4-.25a4 4 0 0 1-1.2-5.2l.23-.37 4.77-6.75a4 4 0 0 1 .96-.97zm3.75 1.9a2 2 0 0 0-2.98.08l-.1.14-4.84 6.86a2 2 0 0 0 2.05 3.02l.17-.04 4-1.07a1 1 0 0 1 .5 0l3.97 1.06.15.04a2 2 0 0 0 2.13-2.97l-4.95-7.01zM27 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM5 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm22 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6-10a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm10 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM11 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z">
                            </path>
                        </svg>
                    </div>
                    <div class="details">
                        <span class="title">Pets allowed</span>
                    </div>
                </div>

                <div class="feature-item">
                    <div class="logo">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"
                            role="presentation" focusable="false"
                            style="display: block; height: 24px; width: 24px; fill: currentcolor;">
                            <path
                                d="M9 29v-2h2v-2H6a5 5 0 0 1-5-4.78V8a5 5 0 0 1 4.78-5H26a5 5 0 0 1 5 4.78V20a5 5 0 0 1-4.78 5H21v2h2v2zm10-4h-6v2h6zm7-20H6a3 3 0 0 0-3 2.82V20a3 3 0 0 0 2.82 3H26a3 3 0 0 0 3-2.82V8a3 3 0 0 0-2.82-3z">
                            </path>
                        </svg>
                    </div>
                    <div class="details">
                        <span class="title">50 inch HDTV</span>
                    </div>
                </div>

                <div class="feature-item">
                    <div class="logo">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"
                            role="presentation" focusable="false"
                            style="display: block; height: 24px; width: 24px; fill: currentcolor;">
                            <path
                                d="M30 1a1 1 0 0 1 1 .88V30a1 1 0 0 1-.88 1H2a1 1 0 0 1-1-.88V2a1 1 0 0 1 .88-1H2zM3 3v26h12V3zm7 9v6.58l1.8-1.79 1.4 1.42-3.5 3.5a1 1 0 0 1-1.31.08l-.1-.08-3.5-3.5 1.42-1.42L8 18.6V12zm12.39-1.5a1 1 0 0 1 1.22 0l.1.09 3.5 3.5-1.42 1.41L24 13.7V20h-2v-6.3l-1.8 1.8-1.4-1.41 3.5-3.5zM17 29h12V3H17z">
                            </path>
                        </svg>
                    </div>
                    <div class="details">
                        <span class="title">Elevator</span>
                    </div>
                </div>
            </div>

            <div class="living-space">
                <h3 class="heading">Where you’ll live</h3>
                <div class="living-space-cards">
                    <img src="${images?.[1].url}" alt="Room Image">
                    <img src="${images?.[2].url}" alt="Room Image">
                </div>
            </div>

        </div>

        <div class="location">
            <div class="location-header">
                <h2 class="location-title">Where you'll be</h2>
                <span class="location-address">${city}, ${country}</s>
            </div>
            <iframe class="map" src="${cityMapUrl}" allowfullscreen
                loading="lazy">
            </iframe>

        </div>`;

      roomSection.innerHTML = roomHtml;
    } else {
      showAlert(result.message || "Card fetching failed.", "error");
    }
  } catch (error) {
    console.error("Error:", error);
    showAlert("Something went wrong. Please check your connection.", "error");
  }

  // room Image preview
  const lightbox = document.querySelector(".image-lightbox");
  const openImages = document.querySelectorAll(".images-view img");
  const closeBtn = document.querySelector(".close-lightbox");

  // Initialize Swiper
  const swiper = new Swiper(".lightbox-swiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
  });

  openImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      lightbox.classList.remove("hidden");
      document.body.classList.add("no-scroll"); // Disable scroll
      swiper.slideTo(index);
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.classList.add("hidden");
    document.body.classList.remove("no-scroll"); // Enable scroll
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      lightbox.classList.add("hidden");
      document.body.classList.remove("no-scroll");
    }
  });
});
