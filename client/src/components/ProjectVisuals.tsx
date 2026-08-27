import { useEffect, useRef } from "react";

/**
 * 01 / Deepfake Detection Forensics Canvas
 * Features: High-tech neural face grid, frequency domain FFT scan, dynamic bounding box & confidence metrics
 */
export function DeepfakeVisual({ active = true }: { active?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const render = () => {
      time += 0.025;
      const w = canvas.width;
      const h = canvas.height;
      if (!w || !h) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      const cw = w / dpr;
      const ch = h / dpr;

      ctx.clearRect(0, 0, cw, ch);

      // Dark futuristic background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, cw, ch);
      bgGrad.addColorStop(0, "#0a0e0b");
      bgGrad.addColorStop(1, "#060807");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, cw, ch);

      // Subtle isometric grid
      ctx.strokeStyle = "rgba(183, 255, 60, 0.08)";
      ctx.lineWidth = 1;
      const gridSize = 28;
      for (let x = 0; x < cw; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ch);
        ctx.stroke();
      }
      for (let y = 0; y < ch; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(cw, y);
        ctx.stroke();
      }

      // Center Face Wireframe Ellipse & Landmarks
      const cx = cw * 0.5;
      const cy = ch * 0.44;
      const headRadiusX = Math.min(cw * 0.22, 95);
      const headRadiusY = Math.min(ch * 0.32, 130);

      // Head contour glow
      ctx.save();
      ctx.strokeStyle = "rgba(183, 255, 60, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(cx, cy, headRadiusX, headRadiusY, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Inner facial feature lines
      const eyeY = cy - headRadiusY * 0.15;
      const mouthY = cy + headRadiusY * 0.45;
      const noseY = cy + headRadiusY * 0.12;

      // Eye lines & scan nodes
      const eyeSpacing = headRadiusX * 0.52;
      const eyeWidth = headRadiusX * 0.32;

      ctx.strokeStyle = "rgba(183, 255, 60, 0.65)";
      ctx.fillStyle = "#b7ff3c";
      // Left eye
      ctx.beginPath();
      ctx.ellipse(cx - eyeSpacing, eyeY, eyeWidth, 7, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillRect(cx - eyeSpacing - 2, eyeY - 2, 4, 4);

      // Right eye
      ctx.beginPath();
      ctx.ellipse(cx + eyeSpacing, eyeY, eyeWidth, 7, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillRect(cx + eyeSpacing - 2, eyeY - 2, 4, 4);

      // Nose bridge & tip
      ctx.beginPath();
      ctx.moveTo(cx, eyeY - 5);
      ctx.lineTo(cx, noseY);
      ctx.lineTo(cx + 8, noseY + 6);
      ctx.lineTo(cx - 8, noseY + 6);
      ctx.closePath();
      ctx.stroke();

      // Mouth contour
      ctx.beginPath();
      ctx.ellipse(cx, mouthY, eyeSpacing * 0.8, 6, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Neural triangulation mesh connections across face
      const faceNodes: Array<[number, number]> = [
        [cx - eyeSpacing, eyeY],
        [cx + eyeSpacing, eyeY],
        [cx, noseY],
        [cx - eyeSpacing * 0.6, noseY + 12],
        [cx + eyeSpacing * 0.6, noseY + 12],
        [cx, mouthY],
        [cx - eyeSpacing * 0.8, mouthY - 4],
        [cx + eyeSpacing * 0.8, mouthY - 4],
        [cx, cy - headRadiusY * 0.7],
        [cx - headRadiusX * 0.7, cy - headRadiusY * 0.4],
        [cx + headRadiusX * 0.7, cy - headRadiusY * 0.4],
        [cx - headRadiusX * 0.85, cy + headRadiusY * 0.2],
        [cx + headRadiusX * 0.85, cy + headRadiusY * 0.2],
        [cx, cy + headRadiusY * 0.85],
      ];

      ctx.strokeStyle = "rgba(183, 255, 60, 0.22)";
      ctx.lineWidth = 1;
      for (let i = 0; i < faceNodes.length; i++) {
        for (let j = i + 1; j < faceNodes.length; j++) {
          const dx = faceNodes[i][0] - faceNodes[j][0];
          const dy = faceNodes[i][1] - faceNodes[j][1];
          const dist = Math.hypot(dx, dy);
          if (dist < headRadiusX * 0.95) {
            ctx.beginPath();
            ctx.moveTo(faceNodes[i][0], faceNodes[i][1]);
            ctx.lineTo(faceNodes[j][0], faceNodes[j][1]);
            ctx.stroke();
          }
        }
        // Small node dot
        ctx.fillStyle = i % 3 === 0 ? "#b7ff3c" : "rgba(224, 238, 227, 0.6)";
        ctx.beginPath();
        ctx.arc(faceNodes[i][0], faceNodes[i][1], 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Detection Bounding Box with corner brackets
      const boxW = headRadiusX * 2.4;
      const boxH = headRadiusY * 2.2;
      const bx = cx - boxW / 2;
      const by = cy - boxH / 2;
      const cornerLen = 14;

      ctx.strokeStyle = "#b7ff3c";
      ctx.lineWidth = 2;

      // Top-Left
      ctx.beginPath();
      ctx.moveTo(bx, by + cornerLen);
      ctx.lineTo(bx, by);
      ctx.lineTo(bx + cornerLen, by);
      ctx.stroke();

      // Top-Right
      ctx.beginPath();
      ctx.moveTo(bx + boxW - cornerLen, by);
      ctx.lineTo(bx + boxW, by);
      ctx.lineTo(bx + boxW, by + cornerLen);
      ctx.stroke();

      // Bottom-Left
      ctx.beginPath();
      ctx.moveTo(bx, by + boxH - cornerLen);
      ctx.lineTo(bx, by + boxH);
      ctx.lineTo(bx + cornerLen, by + boxH);
      ctx.stroke();

      // Bottom-Right
      ctx.beginPath();
      ctx.moveTo(bx + boxW - cornerLen, by + boxH);
      ctx.lineTo(bx + boxW, by + boxH);
      ctx.lineTo(bx + boxW, by + boxH - cornerLen);
      ctx.stroke();

      // Vertical Forensics Laser Scanline
      const scanProgress = (Math.sin(time * 1.6) + 1) / 2;
      const scanY = by + scanProgress * boxH;

      const scanGrad = ctx.createLinearGradient(0, scanY - 14, 0, scanY + 14);
      scanGrad.addColorStop(0, "rgba(183, 255, 60, 0)");
      scanGrad.addColorStop(0.5, "rgba(183, 255, 60, 0.45)");
      scanGrad.addColorStop(1, "rgba(183, 255, 60, 0)");

      ctx.fillStyle = scanGrad;
      ctx.fillRect(bx, scanY - 12, boxW, 24);

      ctx.strokeStyle = "rgba(183, 255, 60, 0.9)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(bx, scanY);
      ctx.lineTo(bx + boxW, scanY);
      ctx.stroke();

      // HUD Telemetry Metadata Badges
      ctx.font = '500 9px "IBM Plex Mono", monospace';
      ctx.fillStyle = "rgba(183, 255, 60, 0.9)";
      ctx.fillText(`[PYTORCH_ENSEMBLE]`, bx, by - 8);

      ctx.fillStyle = "rgba(224, 238, 227, 0.75)";
      const prob = (0.924 + Math.sin(time * 2) * 0.015).toFixed(3);
      ctx.fillText(`CONF: ${prob} · REAL`, bx + boxW - 105, by - 8);

      // Bottom Frequency Spectrum Waveform (FFT Artifacts)
      const waveY = ch - 54;
      ctx.strokeStyle = "rgba(183, 255, 60, 0.5)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let x = 20; x < cw - 20; x += 4) {
        const freq = Math.sin(x * 0.08 + time * 3) * Math.cos(x * 0.03 - time * 2);
        const barH = Math.abs(freq) * 16 + (Math.sin(x + time * 5) * 4);
        ctx.moveTo(x, waveY);
        ctx.lineTo(x, waveY - barH);
      }
      ctx.stroke();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [active]);

  return <canvas ref={canvasRef} className="project-canvas" style={{ width: "100%", height: "100%", display: "block" }} />;
}

/**
 * 02 / Biometric Face Recognition & Anti-Spoofing Geometry Canvas
 */
export function FacialVisual({ active = true }: { active?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const render = () => {
      time += 0.03;
      const w = canvas.width;
      const h = canvas.height;
      if (!w || !h) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      const cw = w / dpr;
      const ch = h / dpr;

      ctx.clearRect(0, 0, cw, ch);

      // Background
      const bgGrad = ctx.createLinearGradient(0, 0, cw, ch);
      bgGrad.addColorStop(0, "#0b0f0c");
      bgGrad.addColorStop(1, "#070a08");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, cw, ch);

      // Dynamic radar polar rings
      const cx = cw * 0.5;
      const cy = ch * 0.48;

      ctx.strokeStyle = "rgba(183, 255, 60, 0.12)";
      ctx.lineWidth = 1;
      [35, 70, 105, 140].forEach((r) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Rotating radar beam
      const angle = time * 1.2;
      const radarGrad = ctx.createConicGradient(angle, cx, cy);
      radarGrad.addColorStop(0, "rgba(183, 255, 60, 0.28)");
      radarGrad.addColorStop(0.18, "rgba(183, 255, 60, 0.02)");
      radarGrad.addColorStop(0.5, "rgba(183, 255, 60, 0)");
      radarGrad.addColorStop(1, "rgba(183, 255, 60, 0.28)");

      ctx.fillStyle = radarGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.fill();

      // Biometric landmark nodes matrix
      const cols = 7;
      const rows = 5;
      const spacingX = cw * 0.11;
      const spacingY = ch * 0.13;
      const startX = cx - (cols - 1) * spacingX * 0.5;
      const startY = cy - (rows - 1) * spacingY * 0.5;

      const nodes: Array<{ x: number; y: number; active: boolean; pulse: number }> = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const nx = startX + c * spacingX + Math.sin(time + r * 0.6 + c * 0.4) * 4;
          const ny = startY + r * spacingY + Math.cos(time + c * 0.6 + r * 0.4) * 4;
          const dist = Math.hypot(nx - cx, ny - cy);
          if (dist < 135) {
            const nodeAngle = Math.atan2(ny - cy, nx - cx);
            let diff = (nodeAngle - (angle % (Math.PI * 2)) + Math.PI * 4) % (Math.PI * 2);
            const pulse = diff < 0.8 ? 1 - diff / 0.8 : 0;
            nodes.push({ x: nx, y: ny, active: pulse > 0.3, pulse });
          }
        }
      }

      // Connecting lines
      ctx.strokeStyle = "rgba(183, 255, 60, 0.16)";
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < spacingX * 1.5) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Render nodes with pulses
      nodes.forEach((n) => {
        if (n.pulse > 0.1) {
          ctx.strokeStyle = `rgba(183, 255, 60, ${n.pulse * 0.6})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 4 + n.pulse * 5, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = n.active ? "#b7ff3c" : "rgba(224, 238, 227, 0.45)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.active ? 2.5 : 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      // HUD status
      ctx.font = '500 9px "IBM Plex Mono", monospace';
      ctx.fillStyle = "#b7ff3c";
      ctx.fillText(`MOBILENET_V2 · BLINK_CHECK: PASS`, 20, ch - 22);

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [active]);

  return <canvas ref={canvasRef} className="project-canvas" style={{ width: "100%", height: "100%", display: "block" }} />;
}

/**
 * 03 / InBox-AleRt Priority Neural Router Canvas
 */
export function InboxVisual({ active = true }: { active?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    interface Packet {
      progress: number;
      speed: number;
      lane: number;
      score: number;
    }

    const packets: Packet[] = Array.from({ length: 8 }, (_, i) => ({
      progress: (i / 8) + Math.random() * 0.1,
      speed: 0.006 + Math.random() * 0.008,
      lane: Math.floor(Math.random() * 4),
      score: Math.floor(65 + Math.random() * 34),
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const render = () => {
      time += 0.03;
      const w = canvas.width;
      const h = canvas.height;
      if (!w || !h) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      const cw = w / dpr;
      const ch = h / dpr;

      ctx.clearRect(0, 0, cw, ch);

      // Background
      const bgGrad = ctx.createLinearGradient(0, 0, cw, ch);
      bgGrad.addColorStop(0, "#080c09");
      bgGrad.addColorStop(1, "#050706");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, cw, ch);

      // Webhook Ingestion Point (Left) -> 4 Priority Channels (Right)
      const inX = 38;
      const inY = ch * 0.48;

      const outX = cw - 42;
      const lanes = [ch * 0.22, ch * 0.38, ch * 0.58, ch * 0.74];

      // Draw routing curves
      lanes.forEach((outY, idx) => {
        ctx.strokeStyle = idx === 0 ? "rgba(183, 255, 60, 0.45)" : "rgba(183, 255, 60, 0.14)";
        ctx.lineWidth = idx === 0 ? 2 : 1;

        ctx.beginPath();
        ctx.moveTo(inX, inY);
        ctx.bezierCurveTo(inX + (outX - inX) * 0.45, inY, inX + (outX - inX) * 0.55, outY, outX, outY);
        ctx.stroke();

        // Target End Nodes
        ctx.fillStyle = idx === 0 ? "#b7ff3c" : "rgba(224, 238, 227, 0.4)";
        ctx.fillRect(outX - 4, outY - 4, 8, 8);

        // Priority Score Labels on Right
        ctx.font = '500 8px "IBM Plex Mono", monospace';
        ctx.fillStyle = idx === 0 ? "#b7ff3c" : "rgba(224, 238, 227, 0.6)";
        const label = idx === 0 ? "URGENT [90-100]" : idx === 1 ? "HIGH [75-89]" : idx === 2 ? "MED [50-74]" : "LOW [<50]";
        ctx.fillText(label, outX - 78, outY - 7);
      });

      // Ingestion Core Node
      ctx.strokeStyle = "#b7ff3c";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(inX - 10, inY - 10, 20, 20);
      ctx.fillStyle = "rgba(183, 255, 60, 0.25)";
      ctx.fillRect(inX - 7, inY - 7, 14, 14);

      // Animate flowing signal packets
      packets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) {
          p.progress = 0;
          p.lane = Math.floor(Math.random() * lanes.length);
          p.score = Math.floor(65 + Math.random() * 34);
        }

        const t = p.progress;
        const targetY = lanes[p.lane];
        const cx1 = inX + (outX - inX) * 0.45;
        const cx2 = inX + (outX - inX) * 0.55;

        // Bezier calculation
        const px = Math.pow(1 - t, 3) * inX + 3 * Math.pow(1 - t, 2) * t * cx1 + 3 * (1 - t) * Math.pow(t, 2) * cx2 + Math.pow(t, 3) * outX;
        const py = Math.pow(1 - t, 3) * inY + 3 * Math.pow(1 - t, 2) * t * inY + 3 * (1 - t) * Math.pow(t, 2) * targetY + Math.pow(t, 3) * targetY;

        // Packet glow & core
        ctx.fillStyle = p.lane === 0 ? "#b7ff3c" : "rgba(224, 238, 227, 0.9)";
        ctx.beginPath();
        ctx.arc(px, py, p.lane === 0 ? 3.5 : 2.5, 0, Math.PI * 2);
        ctx.fill();

        if (p.lane === 0) {
          ctx.strokeStyle = "rgba(183, 255, 60, 0.5)";
          ctx.beginPath();
          ctx.arc(px, py, 7, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Bottom Telemetry
      ctx.font = '500 9px "IBM Plex Mono", monospace';
      ctx.fillStyle = "#b7ff3c";
      ctx.fillText(`WEBHOOKS · FASTAPI · CELERY REDIS QUEUE`, 20, ch - 22);

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [active]);

  return <canvas ref={canvasRef} className="project-canvas" style={{ width: "100%", height: "100%", display: "block" }} />;
}
