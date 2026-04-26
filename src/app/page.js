"use client";
import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import Link from "next/link";

const testimonials = [
  { initials: "SW", name: "Sanath Waraikar", role: "Small Business Owner", quote: "Capitize has transformed how I manage my business finances. The AI insights have helped me identify cost-saving opportunities I never knew existed.", rating: 5 },
  { initials: "HK", name: "Harshit Kudhial", role: "Freelancer", quote: "The receipt scanning feature saves me hours each month. Now I can focus on my work instead of manual data entry and expense tracking.", rating: 5 },
  { initials: "PT", name: "Prajjwal Tripathi", role: "Freelancer", quote: "I recommend Capitize to all my clients. The multi-currency support and detailed analytics make it perfect for international clients.", rating: 5 },
];

export default function LandingPage() {
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(0);
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const sceneRef = useRef({});

  // Auto-rotate testimonials
  useEffect(() => {
    const iv = setInterval(() => setTestimonialIdx(i => (i + 1) % 3), 5000);
    return () => clearInterval(iv);
  }, []);

  // Fallback loader timeout
  useEffect(() => {
    const t = setTimeout(() => setLoaderHidden(true), 2500);
    return () => clearTimeout(t);
  }, []);

  // Load scripts sequentially
  const onScriptLoad = () => setLoaded(p => p + 1);

  useEffect(() => {
    if (loaded < 3) return; // wait for Three.js + GSAP + ScrollTrigger
    const THREE = window.THREE;
    const gsap = window.gsap;
    if (!THREE || !gsap) return;

    gsap.registerPlugin(window.ScrollTrigger);

    // === THREE.JS HERO ===
    const canvas = canvasRef.current;
    if (!canvas) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    sceneRef.current = { scene, camera, renderer };

    // Particle geometry - torus knot positions
    const count = 4000;
    const torusPos = new Float32Array(count * 3);
    const spherePos = new Float32Array(count * 3);
    const gridPos = new Float32Array(count * 3);

    // Generate torus knot points
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 4;
      const r = 15, p2 = 2, q = 3;
      const x = (r + 5 * Math.cos(q * t)) * Math.cos(p2 * t) + (Math.random() - 0.5) * 2;
      const y = (r + 5 * Math.cos(q * t)) * Math.sin(p2 * t) + (Math.random() - 0.5) * 2;
      const z = 5 * Math.sin(q * t) + (Math.random() - 0.5) * 2;
      torusPos[i * 3] = x; torusPos[i * 3 + 1] = y; torusPos[i * 3 + 2] = z;
    }
    // Sphere positions
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 20;
      spherePos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      spherePos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      spherePos[i * 3 + 2] = r * Math.cos(phi);
    }
    // Grid positions
    const side = Math.ceil(Math.sqrt(count));
    for (let i = 0; i < count; i++) {
      gridPos[i * 3] = ((i % side) - side / 2) * 1.2;
      gridPos[i * 3 + 1] = (Math.floor(i / side) - side / 2) * 1.2;
      gridPos[i * 3 + 2] = 0;
    }

    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(torusPos);
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({ color: 0x00f5c4, size: 0.3, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Floating orbs
    for (let i = 0; i < 6; i++) {
      const orbGeo = new THREE.SphereGeometry(3 + Math.random() * 3, 16, 16);
      const orbMat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x7c3aed : 0x00f5c4, transparent: true, opacity: 0.07 });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      orb.position.set((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 30);
      orb.userData = { ix: i, ox: orb.position.x, oy: orb.position.y };
      scene.add(orb);
    }

    // Morph on scroll
    let ctx = gsap.context(() => {
      const morphData = { progress: 0 };
      gsap.to(morphData, {
        progress: 1,
        scrollTrigger: { trigger: ".cap-hero", start: "top top", end: "bottom top", scrub: 1 },
        onUpdate() {
          const pos = geo.attributes.position.array;
          const p = morphData.progress;
          for (let i = 0; i < count * 3; i++) {
            if (p <= 0.5) {
              const t = p * 2;
              pos[i] = torusPos[i] * (1 - t) + spherePos[i] * t;
            } else {
              const t = (p - 0.5) * 2;
              pos[i] = spherePos[i] * (1 - t) + gridPos[i] * t;
            }
          }
          geo.attributes.position.needsUpdate = true;
        }
      });

      // Nav compress
      gsap.to(".cap-nav", { scrollTrigger: { trigger: "body", start: "80px top", toggleActions: "play none none reverse" }, onStart: () => document.querySelector(".cap-nav")?.classList.add("compact"), onReverseComplete: () => document.querySelector(".cap-nav")?.classList.remove("compact") });

      // Hero text animation (manual word split)
      const headlineWords = document.querySelectorAll(".cap-headline .word");
      if (headlineWords.length) {
        gsap.from(headlineWords, { y: 60, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.08, delay: 1.5 });
      }
      gsap.from(".cap-subheadline", { opacity: 0, y: 20, duration: 0.6, delay: 2.3 });
      gsap.from(".cap-hero-ctas", { opacity: 0, y: 20, duration: 0.6, delay: 2.5 });
      gsap.from(".cap-float-card", { opacity: 0, scale: 0.8, rotateY: -40, duration: 1, delay: 2.7, ease: "power3.out" });

      // Section titles reveal
      document.querySelectorAll(".cap-section-title").forEach(el => {
        gsap.from(el, { y: 40, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 80%" } });
      });

      // Bento cards stagger
      gsap.utils.toArray(".cap-bento-card").forEach((card, i) => {
        gsap.from(card, { y: 50, opacity: 0, duration: 0.6, delay: i * 0.1, scrollTrigger: { trigger: card, start: "top 85%" } });
      });

      // Horizontal scroll
      const howSection = document.querySelector(".cap-how");
      const howTrack = document.querySelector(".cap-how-track");
      if (howSection && howTrack) {
        gsap.to(howTrack, { x: () => -(howTrack.scrollWidth - window.innerWidth), ease: "none", scrollTrigger: { trigger: howSection, pin: true, scrub: 1, end: () => "+=" + howTrack.scrollWidth } });
      }

      // Modern finance bars
      gsap.utils.toArray(".cap-mock-bar-fill").forEach(bar => {
        gsap.from(bar, { width: 0, duration: 1.5, ease: "power2.out", scrollTrigger: { trigger: bar, start: "top 85%" } });
      });
    });

    // Mouse parallax
    const mouse = { x: 0, y: 0 };
    const onMouse = (e) => { mouse.x = (e.clientX / window.innerWidth - 0.5) * 10; mouse.y = -(e.clientY / window.innerHeight - 0.5) * 10; };
    window.addEventListener("mousemove", onMouse);

    // Custom cursor
    const cursor = document.getElementById("cap-cursor");
    const onCursorMove = (e) => { if (cursor) gsap.to(cursor, { x: e.clientX - 6, y: e.clientY - 6, duration: 0.1 }); };
    window.addEventListener("mousemove", onCursorMove);
    document.querySelectorAll("a,button,.cap-btn").forEach(el => {
      el.addEventListener("mouseenter", () => cursor?.classList.add("hovering"));
      el.addEventListener("mouseleave", () => cursor?.classList.remove("hovering"));
    });

    // Animate loop
    let raf;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.05;
      points.rotation.x = t * 0.02;
      scene.children.forEach(c => {
        if (c.userData && c.userData.ix !== undefined) {
          c.position.x = c.userData.ox + Math.sin(t * 0.3 + c.userData.ix) * 3;
          c.position.y = c.userData.oy + Math.cos(t * 0.2 + c.userData.ix) * 2;
        }
      });
      gsap.to(camera.position, { x: mouse.x, y: mouse.y, duration: 1.5, overwrite: true });
      renderer.render(scene, camera);
    };
    animate();



    // Page loader
    setLoaderHidden(true);

    // Resize handler
    const onResize = () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mousemove", onCursorMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      
      if (ctx) ctx.revert();
    };
  }, [loaded]);

  const t = testimonials[testimonialIdx];

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="afterInteractive" onLoad={onScriptLoad} />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="afterInteractive" onLoad={onScriptLoad} />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="afterInteractive" onLoad={onScriptLoad} />

      {/* Loader */}
      <div className={`cap-loader ${loaderHidden ? "hidden" : ""}`}><span className="cap-loader-text">Capitize<span className="dot">.</span></span></div>

      {/* Custom Cursor */}
      <div id="cap-cursor" className="cap-cursor" />

      {/* Vignette */}
      <div className="cap-vignette" />

      {/* Nav */}
      <nav className="cap-nav" id="cap-nav">
        <div className="cap-nav-inner">
          <Link href="/" className="cap-logo">Capitize<span className="dot">.</span></Link>
          <ul className="cap-nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
          </ul>
          <Link href="/dashboard" className="cap-btn cap-btn-cta" style={{ color: "#f0f0f5" }}>Get Started →</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="cap-hero" id="hero">
        <canvas ref={canvasRef} className="cap-hero-canvas" />
        <div className="cap-hero-content">
          <div>
            <div className="cap-eyebrow"><span className="blink" /> AI-Powered Financial Intelligence</div>
            <h1 className="cap-headline">
              <span className="word block">Take Control of</span>
              <span className="word block mt-2">Your Finances</span>
              <span className="word block mt-2">with AI</span>
            </h1>
            <p className="cap-subheadline">Transform your financial future with intelligent insights, automated tracking, and smart budgeting powered by cutting-edge AI technology.</p>
            <div className="cap-hero-ctas">
              <Link href="/dashboard" className="cap-btn cap-btn-primary">Get Started →</Link>
        
            </div>
          </div>
          <div className="cap-float-card">
            <div style={{ marginBottom: "1rem" }}><span className="label">Income</span><div className="value green">+₹52,000</div></div>
            <div style={{ marginBottom: "1rem" }}><span className="label">Expenses</span><div className="value red">-₹24,500</div></div>
            <div><span className="label">Balance</span><div className="value">₹2,45,800</div></div>
          </div>
        </div>
        <div className="cap-scroll-indicator"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b6b80" strokeWidth="2"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg></div>
      </section>

      {/* Marquee */}
      <div className="cap-marquee">
        <div className="cap-marquee-track">
          {[...Array(2)].map((_, k) => (
            <React.Fragment key={k}>
              {["4.9★ Rating", "50K+ Users", "₹10Cr+ Tracked", "Bank-Grade Security", "AI Insights", "Zero Data Sold"].map((s, i) => (
                <React.Fragment key={i}><span className="cap-marquee-item">{s}</span><span className="cap-marquee-sep">◆</span></React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Features Bento */}
      <section className="cap-features" id="features">
        <div className="cap-features-inner">
          <h2 className="cap-section-title">Everything You Need to Master Your Finances</h2>
          <div className="cap-bento">
            <div className="cap-bento-card card-1">
              <div className="cap-bento-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></div>
              <h3>Advanced Analytics</h3>
              <p>Get detailed insights into your spending patterns with AI-powered analytics and predictive modeling.</p>
              <div style={{ display: "flex", gap: "8px", alignItems: "flex-end", marginTop: "1.5rem", height: "60px" }}>
                {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (<div key={i} style={{ flex: 1, height: h + "%", background: `linear-gradient(to top, #00f5c4, #7c3aed)`, borderRadius: "4px", opacity: 0.7 }} />))}
              </div>
            </div>
            <div className="cap-bento-card card-2" style={{ position: "relative" }}>
              <div className="cap-bento-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M12 9v4m-2-2h4"/></svg></div>
              <h3>Smart Receipt Scanner</h3>
              <p>Extract data automatically from receipts using advanced AI technology.</p>
              <div className="scan-line" />
            </div>
            <div className="cap-bento-card">
              <div className="cap-bento-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20"/></svg></div>
              <h3>Intelligent Budgeting</h3>
              <p>Create and manage budgets with AI recommendations.</p>
              <div className="cap-donut" style={{ marginTop: "1rem" }}><div className="cap-donut-inner" /></div>
            </div>
            <div className="cap-bento-card">
              <div className="cap-bento-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg></div>
              <h3>Multi-Account Support</h3>
              <p>Manage multiple accounts in one unified dashboard.</p>
            </div>
            <div className="cap-bento-card">
              <div className="cap-bento-icon"><svg className="spin-slow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg></div>
              <h3>Multi-Currency</h3>
              <p>Support for multiple currencies with real-time conversion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Horizontal Scroll */}
      <section className="cap-how" id="how">
        <div className="cap-how-track">
          {[
            { step: "01", title: "Connect Your Accounts", desc: "Link your bank accounts securely in minutes with our bank-grade encryption.", icon: <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#00f5c4" strokeWidth="1.5"><rect x="10" y="20" width="25" height="40" rx="4"/><rect x="45" y="20" width="25" height="40" rx="4"/><path d="M35 40h10" strokeDasharray="4 4"/></svg> },
            { step: "02", title: "AI Analyzes Everything", desc: "Our neural networks categorize and analyze every transaction in real-time.", icon: <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#7c3aed" strokeWidth="1.5"><circle cx="40" cy="25" r="6"/><circle cx="25" cy="45" r="6"/><circle cx="55" cy="45" r="6"/><circle cx="40" cy="60" r="6"/><path d="M40 31v23M31 45h18M34 39l-6 3M46 39l6 3"/></svg> },
            { step: "03", title: "Get Smart Insights", desc: "Receive actionable AI-powered insights and recommendations to optimize your finances.", icon: <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#00f5c4" strokeWidth="1.5"><polyline points="10,60 25,45 35,50 50,30 65,35 75,20" strokeLinejoin="round"/></svg> }
          ].map((panel, i) => (
            <div className="cap-how-panel" key={i}>
              <div className="cap-step-counter"><span>{panel.step}</span> / 03</div>
              <div className="cap-how-panel-content">
                {panel.icon}
                <h3>{panel.title}</h3>
                <p>{panel.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Built for Modern Finance */}
      <section className="cap-modern" id="modern">
        <div className="cap-modern-inner">
          <div>
            <h2 className="cap-section-title" style={{ textAlign: "left" }}>Built for Modern Finance</h2>
            <p>Experience the future of financial management with AI-powered insights, automated tracking, and intelligent recommendations.</p>
            <ul className="cap-modern-list">
              {["Real-time transaction tracking", "AI-powered expense categorization", "Automated budget recommendations", "Smart savings goals", "Multi-currency support", "Bank-level security"].map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
          <div className="cap-mock-dashboard">
            <div style={{ marginBottom: "1.5rem" }}>
              <span style={{ fontSize: ".75rem", color: "#6b6b80" }}>Total Balance</span>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#f0f0f5" }}>₹2,45,800</div>
            </div>
            <div style={{ marginBottom: ".5rem", fontSize: ".75rem", color: "#6b6b80" }}>Income</div>
            <div className="cap-mock-bar"><div className="cap-mock-bar-fill income" style={{ width: "75%" }} /></div>
            <div style={{ marginBottom: ".5rem", fontSize: ".75rem", color: "#6b6b80", marginTop: "1rem" }}>Expenses</div>
            <div className="cap-mock-bar"><div className="cap-mock-bar-fill expense" style={{ width: "45%" }} /></div>
            <svg className="cap-sparkline" viewBox="0 0 200 60" style={{ width: "100%", height: "60px", marginTop: "1.5rem" }}>
              <path d="M0,50 Q30,45 50,30 T100,25 T150,35 T200,10" fill="none" stroke="#00f5c4" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="cap-testimonials" id="testimonials">
        <div className="cap-testimonials-inner">
          <h2 className="cap-section-title">Loved by Our Users</h2>
          <div className="cap-testimonial-card" key={testimonialIdx}>
            <div className="stars">{"★★★★★"}</div>
            <p className="quote">&ldquo;{t.quote}&rdquo;</p>
            <div className="author">
              <div className="cap-avatar">{t.initials}</div>
              <div><div className="cap-author-name">{t.name}</div><div className="cap-author-role">{t.role}</div></div>
            </div>
          </div>
          <div className="cap-dots">{[0, 1, 2].map(i => <span key={i} className={`cap-dot ${i === testimonialIdx ? "active" : ""}`} onClick={() => setTestimonialIdx(i)} />)}</div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cap-cta">
        <div className="cap-cta-bg" />
        <div className="cap-coins"><div className="cap-coin" /><div className="cap-coin" /><div className="cap-coin" /><div className="cap-coin" /></div>
        <div className="cap-cta-inner">
          <h2>Ready to Transform Your Finances?</h2>
          <Link href="/dashboard" className="cap-btn cap-btn-primary cap-magnetic-btn" style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}>Start Now →</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="cap-footer">
        <div className="cap-footer-inner">
          <div>
            <div className="cap-logo" style={{ marginBottom: ".75rem" }}>Capitize<span className="dot">.</span></div>
            <p>AI-powered financial management platform for modern businesses and individuals.</p>
          </div>
          <div>
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#testimonials">Testimonials</a>
            <a href="/dashboard">Dashboard</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="https://www.linkedin.com/in/aryan-bhargava-0927b8316/">About Us</a>
          </div>
        </div>
        <div className="cap-footer-bottom">© 2025 Capitize. All rights reserved.</div>
      </footer>
    </>
  );
}
