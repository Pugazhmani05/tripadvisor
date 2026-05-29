// ============================================================
//  TripAdvisor Clone — script.js
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  /* ──────────────────────────────────────────────
     1. MOBILE MENU TOGGLE
     Shows/hides nav links when hamburger is tapped
  ────────────────────────────────────────────── */
  const menuBtn   = document.querySelector(".menu");
  const navLinks  = document.querySelector(".s__2");
  const navRight  = document.querySelector(".s__3");
  const navCurr   = document.querySelector(".s__3_1");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      // Toggle a mobile-nav overlay
      let mobileNav = document.getElementById("mobile-nav-overlay");

      if (mobileNav) {
        mobileNav.remove();
        return;
      }

      mobileNav = document.createElement("div");
      mobileNav.id = "mobile-nav-overlay";
      mobileNav.innerHTML = `
        <div class="mob-nav-inner">
          <button class="mob-close" id="mob-close-btn">✕ Close</button>
          <nav>
            <a href="#">Discover</a>
            <a href="#">Trip</a>
            <a href="#">Review</a>
            <a href="#">More</a>
          </nav>
          <div class="mob-actions">
            <button id="mob-signin-btn">Sign In</button>
          </div>
        </div>
      `;

      // Inline styles so no extra CSS file needed
      Object.assign(mobileNav.style, {
        position:        "fixed",
        top:             "0",
        left:            "0",
        width:           "100%",
        height:          "100%",
        background:      "rgba(0,0,0,0.85)",
        zIndex:          "9999",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
      });

      const inner = mobileNav.querySelector(".mob-nav-inner");
      Object.assign(inner.style, {
        background:   "#fff",
        borderRadius: "12px",
        padding:      "30px 40px",
        width:        "80%",
        maxWidth:     "340px",
        textAlign:    "center",
      });

      mobileNav.querySelectorAll("nav a").forEach(a => {
        Object.assign(a.style, {
          display:      "block",
          padding:      "12px 0",
          fontSize:     "20px",
          fontWeight:   "bold",
          color:        "#000",
          textDecoration: "none",
          borderBottom: "1px solid #eee",
        });
      });

      const closeBtn = mobileNav.querySelector("#mob-close-btn");
      Object.assign(closeBtn.style, {
        background:   "transparent",
        border:       "none",
        fontSize:     "16px",
        cursor:       "pointer",
        marginBottom: "20px",
        display:      "block",
        width:        "100%",
        textAlign:    "right",
      });

      const signInBtn = mobileNav.querySelector("#mob-signin-btn");
      Object.assign(signInBtn.style, {
        marginTop:    "20px",
        padding:      "12px 30px",
        background:   "#000",
        color:        "#fff",
        border:       "none",
        borderRadius: "30px",
        fontSize:     "16px",
        cursor:       "pointer",
        fontWeight:   "bold",
      });

      document.body.appendChild(mobileNav);

      closeBtn.addEventListener("click",    () => mobileNav.remove());
      signInBtn.addEventListener("click",   () => openSignInModal());
      mobileNav.addEventListener("click", e => {
        if (e.target === mobileNav) mobileNav.remove();
      });
    });
  }


  /* ──────────────────────────────────────────────
     2. SIGN IN MODAL
  ────────────────────────────────────────────── */
  function openSignInModal() {
    // Remove mobile nav if open
    const mob = document.getElementById("mobile-nav-overlay");
    if (mob) mob.remove();

    let modal = document.getElementById("signin-modal");
    if (modal) { modal.remove(); return; }

    modal = document.createElement("div");
    modal.id = "signin-modal";
    modal.innerHTML = `
      <div class="modal-box">
        <button class="modal-close" id="modal-close-x">✕</button>
        <h2>Sign in to TripAdvisor</h2>
        <p>Welcome back! Please enter your details.</p>
        <div class="modal-field">
          <label>Email</label>
          <input type="email" id="modal-email" placeholder="you@example.com">
        </div>
        <div class="modal-field">
          <label>Password</label>
          <input type="password" id="modal-pass" placeholder="••••••••">
        </div>
        <p id="modal-error" style="color:red;font-size:13px;min-height:18px;"></p>
        <button id="modal-submit">Sign In</button>
        <p class="modal-footer">Don't have an account? <a href="#">Join free</a></p>
      </div>
    `;

    Object.assign(modal.style, {
      position:       "fixed", top: "0", left: "0",
      width:          "100%",  height: "100%",
      background:     "rgba(0,0,0,0.6)",
      zIndex:         "10000",
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
    });

    const box = modal.querySelector(".modal-box");
    Object.assign(box.style, {
      background:   "#fff",
      borderRadius: "16px",
      padding:      "36px 40px",
      width:        "90%",
      maxWidth:      "400px",
      position:     "relative",
    });

    box.querySelector("h2").style.cssText  = "margin-bottom:6px;font-size:24px;";
    box.querySelector("p").style.cssText   = "color:#666;margin-bottom:20px;font-size:14px;";

    modal.querySelectorAll(".modal-field").forEach(f => {
      f.style.cssText = "display:flex;flex-direction:column;gap:4px;margin-bottom:14px;";
      f.querySelector("label").style.cssText = "font-size:13px;font-weight:bold;";
      const inp = f.querySelector("input");
      inp.style.cssText = "padding:10px 14px;border:1px solid #ccc;border-radius:8px;font-size:15px;outline:none;";
    });

    const submitBtn = modal.querySelector("#modal-submit");
    Object.assign(submitBtn.style, {
      width:        "100%", padding: "13px",
      background:   "#000", color: "#fff",
      border:       "none", borderRadius: "30px",
      fontSize:     "16px", fontWeight: "bold",
      cursor:       "pointer", marginTop: "4px",
    });

    const closeX = modal.querySelector("#modal-close-x");
    Object.assign(closeX.style, {
      position:   "absolute", top: "14px", right: "16px",
      background: "transparent", border: "none",
      fontSize:   "20px", cursor: "pointer",
    });

    box.querySelector(".modal-footer").style.cssText =
      "text-align:center;margin-top:16px;font-size:13px;";

    document.body.appendChild(modal);

    closeX.addEventListener("click", () => modal.remove());
    modal.addEventListener("click", e => { if (e.target === modal) modal.remove(); });

    submitBtn.addEventListener("click", () => {
      const email = modal.querySelector("#modal-email").value.trim();
      const pass  = modal.querySelector("#modal-pass").value.trim();
      const err   = modal.querySelector("#modal-error");

      if (!email || !email.includes("@")) {
        err.textContent = "Please enter a valid email address."; return;
      }
      if (pass.length < 6) {
        err.textContent = "Password must be at least 6 characters."; return;
      }

      err.textContent = "";
      submitBtn.textContent = "Signing in…";
      submitBtn.disabled = true;

      setTimeout(() => {
        modal.remove();
        showToast("✅ Signed in successfully!");
        // Update sign-in button text
        const signinBtn = document.querySelector(".s__3 button");
        if (signinBtn) signinBtn.textContent = email.split("@")[0];
      }, 1200);
    });
  }

  // Wire the header Sign In button
  const signInBtn = document.querySelector(".s__3 button");
  if (signInBtn) signInBtn.addEventListener("click", openSignInModal);


  /* ──────────────────────────────────────────────
     3. SEARCH BAR — live placeholder cycling
        & search button click
  ────────────────────────────────────────────── */
  const searchInput = document.querySelector(".se__1 input");
  const searchBtn   = document.querySelector(".search button");

  const placeholders = [
    "Place to go, things to do, hotels…",
    "Try: Trichy temples",
    "Try: Ooty hill station",
    "Try: Rameswaram beach",
    "Try: Amsterdam canal cruise",
  ];

  let phIdx = 0;
  if (searchInput) {
    setInterval(() => {
      phIdx = (phIdx + 1) % placeholders.length;
      searchInput.placeholder = placeholders[phIdx];
    }, 2500);
  }

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.trim();
      if (!query) {
        searchInput.style.border = "2px solid red";
        searchInput.placeholder  = "Please enter something to search!";
        setTimeout(() => {
          searchInput.style.border = "none";
          searchInput.placeholder  = placeholders[0];
        }, 2000);
        return;
      }
      showToast(`🔍 Searching for "${query}"…`);
      searchInput.value = "";
    });

    // Allow pressing Enter to search
    searchInput.addEventListener("keydown", e => {
      if (e.key === "Enter") searchBtn.click();
    });
  }


  /* ──────────────────────────────────────────────
     4. CATEGORY TABS — active highlight
  ────────────────────────────────────────────── */
  const cats = document.querySelectorAll(".catagories div");
  cats.forEach(cat => {
    cat.style.cursor = "pointer";
    cat.style.transition = "background 0.2s, border-radius 0.2s";

    cat.addEventListener("click", () => {
      cats.forEach(c => {
        c.style.background    = "transparent";
        c.style.borderRadius  = "0";
        c.style.padding       = "0";
      });
      cat.style.background   = "#00eb5b";
      cat.style.borderRadius = "30px";
      cat.style.padding      = "6px 14px";
    });
  });


  /* ──────────────────────────────────────────────
     5. WISHLIST HEART BUTTONS (fa-gratipay icons)
        Toggle filled/outlined on click
  ────────────────────────────────────────────── */
  const hearts = document.querySelectorAll(".calaction__1 .fa-gratipay");
  hearts.forEach(heart => {
    Object.assign(heart.parentElement.style, {
      cursor:   "pointer",
      fontSize: "28px",
      color:    "#ccc",
    });

    heart.parentElement.title = "Save to wishlist";

    heart.parentElement.addEventListener("click", function () {
      const saved = this.dataset.saved === "true";
      this.dataset.saved  = !saved;
      this.style.color    = saved ? "#ccc" : "#e03131";
      this.title          = saved ? "Save to wishlist" : "Saved!";
      showToast(saved ? "💔 Removed from wishlist" : "❤️ Added to wishlist!");
    });
  });


  /* ──────────────────────────────────────────────
     6. STICKY NAVBAR — shadow on scroll
  ────────────────────────────────────────────── */
  const sections = document.querySelector(".sections");
  window.addEventListener("scroll", () => {
    if (!sections) return;
    if (window.scrollY > 10) {
      sections.style.boxShadow = "0 2px 12px rgba(0,0,0,0.12)";
    } else {
      sections.style.boxShadow = "none";
    }
  });


  /* ──────────────────────────────────────────────
     7. SMOOTH SCROLL — for any internal anchor links
  ────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });


  /* ──────────────────────────────────────────────
     8. "BOOK NOW" & "LEARN MORE" BUTTONS
  ────────────────────────────────────────────── */
  const bookNowBtn  = document.querySelector(".p__2 button");
  const learnMore   = document.querySelector(".p__02 button");

  if (bookNowBtn) {
    bookNowBtn.addEventListener("click", () => {
      showToast("🎉 Redirecting to booking page…");
    });
  }

  if (learnMore) {
    learnMore.addEventListener("click", () => {
      showToast("📺 Opening The Wanderer on Amazon Prime Video…");
    });
  }


  /* ──────────────────────────────────────────────
     9. CITY TOUR CARDS — click to expand info
  ────────────────────────────────────────────── */
  const tourCards = document.querySelectorAll(".calaction__1 > div");
  tourCards.forEach(card => {
    card.style.cursor     = "pointer";
    card.style.transition = "transform 0.25s, box-shadow 0.25s";
    card.style.borderRadius = "12px";
    card.style.overflow   = "hidden";

    card.addEventListener("mouseenter", () => {
      card.style.transform  = "translateY(-4px)";
      card.style.boxShadow  = "0 8px 24px rgba(0,0,0,0.15)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform  = "none";
      card.style.boxShadow  = "none";
    });
    card.addEventListener("click", e => {
      // Don't trigger if clicking the heart
      if (e.target.closest("h1")) return;
      const title = card.querySelector("h3")?.textContent || "this experience";
      showToast(`🗺️ Viewing details for: ${title.slice(0, 50)}…`);
    });
  });


  /* ──────────────────────────────────────────────
     10. DESTINATION CARDS (calaction) hover zoom
  ────────────────────────────────────────────── */
  document.querySelectorAll(".calaction > div").forEach(card => {
    card.style.overflow   = "hidden";
    card.style.borderRadius = "12px";
    card.style.cursor     = "pointer";

    const img = card.querySelector("img");
    if (img) {
      img.style.transition = "transform 0.4s ease";
      card.addEventListener("mouseenter", () => img.style.transform = "scale(1.07)");
      card.addEventListener("mouseleave", () => img.style.transform = "scale(1)");
    }

    card.addEventListener("click", () => {
      const dest = card.querySelector("h1")?.textContent?.trim() || "this destination";
      showToast(`✈️ Exploring ${dest}…`);
    });
  });


  /* ──────────────────────────────────────────────
     11. "SEE THE WINNERS" BUTTON
  ────────────────────────────────────────────── */
  const winnersBtn = document.querySelector(".b__1 button");
  if (winnersBtn) {
    winnersBtn.addEventListener("click", () => {
      showToast("🏆 Loading Travellers' Choice Award Winners…");
    });
  }


  /* ──────────────────────────────────────────────
     12. FOOTER LINKS — prevent full-page reload
  ────────────────────────────────────────────── */
  document.querySelectorAll(".lost a").forEach(link => {
    link.addEventListener("click", e => {
      if (link.getAttribute("href") === "" || link.getAttribute("href") === "#") {
        e.preventDefault();
        showToast("🔗 This link is coming soon!");
      }
    });
  });


  /* ──────────────────────────────────────────────
     13. BACK-TO-TOP BUTTON — appears after scroll
  ────────────────────────────────────────────── */
  const topBtn = document.createElement("button");
  topBtn.id = "back-to-top";
  topBtn.innerHTML = "↑";
  topBtn.title = "Back to top";
  Object.assign(topBtn.style, {
    position:     "fixed",
    bottom:       "30px",
    right:        "30px",
    width:        "48px",
    height:       "48px",
    borderRadius: "50%",
    background:   "#00eb5b",
    border:       "2px solid #000",
    fontSize:     "22px",
    fontWeight:   "bold",
    cursor:       "pointer",
    display:      "none",
    zIndex:       "9000",
    boxShadow:    "0 4px 12px rgba(0,0,0,0.2)",
    transition:   "opacity 0.3s",
  });
  document.body.appendChild(topBtn);

  window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 400 ? "block" : "none";
  });
  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  /* ──────────────────────────────────────────────
     UTILITY: Toast notification
  ────────────────────────────────────────────── */
  function showToast(message) {
    let toast = document.getElementById("ta-toast");
    if (toast) toast.remove();

    toast = document.createElement("div");
    toast.id = "ta-toast";
    toast.textContent = message;

    Object.assign(toast.style, {
      position:     "fixed",
      bottom:       "90px",
      left:         "50%",
      transform:    "translateX(-50%)",
      background:   "#222",
      color:        "#fff",
      padding:      "12px 24px",
      borderRadius: "30px",
      fontSize:     "15px",
      fontWeight:   "500",
      zIndex:       "99999",
      boxShadow:    "0 4px 16px rgba(0,0,0,0.25)",
      opacity:      "0",
      transition:   "opacity 0.3s",
      whiteSpace:   "nowrap",
      maxWidth:     "90vw",
      textAlign:    "center",
    });

    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.style.opacity = "1");

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 350);
    }, 2800);
  }

}); // end DOMContentLoaded