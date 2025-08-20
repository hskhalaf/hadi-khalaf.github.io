/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { Navigation } from "@/components/navigation";

// Add this before the component to extend the Window type
declare global {
  interface Window {
    renderMathInElement?: (el: HTMLElement, opts: unknown) => void;
  }
}

// Add this component before the main export
function DemoChart() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentPoint, setCurrentPoint] = useState(0);
  const [animationId, setAnimationId] = useState<number | null>(null);
  const [showPeak, setShowPeak] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const curvePointsRef = useRef<SVGSVGElement>(null);
  const totalPoints = 18;

  // Generate curve points
  function generateCurvePoints() {
    const points = [];
    let peakPoint = null;
    let maxY = -Infinity;
    for (let i = 0; i <= totalPoints; i++) {
      const t = i / totalPoints;
      const x = 80 + (t * 1.75) * (750 / 1.75);
      const scaledT = t * 1.75;
      const funcT = scaledT / 1.75;
      let y = -1.5 * Math.pow(funcT - 0.6, 2) + 0.9;
      y = Math.max(0, Math.min(1, y));
      const svgY = 420 - y * 370;
      if (y > maxY) {
        maxY = y;
        peakPoint = { x, y: svgY, t: scaledT, index: i };
      }
      points.push({ x, y: svgY, t: scaledT });
    }
    return { points, peakPoint };
  }

  const { points, peakPoint } = generateCurvePoints();

  // Animation logic
  useEffect(() => {
    if (!isAnimating) return;
    let frame = currentPoint;
    function animate() {
      if (frame > totalPoints) {
        setShowPeak(true);
        setTimeout(() => setShowText(true), 400);
        setTimeout(() => setShowArrow(true), 600);
        setIsAnimating(false);
        setAnimationId(null);
        return;
      }
      setCurrentPoint(frame);
      frame++;
      const id = window.setTimeout(animate, 80); // 80ms per frame ~1.5s total
      setAnimationId(id);
    }
    animate();
    return () => {
      if (animationId) window.clearTimeout(animationId);
    };
    // eslint-disable-next-line
  }, [isAnimating]);

  function startAnimation() {
    if (isAnimating) return;
    setCurrentPoint(0);
    setShowPeak(false);
    setShowText(false);
    setShowArrow(false);
    setIsAnimating(true);
  }

  function resetAnimation() {
    setIsAnimating(false);
    setCurrentPoint(0);
    setShowPeak(false);
    setShowText(false);
    setShowArrow(false);
    if (animationId) window.clearTimeout(animationId);
  }

  // Calculate safe/danger zone widths
  const safeWidth = peakPoint ? peakPoint.x - 80 : 0;
  const dangerX = peakPoint ? peakPoint.x : 0;
  const dangerWidth = peakPoint ? 830 - peakPoint.x : 0;
  // Calculate safe/danger label positions
  const safeLabelX = peakPoint ? 80 + (peakPoint.x - 80) / 2 : 0;
  const dangerLabelX = peakPoint ? peakPoint.x + (830 - peakPoint.x) / 2 : 0;

  // Arrow path for the peak
  const arrowPath = peakPoint ? `M 340 40 Q ${(340 + (peakPoint.x - 40)) / 2 - 60} ${(40 + (peakPoint.y - 15)) / 2 + 20} ${peakPoint.x - 40} ${peakPoint.y - 15}` : "";

  return (
    <div>
      <div className="chart-container" style={{ background: '#fff', borderRadius: 0, padding: 24, border: '2px solid #000', marginTop: 20, width: '100%', maxWidth: 850, boxSizing: 'border-box' }}>
        <svg width="850" height="500" viewBox="0 0 850 500" ref={curvePointsRef}>
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#000000" />
            </marker>
          </defs>
          <text x="425" y="28" fontFamily="JetBrains Mono, monospace" fontSize="24" fontWeight="700" fill="#000000" textAnchor="middle" opacity={showText ? 1 : 0} style={{ transition: 'opacity 0.8s ease' }}><tspan fontStyle="italic">YOU CAN </tspan><tspan fill="#e67c30" fontStyle="normal">HEDGE</tspan><tspan fontStyle="italic"> TO FIND IT!</tspan></text>
          {peakPoint && (
            <g style={{ opacity: showArrow ? 1 : 0, transition: 'opacity 0.8s ease' }}>
              <path d={arrowPath} stroke="#000000" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
            </g>
          )}
          <rect x="80" y="50" width={safeWidth} height="370" className="background-safe" opacity={currentPoint > 5 ? 0.08 : 0} style={{ fill: '#00ff00' }} />
          <rect x={dangerX} y="50" width={dangerWidth} height="370" className="background-danger" opacity={peakPoint && currentPoint > peakPoint.index ? 0.08 : 0} style={{ fill: '#ff0000' }} />
          <line x1="80" y1="50" x2="80" y2="420" className="axes" style={{ stroke: '#000', strokeWidth: 2 }} />
          <line x1="80" y1="420" x2="830" y2="420" className="axes" style={{ stroke: '#000', strokeWidth: 2 }} />
          <text x={safeLabelX} y={275} className="zone-label safe-label" textAnchor="middle" style={{ fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', opacity: currentPoint > 5 ? 1 : 0, fontSize: 20, fill: '#00aa00' }}>safe</text>
          <text x={dangerLabelX} y={275} className="zone-label danger-label" textAnchor="middle" style={{ fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', opacity: peakPoint && currentPoint > peakPoint.index ? 1 : 0, fontSize: 20, fill: '#cc0000' }}>danger!</text>
          <text x="25" y="240" className="axis-label" textAnchor="middle" transform="rotate(-90, 25, 240)" style={{ fontSize: 16, fontWeight: 500, fill: '#000', fontFamily: 'JetBrains Mono, monospace' }}>true reward</text>
          <text x="465" y="480" className="axis-label" textAnchor="middle" style={{ fontSize: 16, fontWeight: 500, fill: '#000', fontFamily: 'JetBrains Mono, monospace' }}>number of samples n</text>
          {/* Y-axis ticks */}
          <line x1="75" y1="420" x2="85" y2="420" className="tick" style={{ stroke: '#666', strokeWidth: 1 }} />
          <text x="70" y="424" className="tick-label" textAnchor="end" style={{ fontSize: 11, fill: '#666', fontFamily: 'JetBrains Mono, monospace', fontWeight: 400 }}>0</text>
          <line x1="75" y1="320" x2="85" y2="320" className="tick" style={{ stroke: '#666', strokeWidth: 1 }} />
          <text x="70" y="324" className="tick-label" textAnchor="end" style={{ fontSize: 11, fill: '#666', fontFamily: 'JetBrains Mono, monospace', fontWeight: 400 }}>0.25</text>
          <line x1="75" y1="220" x2="85" y2="220" className="tick" style={{ stroke: '#666', strokeWidth: 1 }} />
          <text x="70" y="224" className="tick-label" textAnchor="end" style={{ fontSize: 11, fill: '#666', fontFamily: 'JetBrains Mono, monospace', fontWeight: 400 }}>0.5</text>
          <line x1="75" y1="120" x2="85" y2="120" className="tick" style={{ stroke: '#666', strokeWidth: 1 }} />
          <text x="70" y="124" className="tick-label" textAnchor="end" style={{ fontSize: 11, fill: '#666', fontFamily: 'JetBrains Mono, monospace', fontWeight: 400 }}>0.75</text>
          <line x1="75" y1="50" x2="85" y2="50" className="tick" style={{ stroke: '#666', strokeWidth: 1 }} />
          <text x="70" y="54" className="tick-label" textAnchor="end" style={{ fontSize: 11, fill: '#666', fontFamily: 'JetBrains Mono, monospace', fontWeight: 400 }}>1.0</text>
          {/* X-axis ticks */}
          <line x1="80" y1="420" x2="80" y2="435" className="tick" style={{ stroke: '#666', strokeWidth: 1 }} />
          <text x="80" y="450" className="tick-label" textAnchor="middle" style={{ fontSize: 11, fill: '#666', fontFamily: 'JetBrains Mono, monospace', fontWeight: 400 }}>1</text>
          <line x1="187" y1="420" x2="187" y2="435" className="tick" style={{ stroke: '#666', strokeWidth: 1 }} />
          <text x="187" y="450" className="tick-label" textAnchor="middle" style={{ fontSize: 11, fill: '#666', fontFamily: 'JetBrains Mono, monospace', fontWeight: 400 }}>4</text>
          <line x1="294" y1="420" x2="294" y2="435" className="tick" style={{ stroke: '#666', strokeWidth: 1 }} />
          <text x="294" y="450" className="tick-label" textAnchor="middle" style={{ fontSize: 11, fill: '#666', fontFamily: 'JetBrains Mono, monospace', fontWeight: 400 }}>8</text>
          <line x1="401" y1="420" x2="401" y2="435" className="tick" style={{ stroke: '#666', strokeWidth: 1 }} />
          <text x="401" y="450" className="tick-label" textAnchor="middle" style={{ fontSize: 11, fill: '#666', fontFamily: 'JetBrains Mono, monospace', fontWeight: 400 }}>12</text>
          <line x1="509" y1="420" x2="509" y2="435" className="tick" style={{ stroke: '#666', strokeWidth: 1 }} />
          <text x="509" y="450" className="tick-label" textAnchor="middle" style={{ fontSize: 11, fill: '#666', fontFamily: 'JetBrains Mono, monospace', fontWeight: 400 }}>16</text>
          <line x1="616" y1="420" x2="616" y2="435" className="tick" style={{ stroke: '#666', strokeWidth: 1 }} />
          <text x="616" y="450" className="tick-label" textAnchor="middle" style={{ fontSize: 11, fill: '#666', fontFamily: 'JetBrains Mono, monospace', fontWeight: 400 }}>20</text>
          <line x1="723" y1="420" x2="723" y2="435" className="tick" style={{ stroke: '#666', strokeWidth: 1 }} />
          <text x="723" y="450" className="tick-label" textAnchor="middle" style={{ fontSize: 11, fill: '#666', fontFamily: 'JetBrains Mono, monospace', fontWeight: 400 }}>24</text>
          <line x1="830" y1="420" x2="830" y2="435" className="tick" style={{ stroke: '#666', strokeWidth: 1 }} />
          <text x="830" y="450" className="tick-label" textAnchor="middle" style={{ fontSize: 11, fill: '#666', fontFamily: 'JetBrains Mono, monospace', fontWeight: 400 }}>28</text>
          {/* Curve dots */}
          {points.slice(0, currentPoint + 1).map((pt, i) => (
            <circle key={i} cx={pt.x} cy={pt.y} r="6" fill="#000000" opacity="0.7" />
          ))}
          {/* Peak star */}
          {peakPoint && showPeak && (
            <g className="peak-star" style={{ opacity: 1 }}>
              <polygon points="0,-15 4.5,-4.5 15,-4.5 6,3 10.5,13.5 0,7.5 -10.5,13.5 -6,3 -15,-4.5 -4.5,-4.5" fill="#ffcc00" stroke="#ff9900" strokeWidth="2" transform={`translate(${peakPoint.x},${peakPoint.y})`} />
            </g>
          )}
        </svg>
      </div>
      <div className="controls" style={{ textAlign: 'center', marginTop: 20, display: 'flex', gap: 10, justifyContent: 'center', position: 'static', bottom: 'auto', left: 'auto', transform: 'none', marginBottom: 40 }}>
        <button onClick={startAnimation} disabled={isAnimating}>start</button>
        <button onClick={resetAnimation} disabled={isAnimating && animationId !== null}>reset</button>
      </div>
    </div>
  );
}

export default function HackingBlogPage() {
  // For KaTeX math rendering
  useEffect(() => {
    if (typeof window !== "undefined" && window.renderMathInElement) {
      window.renderMathInElement(document.body, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
        ],
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>REWARD HACKING IN LLMS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" />
        <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
        <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"></script>
      </Head>
      <Navigation />
      <div className="hacking-blog">
        {/* HEADER */}
        <header className="header">
          <h1 className="title">INFERENCE-TIME REWARD HACKING <br /> IN LARGE LANGUAGE MODELS</h1>
          <div className="subtitle">when optimization goes wrong...</div>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <div className="authors">
            HADI KHALAF¹ • CLAUDIO MAYRINK VERDUN¹ • ALEX OESTERLING¹ • HIMABINDU LAKKARAJU¹&apos;² • FLAVIO DU PIN CALMON¹
            <br />¹HARVARD SEAS • ²HARVARD BUSINESS SCHOOL
          </div>
          <div className="buttons">
            <a href="https://arxiv.org/abs/2506.19248" target="_blank" rel="noopener noreferrer" className="btn">📄 ARXIV</a>
            <a href="https://github.com/hskhalaf/hedging" target="_blank" rel="noopener noreferrer" className="btn">💻 CODE</a>
            <a href="mailto:hadikhalaf@g.harvard.edu" className="btn">✉️ CONTACT</a>
          </div>
        </header>
        <nav className="nav">
          <div className="nav-content">
            <a href="#problem" className="nav-item">INTRO</a>
            <a href="#demo" className="nav-item">EXAMPLE</a>
            <a href="#theory" className="nav-item">THEORY</a>
            <a href="#methods" className="nav-item">METHODS</a>
          </div>
        </nav>
        {/* MAIN CONTENT */}
        <div className="container main-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* --- Begin main.html content --- */}
          <section id="problem">
            <div className="block danger">
              <div className="block-header big-text" style={{ textAlign: 'center', fontSize: '2.8rem' }}>
                ALL PROXY REWARDS ARE BAD… <br /> BUT SOME CAN BE MADE USEFUL!
              </div>
              <div className="block-content">
                <p>Inference-time alignment is simple and effective: generate candidate responses from your model, score them using a reward model, and pick a response—no retraining needed! One successful approach is Best-of-n where you select the highest scoring response.</p>
                <br />
                <p> However, these reward models function as proxies for our desired objectives such as helpfulness and safety. By overoptimizing for a misspecified reward, we can fall victim to <span className="highlight-text">REWARD HACKING</span>!</p>
                <div className="alert danger" style={{ textAlign: 'center', fontSize: '1.1rem' }}>
                  <strong>REWARD HACKING:</strong>  The desired performance first improves, then collapses as we optimize harder.
                </div>
                <p><strong>Our contributions:</strong></p>
                <p><strong>1.</strong> We mathematically formalise inference-time reward hacking and prove its inevitability.</p>
                <p><strong>2.</strong> We introduce <em>Best-of-Poisson</em>, which approximates the optimal tilted distribution with negligible KL gap.</p>
                <p><strong>3.</strong> We develop <em>HedgeTune</em>, a lightweight framework that finds optimal inference-time parameters.</p>
              </div>
            </div>
          </section>
          {/* INTERACTIVE DEMO */}
          <section id="demo" style={{ display: 'flex', justifyContent: 'center', marginTop: '-40px' }}>
            <div className="container" style={{ background: '#fff', padding: '32px 32px 20px 32px', borderRadius: 3, border: '2px solid #000', maxWidth: 900, boxShadow: '8px 8px 0px #000' }}>
              <div className="header">
                <h1 className="main-title demo-title">Inference-time Reward Hacking</h1>
              </div>
              <DemoChart />
            </div>
          </section>
          {/* THEORY */}
          <section id="theory">
            <div className="block" style={{ margin: '20px 20px -20px 20px', border: '4px solid #000', background: '#fff', boxShadow: '12px 12px 0px #000', padding: 0 }}>
              <div className="block-header big-text" style={{ textAlign: 'center', fontSize: '2.3rem' }}>REWARD HACKING IS INEVITABLE</div>
              <div className="block-content" style={{ display: 'flex', alignItems: 'stretch', gap: 0, padding: '40px 40px 20px 40px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: 30 }}>
                  <p>We derive exact conditions under which one of the four possible regimes (shown on the right) is envitable for common inference-time schemes such as Best-of-n.</p>
                  <p><strong>Consequence:</strong> A unique hacking threshold θ<sup>†</sup> exists, and we have a principled way to find it!</p>
                </div>
                <div style={{ flex: '0 0 320px', height: 320, width: 320, margin: '-40px -40px -40px 0' }}>
                  <svg viewBox="0 0 320 320" style={{ width: '100%', height: '100%', background: '#fff', display: 'block' }}>
                    {/* Dividers */}
                    <line x1="0" y1="0" x2="0" y2="320" stroke="#000000" strokeWidth="2" />
                    <line x1="160" y1="0" x2="160" y2="320" stroke="#000000" strokeWidth="2" />
                    <line x1="0" y1="160" x2="320" y2="160" stroke="#000000" strokeWidth="2" />
                    {/* Top Left Quadrant - Monotonically Increasing */}
                    <g>
                      <line x1="40" y1="40" x2="40" y2="120" stroke="#666666" strokeWidth="1" />
                      <line x1="40" y1="120" x2="120" y2="120" stroke="#666666" strokeWidth="1" />
                      <path d="M 52 112 Q 76 84 100 64 Q 112 52 120 40" fill="none" stroke="#000000" strokeWidth="4" strokeDasharray="160" strokeDashoffset="160" strokeLinecap="round" className="draw-curve-anim" />
                    </g>
                    {/* Top Right Quadrant - Concave (up then down) - HACKING */}
                    <g>
                      <line x1="200" y1="40" x2="200" y2="120" stroke="#666666" strokeWidth="1" />
                      <line x1="200" y1="120" x2="280" y2="120" stroke="#666666" strokeWidth="1" />
                      <path d="M 208 112 Q 248 32 272 112" fill="none" stroke="#cc4444" strokeWidth="4" strokeDasharray="160" strokeDashoffset="160" strokeLinecap="round" className="draw-curve-anim" />
                    </g>
                    {/* Bottom Left Quadrant - Convex (down then up) */}
                    <g>
                      <line x1="40" y1="200" x2="40" y2="280" stroke="#666666" strokeWidth="1" />
                      <line x1="40" y1="280" x2="120" y2="280" stroke="#666666" strokeWidth="1" />
                      <path d="M 52 224 Q 80 296 112 224" fill="none" stroke="#000000" strokeWidth="4" strokeDasharray="160" strokeDashoffset="160" strokeLinecap="round" className="draw-curve-anim" />
                    </g>
                    {/* Bottom Right Quadrant - Monotonically Decreasing */}
                    <g>
                      <line x1="200" y1="200" x2="200" y2="280" stroke="#666666" strokeWidth="1" />
                      <line x1="200" y1="280" x2="280" y2="280" stroke="#666666" strokeWidth="1" />
                      <path d="M 208 208 Q 232 232 256 256 Q 268 268 280 280" fill="none" stroke="#000000" strokeWidth="4" strokeDasharray="160" strokeDashoffset="160" strokeLinecap="round" className="draw-curve-anim" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </section>
          {/* METHODS */}
          <section id="methods">
            <div className="block">
              <div className="block-header big-text" style={{ textAlign: 'center', fontSize: '2.3rem' }}>
                HEDGING CAN MITIGATE INFERENCE-TIME HACKING
              </div>
              <div className="block-content" style={{ padding: 0, marginTop: '-20px' }}>
                <div className="grid grid-3" style={{ borderTop: 'none', borderBottom: 'none' }}>
                  <div className="grid-item" style={{ borderLeft: 'none', borderRight: '2px solid #000000' }}>
                    <h3 style={{ textAlign: 'center' }}>BEST-OF-N</h3>
                    <p> 1. Draw <em>n</em> candidates <br /> 2. Score them using proxy reward <br /> 3. Select the one with the highest score.</p>
                  </div>
                  <div className="grid-item" style={{ borderLeft: 'none', borderRight: '2px solid #000000' }}>
                    <h3 style={{ textAlign: 'center' }}>SOFT&nbsp;BEST-OF-N</h3>
                    <p> 1. Draw <em>n</em> candidates <br /> 2. Score them using proxy reward <br /> 3. Sample a response from a softmax over the scores using a temperature λ.</p>
                  </div>
                  <div id="bop-item" style={{ background: '#ffcccc', padding: 25, position: 'relative', borderTop: '3px solid #000000', borderBottom: '2px solid #000000' }}>
                    <h3 style={{ textAlign: 'center' }}>BEST-OF-POISSON&nbsp;<small>[OURS]</small></h3>
                    <p> 1. Sample <em>n</em> from a Poisson distribution with parameter μ <br /> 2. Apply BoN using this n.</p>
                    <p style={{ marginTop: 10 }}> Provably close to the optimal RLHF tilted distribution & efficient at inference time!</p>
                  </div>
                </div>
                {/* Desktop HEDGETUNE box (hidden on mobile) */}
                <div className="hedgetune-box hedgetune-desktop">
                  <strong>HEDGETUNE:</strong> An efficient algorithm for finding the optimal inference-time parameter θ<sup>†</sup> for BoN, SBoN, and BoP.<br /> We only require <strong>samples</strong> from the proxy and true rewards!<br /><br />
                  1. Build score ψ(u, θ) for the chosen method<br />
                  2. Define residual R(θ) = E[ r_true(u) · ψ(u, θ) ]<br />
                  3. Find θ<sup>†</sup>, the root of the residual R(θ) using bisection or Newton's method<br />
                </div>
                {/* Mobile HEDGETUNE box (shown only on mobile) */}
                <div className="hedgetune-box hedgetune-mobile">
                  <strong>HEDGETUNE:</strong> An efficient algorithm for finding the optimal inference-time parameter θ<sup>†</sup> for BoN, SBoN, and BoP.<br /> We only require <strong>samples</strong> from the proxy and true rewards!<br /><br />
                  1. Build score ψ(u, θ) for the chosen method<br />
                  2. Define residual R(θ) = E[ r_true(u) · ψ(u, θ) ]<br />
                  3. Find θ<sup>†</sup>, the root of the residual R(θ) using bisection or Newton's method<br />
                </div>
              </div>
            </div>
          </section>
          {/* Bottom note */}
          <div style={{ textAlign: 'center', marginTop: 8, padding: 10 }}>
            <p style={{ fontStyle: 'italic', color: '#666666', fontSize: '1.3rem' }}>
              Check our <a href="https://arxiv.org/abs/2506.19248" target="_blank" rel="noopener noreferrer" style={{ color: '#000000', textDecoration: 'underline' }}>paper</a> to see how hedging mitigates hacking in real-world settings!
            </p>
          </div>
          {/* --- End main.html content --- */}
        </div>
        {/* FOOTER */}
        <footer className="footer">
          <h2>🚀 BUILDING SAFER AI THROUGH RELIABLE ALIGNMENT</h2>
          <p>This work provides both theoretical understanding and practical tools for mitigating reward hacking in AI systems.</p>
          <div className="footer-links">
            <a href="/inference-time-reward-hacking.pdf" target="_blank" rel="noopener noreferrer" className="footer-link">📄 PAPER</a>
            <a href="https://github.com/hskhalaf/hedging" target="_blank" rel="noopener noreferrer" className="footer-link">💻 CODE</a>
            <a href="https://infotheorylab.github.io/" target="_blank" rel="noopener noreferrer" className="footer-link">🏛️ LAB</a>
            <a href="mailto:hadikhalaf@g.harvard.edu" className="footer-link">✉️ CONTACT</a>
          </div>
        </footer>
      </div>
    </>
  );
} 