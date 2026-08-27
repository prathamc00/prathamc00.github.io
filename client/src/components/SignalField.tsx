/*
 * Design reminder: Terminal Editorial — this is not a decorative particle show.
 * It is a sparse, low-contrast field of model traces: dark, responsive, and quiet enough for the copy to lead.
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SignalField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const field = new THREE.Group();
    scene.add(field);
    const count = window.innerWidth < 720 ? 80 : 170;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const connectionPositions: number[] = [];
    const points: Array<[number, number, number]> = [];
    const lime = new THREE.Color("#b7ff3c");
    const slate = new THREE.Color("#809087");

    for (let index = 0; index < count; index += 1) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 0.5 + Math.pow(Math.random(), 0.62) * 3.1;
      const x = Math.cos(theta) * radius * 1.15;
      const y = Math.sin(theta) * radius * 0.85;
      const z = (Math.random() - 0.5) * 1.8;
      positions[index * 3] = x;
      positions[index * 3 + 1] = y;
      positions[index * 3 + 2] = z;
      points.push([x, y, z]);

      const color = index % 11 === 0 ? lime : slate;
      const intensity = index % 11 === 0 ? 0.92 : 0.3 + Math.random() * 0.3;
      colors[index * 3] = color.r * intensity;
      colors[index * 3 + 1] = color.g * intensity;
      colors[index * 3 + 2] = color.b * intensity;
    }

    for (let index = 0; index < points.length; index += 1) {
      const next = (index * 17 + 13) % points.length;
      if (index % 4 === 0) {
        connectionPositions.push(...points[index], ...points[next]);
      }
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ size: 0.046, vertexColors: true, transparent: true, opacity: 0.9, sizeAttenuation: true }),
    );

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(connectionPositions, 3));
    const lines = new THREE.LineSegments(
      lineGeometry,
      new THREE.LineBasicMaterial({ color: "#8da095", transparent: true, opacity: 0.14 }),
    );

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.56, 2),
      new THREE.MeshBasicMaterial({ color: "#b7ff3c", wireframe: true, transparent: true, opacity: 0.18 }),
    );
    field.add(particles, lines, core);
    field.position.set(0.3, 0, 0);
    field.rotation.set(-0.18, 0.35, 0.08);

    const pointer = new THREE.Vector2();
    const updatePointer = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", updatePointer, { passive: true });

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    let frame = 0;
    const clock = new THREE.Clock();
    const render = () => {
      const elapsed = clock.getElapsedTime();
      field.rotation.y += (pointer.x * 0.28 - field.rotation.y) * 0.015;
      field.rotation.x += (-0.16 + pointer.y * 0.1 - field.rotation.x) * 0.015;
      core.rotation.x = elapsed * 0.14;
      core.rotation.y = elapsed * 0.19;
      particles.rotation.z = elapsed * 0.022;
      renderer.render(scene, camera);
      if (!reducedMotion) frame = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", updatePointer);
      resizeObserver.disconnect();
      particleGeometry.dispose();
      lineGeometry.dispose();
      (particles.material as THREE.Material).dispose();
      (lines.material as THREE.Material).dispose();
      core.geometry.dispose();
      (core.material as THREE.Material).dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="signal-field" aria-hidden="true" />;
}
