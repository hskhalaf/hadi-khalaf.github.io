"use client";
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";

// Add this before the component to extend the Window type
declare global {
  interface Window {
    renderMathInElement?: (el: HTMLElement, opts: any) => void;
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
      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .header {
            background: #ffffff;
            border: 4px solid #000000;
            margin: 20px;
            padding: 40px;
            box-shadow: 12px 12px 0px #000000;
            position: relative;
        }
        .header::before {
            content: '';
            position: absolute;
            top: -4px;
            left: -4px;
            right: -4px;
            bottom: -4px;
            background: linear-gradient(45deg, #666666 0%, #666666 25%, transparent 25%, transparent 50%, #666666 50%, #666666 75%, transparent 75%);
            background-size: 8px 8px;
            z-index: -1;
            opacity: 0.05;
        }
        .title {
            font-size: clamp(2rem, 8vw, 4rem);
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: -2px;
            line-height: 0.9;
            margin-bottom: 20px;
            color: #000000;
        }
        .subtitle {
            font-size: clamp(1rem, 3vw, 1.5rem);
            font-weight: 600;
            color: #333333;
            text-transform: lowercase;
            margin-bottom: 30px;
            border-left: 6px solid #333333;
            padding-left: 20px;
        }
        .authors {
            background: #000000;
            color: #ffffff;
            padding: 15px 20px;
            margin: 20px 0;
            font-weight: 700;
            font-size: 18px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .buttons {
            display: flex;
            gap: 0;
            margin-top: 30px;
            flex-wrap: wrap;
        }
        .btn {
            background: #000000;
            color: #ffffff;
            border: none;
            padding: 15px 25px;
            font-family: var(--font-jetbrains-mono), monospace;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.1s ease;
            border: 3px solid #000000;
            position: relative;
        }
        .btn:hover {
            background: #ffffff;
            color: #000000;
            transform: translate(-2px, -2px);
            box-shadow: 2px 2px 0px #000000;
        }
        .btn.secondary {
            background: #ffffff;
            color: #000000;
        }
        .btn.secondary:hover {
            background: #000000;
            color: #ffffff;
        }
        .btn.danger {
            background: #333333;
            border-color: #333333;
        }
        .btn.danger:hover {
            background: #ffffff;
            color: #333333;
        }
        .nav {
            background: #000000;
            color: #ffffff;
            margin: 0 20px;
            border: 4px solid #000000;
            z-index: 100;
        }
        .nav-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0;
            flex-wrap: wrap;
        }
        .nav-item {
            background: #000000;
            color: #ffffff;
            padding: 15px 20px;
            text-decoration: none;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            border-right: 2px solid #ffffff;
            transition: all 0.1s ease;
            flex: 1;
            text-align: center;
            min-width: 120px;
        }
        .nav-item:last-child {
            border-right: none;
        }
        .nav-item:hover, .nav-item.active {
            background: #ffffff;
            color: #000000;
            transform: none;
        }
        .container {
            margin: 40px 20px;
            margin-left: auto;
            margin-right: auto;
        }
        .block {
            background: #ffffff;
            border: 4px solid #000000;
            margin-bottom: 40px;
            position: relative;
            max-width: 1100px;
            min-width: 850px;
            width: 100%;
            margin-left: auto !important;
            margin-right: auto !important;
        }
        .block.danger {
            border-color: #cc4444;
            box-shadow: 8px 8px 0px #cc4444;
        }
        .block.success {
            border-color: #333333;
            box-shadow: 8px 8px 0px #333333;
        }
        .block.warning {
            border-color: #333333;
            box-shadow: 8px 8px 0px #333333;
        }
        .block-header {
            background: #000000;
            color: #ffffff;
            padding: 20px;
            font-weight: 800;
            font-size: 32px;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-align: center;
        }
        .block.danger .block-header {
            background: #cc4444;
        }
        .block.success .block-header {
            background: #333333;
        }
        .block.warning .block-header {
            background: #333333;
        }
        .block-content {
            padding: 30px;
            background: #ffffff;
        }
        .demo-block {
            background: #ffffff;
            border: 6px solid #000000;
            margin: 40px 0;
            position: relative;
            max-width: 1100px;
            min-width: 850px;
            width: 100%;
        }
        .demo-header {
            background: #333333;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            font-weight: 800;
            font-size: 24px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .demo-content {
            padding: 40px;
            background: #fcfcfc;
            border-top: 4px solid #000000;
        }
        .chart-container {
            background: #ffffff;
            border: 4px solid #000000;
            padding: 30px;
            margin: 20px 0;
            box-shadow: 8px 8px 0px #000000;
        }
        .grid {
            display: grid;
            gap: 0;
            margin: 20px 0;
        }
        .grid-2 {
            grid-template-columns: 1fr 1fr;
        }
        .grid-3 {
            grid-template-columns: repeat(3, 1fr);
        }
        .grid-item {
            background: #ffffff;
            border: 3px solid #000000;
            padding: 25px;
            position: relative;
        }
        .grid-item:not(:last-child) {
            border-right: none;
        }
        .grid-item.highlight {
            background: #f0f0f0;
            border: 3px solid #000000;
        }
        .grid-item.danger {
            background: #f5f5f5;
        }
        .grid-item.success {
            background: #f8f8f8;
        }
        #bop-item.grid-item {
            border: none !important;
            border-top: 3px solid #000000 !important;
            border-bottom: 4px solid #000000 !important;
        }
        @media (max-width: 768px) {
            #bop-item.grid-item {
                border: none !important;
                border-top: 3px solid #000000 !important;
                border-bottom: 4px solid #000000 !important;
                padding: 20px !important;
            }
        }
        .method-card {
            background: #ffffff;
            border: 4px solid #000000;
            margin-bottom: 20px;
            position: relative;
        }
        .method-card.bon {
            box-shadow: 8px 8px 0px #444444;
        }
        .method-card.sbon {
            box-shadow: 8px 8px 0px #555555;
        }
        .method-card.bop {
            box-shadow: 8px 8px 0px #666666;
        }
        .method-header {
            background: #000000;
            color: #ffffff;
            padding: 15px 20px;
            font-weight: 700;
            font-size: 16px;
            text-transform: uppercase;
        }
        .method-card.bon .method-header {
            background: #444444;
        }
        .method-card.sbon .method-header {
            background: #555555;
        }
        .method-card.bop .method-header {
            background: #666666;
        }
        .method-content {
            padding: 20px;
        }
        .formula {
            background: #000000;
            color: #ffffff;
            padding: 15px;
            margin: 15px 0;
            font-family: var(--font-jetbrains-mono), monospace;
            font-size: 14px;
            border: 2px solid #333333;
            overflow-x: auto;
        }
        h1, h2, h3 {
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        h2 {
            font-size: 28px;
            margin-bottom: 20px;
        }
        h3 {
            font-size: 18px;
            margin-bottom: 15px;
        }
        p {
            margin-bottom: 15px;
            font-weight: 400;
            line-height: 1.5;
        }
        .big-text {
            font-size: 20px;
            font-weight: 700;
            line-height: 1.3;
        }
        .highlight-text {
            background: #eeeeee;
            padding: 2px 6px;
            font-weight: 600;
            border: 1px solid #000000;
        }
        @keyframes drawCurve {
            0% {
                stroke-dashoffset: 200;
            }
            45% {
                stroke-dashoffset: 0;
            }
            55% {
                stroke-dashoffset: 0;
            }
            100% {
                stroke-dashoffset: -200;
            }
        }
        .danger-text {
            color: #cc4444;
            font-weight: 700;
        }
        .success-text {
            color: #000000;
            font-weight: 700;
        }
        .alert {
            padding: 20px;
            margin: 20px 0;
            border: 4px solid;
            font-weight: 600;
        }
        .alert.danger {
            background: #fff5f5;
            border-color: #cc4444;
            color: #cc4444;
        }
        .alert.warning {
            background: #f5f5f5;
            border-color: #333333;
            color: #000000;
        }
        .alert.success {
            background: #f5f5f5;
            border-color: #000000;
            color: #000000;
        }
        .footer {
            background: #000000;
            color: #ffffff;
            margin: 40px 20px 20px 20px;
            border: 4px solid #000000;
            padding: 40px;
            text-align: center;
        }
        .footer h2 {
            margin-bottom: 20px;
            color: #ffffff;
        }
        .footer-links {
            display: flex;
            justify-content: center;
            gap: 0;
            margin-top: 30px;
            flex-wrap: wrap;
        }
        .footer-link {
            background: #ffffff;
            color: #000000;
            padding: 12px 20px;
            text-decoration: none;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            border: 2px solid #ffffff;
            transition: all 0.1s ease;
        }
        .footer-link:hover {
            background: #000000;
            color: #ffffff;
        }
        @media (max-width: 768px) {
            .nav {
                display: none !important;
            }
            .header {
                margin: 10px;
                padding: 20px;
            }
            .title {
                font-size: clamp(1.5rem, 6vw, 2.5rem);
                line-height: 1.1;
            }
            .subtitle {
                font-size: clamp(0.9rem, 2.5vw, 1.2rem);
            }
            .authors {
                font-size: 14px;
                line-height: 1.3;
            }
            .nav {
                margin: 0 10px;
            }
            .container {
                margin: 20px 0;
                padding: 0 15px !important;
            }
            section {
                margin: 30px 0 !important;
                padding: 0 !important;
            }
            .block, .demo-block {
                max-width: calc(100% - 30px) !important;
                min-width: calc(100% - 30px) !important;
                margin: 15px 15px !important;
            }
            .demo-block {
                max-width: calc(100% - 30px) !important;
                min-width: unset !important;
                margin: 15px 15px !important;
                width: calc(100% - 30px) !important;
            }
            #demo {
                margin: 15px 15px !important;
                display: flex !important;
                justify-content: center !important;
            }
            #demo {
                margin: 30px 0 !important;
                padding: 0 15px !important;
                display: block !important;
                justify-content: unset !important;
            }
            .block-header {
                font-size: 24px;
                padding: 15px;
            }
            .block-content, .demo-content {
                padding: 20px;
            }
            .grid-2, .grid-3 {
                grid-template-columns: 1fr;
            }
            .grid-item:not(:last-child) {
                border-right: 3px solid #000000;
                border-bottom: none;
            }
            .nav-content {
                flex-direction: column;
            }
            .nav-item {
                border-right: none;
                border-bottom: 2px solid #ffffff;
                min-width: unset;
                width: 100%;
                font-size: 11px;
                padding: 12px 15px;
            }
            .nav-item:last-child {
                border-bottom: none;
            }
            .buttons {
                flex-direction: column;
                gap: 0;
            }
            .btn {
                width: 100%;
                margin: 0;
                border-bottom: 2px solid #333333;
            }
            .btn:last-child {
                border-bottom: none;
            }
            .footer {
                margin: 20px 10px 10px 10px;
                padding: 20px;
            }
            .footer-links {
                flex-direction: column;
                gap: 0;
            }
            .footer-link {
                border-bottom: 2px solid #333333;
                width: 100%;
                text-align: center;
            }
            .footer-link:last-child {
                border-bottom: none;
            }
            .chart-container {
                padding: 5px;
                margin: 5px 0;
                overflow: hidden;
                max-width: 100%;
                width: 100%;
            }
            #chart {
                width: 100% !important;
                height: 250px !important;
                min-width: unset !important;
                max-width: 100% !important;
            }
            .demo-block {
                max-width: 100% !important;
                min-width: 100% !important;
                margin: 10px 0 !important;
            }
            .demo-header {
                font-size: 18px;
                padding: 15px;
            }
            .block-content svg {
                max-width: 100%;
                height: auto;
            }
            .block-content[style*="display: flex"] {
                flex-direction: column !important;
                align-items: center !important;
                gap: 20px !important;
                padding: 20px !important;
            }
            .block-content[style*="display: flex"] > div:first-child {
                padding-right: 0 !important;
                text-align: center;
            }
            .block-content[style*="display: flex"] > div:last-child {
                flex: none !important;
                height: 250px !important;
                margin: 0 !important;
                width: 100% !important;
                max-width: 300px;
            }
            h2 {
                font-size: 24px;
            }
            h3 {
                font-size: 16px;
            }
            .big-text {
                font-size: 18px;
            }
            .block-header.big-text[style*="2.8rem"] {
                font-size: 1.6rem !important;
                line-height: 1.2 !important;
                padding: 12px !important;
            }
            .block-header.big-text[style*="2.3rem"] {
                font-size: 1.4rem !important;
                padding: 12px !important;
            }
            .block-content p {
                font-size: 14px !important;
                line-height: 1.4 !important;
            }
            .block-content h3 {
                font-size: 16px !important;
            }
            .alert {
                padding: 15px;
                margin: 15px 0;
                font-size: 14px;
            }
            .formula {
                padding: 12px;
                font-size: 12px;
            }
            .code {
                padding: 15px;
                font-size: 12px;
            }
        }
        @media (max-width: 480px) {
            .header {
                margin: 5px;
                padding: 15px;
            }
            .title {
                font-size: clamp(1.2rem, 5vw, 2rem);
            }
            .subtitle {
                font-size: clamp(0.8rem, 2vw, 1rem);
            }
            .authors {
                font-size: 12px;
            }
            .nav, .container, .footer {
                margin-left: 5px;
                margin-right: 5px;
            }
            .block-header {
                font-size: 20px;
                padding: 12px;
            }
            .block-content, .demo-content {
                padding: 15px;
            }
            .btn {
                padding: 12px 20px;
                font-size: 11px;
            }
            .nav-item {
                padding: 10px 12px;
                font-size: 10px;
            }
            #chart {
                height: 350px;
                min-width: 500px;
            }
            .chart-container {
                padding: 10px;
            }
        }
        @keyframes drawCurve {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
        .glitch:hover {
            animation: glitch 0.3s ease-in-out;
        }
        .code {
            background: #000000;
            color: #ffffff;
            padding: 20px;
            margin: 20px 0;
            font-family: var(--font-jetbrains-mono), monospace;
            border: 3px solid #333333;
            overflow-x: auto;
            position: relative;
        }
        .code::before {
            content: '> ALGORITHM';
            position: absolute;
            top: -15px;
            left: 20px;
            background: #333333;
            color: #ffffff;
            padding: 5px 10px;
            font-size: 10px;
            font-weight: 700;
        }
        .main-content .block {
            margin-left: auto;
            margin-right: auto;
        }
        .block {
            margin-left: auto !important;
            margin-right: auto !important;
            display: block !important;
        }
        .demo-block {
            margin-left: auto !important;
            margin-right: auto !important;
            display: block !important;
        }
        .grid-item.highlight {
            background: #ffcccc !important;
            border: 2px solid #cc4444 !important;
            margin: 10px 0 !important;
            padding: 20px !important;
        }
        .grid-item:not(:last-child) {
            border-right: none !important;
            border-bottom: 2px solid #000000 !important;
            padding: 20px !important;
        }
        .grid-item:last-child {
            border-bottom: none !important;
            padding: 20px !important;
        }
        .peak-star {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .peak-star.visible {
            opacity: 1;
        }
        .main-title.demo-title {
            text-align: center;
            font-size: 2.5rem;
            font-weight: 700;
            margin: 0 0 10px 0;
            letter-spacing: -0.01em;
            font-family: var(--font-jetbrains-mono), monospace;
        }
        .chart-container svg {
            width: 100%;
            height: auto;
            display: block;
        }
        .controls {
            text-align: center;
            margin-top: 20px;
            display: flex;
            gap: 10px;
            justify-content: center;
            position: static;
            bottom: auto;
            left: auto;
            transform: none;
            margin-bottom: 40px;
        }
        .controls button {
            padding: 10px 20px;
            font-size: 13px;
            font-weight: 500;
            font-family: var(--font-jetbrains-mono), monospace;
            background: #000000;
            color: #ffffff;
            border: none;
            border-radius: 0px;
            cursor: pointer;
            transition: all 0.1s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .controls button:hover {
            background: #333333;
        }
        .controls button:disabled {
            background: #cccccc;
            color: #666666;
            cursor: not-allowed;
        }
        @media (max-width: 600px) {
          .chart-container {
            padding: 8px;
          }
          .main-title.demo-title {
            font-size: 1.3rem;
          }
        }
      `}</style>
      {/* HEADER */}
      <header className="header">
        <h1 className="title">INFERENCE-TIME REWARD HACKING <br /> IN LARGE LANGUAGE MODELS</h1>
        <div className="subtitle">when optimization goes wrong...</div>
        <div className="authors">
          HADI KHALAF¹ • CLAUDIO MAYRINK VERDUN¹ • ALEX OESTERLING¹ • HIMABINDU LAKKARAJU¹'² • FLAVIO DU PIN CALMON¹
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
          <div className="block">
            <div className="block-header big-text" style={{ textAlign: 'center', fontSize: '2.3rem' }}>REWARD HACKING IS INEVITABLE</div>
            <div className="block-content" style={{ display: 'flex', alignItems: 'stretch', gap: 0, padding: '40px 40px 40px 40px' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: 40 }}>
                <p>We derive exact conditions under which one of the four possible regimes (shown on the right) is envitable for common inference-time schemes such as Best-of-n.</p>
                <p><strong>Consequence:</strong> A unique hacking threshold θ<sup>†</sup> exists, and we have a principled way to find it!</p>
              </div>
              <div style={{ flex: '0 0 320px', height: 320, margin: '-40px -40px -40px 0' }}>
                {/* SVG quadrant diagram from main.html */}
                <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%', background: '#ffffff', display: 'block' }}>
                  <line x1="0" y1="0" x2="0" y2="400" stroke="#000000" strokeWidth="2" />
                  <line x1="200" y1="0" x2="200" y2="400" stroke="#000000" strokeWidth="2" />
                  <line x1="0" y1="200" x2="400" y2="200" stroke="#000000" strokeWidth="2" />
                  {/* Top Left Quadrant - Monotonically Increasing */}
                  <g>
                    <line x1="50" y1="50" x2="50" y2="150" stroke="#666666" strokeWidth="1" />
                    <line x1="50" y1="150" x2="150" y2="150" stroke="#666666" strokeWidth="1" />
                    <path d="M 60 140 Q 85 105 110 80 Q 125 65 140 50" fill="none" stroke="#000000" strokeWidth="4" strokeDasharray="200" strokeDashoffset="200" strokeLinecap="round" style={{ animation: 'drawCurve 4s ease-in-out infinite' }} />
                  </g>
                  {/* Top Right Quadrant - Concave (up then down) - HACKING */}
                  <g>
                    <line x1="250" y1="50" x2="250" y2="150" stroke="#666666" strokeWidth="1" />
                    <line x1="250" y1="150" x2="350" y2="150" stroke="#666666" strokeWidth="1" />
                    <path d="M 260 140 Q 310 40 340 140" fill="none" stroke="#cc4444" strokeWidth="4" strokeDasharray="200" strokeDashoffset="200" strokeLinecap="round" style={{ animation: 'drawCurve 4s ease-in-out infinite' }} />
                  </g>
                  {/* Bottom Left Quadrant - Convex (down then up) */}
                  <g>
                    <line x1="50" y1="250" x2="50" y2="350" stroke="#666666" strokeWidth="1" />
                    <line x1="50" y1="350" x2="150" y2="350" stroke="#666666" strokeWidth="1" />
                    <path d="M 60 280 Q 110 360 140 280" fill="none" stroke="#000000" strokeWidth="4" strokeDasharray="200" strokeDashoffset="200" strokeLinecap="round" style={{ animation: 'drawCurve 4s ease-in-out infinite' }} />
                  </g>
                  {/* Bottom Right Quadrant - Monotonically Decreasing */}
                  <g>
                    <line x1="250" y1="250" x2="250" y2="350" stroke="#666666" strokeWidth="1" />
                    <line x1="250" y1="350" x2="350" y2="350" stroke="#666666" strokeWidth="1" />
                    <path d="M 260 260 Q 285 285 310 310 Q 325 325 340 340" fill="none" stroke="#000000" strokeWidth="4" strokeDasharray="200" strokeDashoffset="200" strokeLinecap="round" style={{ animation: 'drawCurve 4s ease-in-out infinite' }} />
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
              <div style={{ marginTop: '0.5rem', marginLeft: 40, padding: '5px 15px 15px 5px' }}>
                <strong>HEDGETUNE:</strong> An efficient algorithm for finding the optimal inference-time parameter θ<sup>†</sup> for BoN, SBoN, and BoP. We only require <strong> samples </strong> from the proxy and true rewards!<br /><br />
                1. Build score ψ(u, θ) for the chosen method<br />
                2. Define residual R(θ) = E[ r_true(u) · ψ(u, θ) ]<br />
                3. Find θ<sup>†</sup>, the root of the residual R(θ) using bisection or Newton's method<br />
              </div>
            </div>
          </div>
        </section>
        {/* Bottom note */}
        <div style={{ textAlign: 'center', marginTop: 20, padding: 10 }}>
          <p style={{ fontStyle: 'italic', color: '#666666', fontSize: '1.1rem' }}>
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
    </>
  );
} 