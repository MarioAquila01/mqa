import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { motion } from 'framer-motion';

const AreaVip = () => {
  const mountRef = useRef(null);
  const userEmail = localStorage.getItem('userEmail') || 'Convidado';
  const userName = userEmail.split('@')[0];

  useEffect(() => {
    const scene = new THREE.Scene();

    // 💡 Luzes
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // 📷 Câmera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    // 🖥️ Renderizador
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 🌌 Partículas
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 800;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xfcd34d,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // 🖼️ Logo como plano giratório
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load('/assets/img/logo3D.png');
    const logoMaterial = new THREE.MeshBasicMaterial({ map: logoTexture, transparent: true });
    const logoGeometry = new THREE.PlaneGeometry(2, 2);
    const logoMesh = new THREE.Mesh(logoGeometry, logoMaterial);
    scene.add(logoMesh);

    // 🔄 Controles
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // 🔁 Animação
    const animate = () => {
      requestAnimationFrame(animate);
      logoMesh.rotation.y += 0.01;
      particles.rotation.y += 0.001;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Responsividade
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Animações
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: 'easeOut' },
    },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center justify-center text-white px-4 overflow-hidden">
      <div ref={mountRef} className="absolute inset-0 z-0" />

      <motion.div
        className="relative z-10 text-center max-w-2xl bg-[#151515]/90 border border-purple-500/30 p-8 rounded-3xl shadow-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent"
          variants={titleVariants}
        >
          Bem-vindo(a) à Área VIP, {userName.charAt(0).toUpperCase() + userName.slice(1)}!
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl font-light text-gray-200 mb-6"
          variants={titleVariants}
        >
          Transforme sua vida com apoio, propósito e inteligência emocional.
        </motion.p>

        <motion.p
          className="text-gray-300 max-w-lg mx-auto mb-8 text-sm md:text-base leading-relaxed"
          variants={containerVariants}
        >
          Aqui você encontrará mentorias exclusivas com Thaís Rosa, ferramentas práticas e uma comunidade para reconstruir sua jornada com leveza e força interior.
        </motion.p>

        <motion.button
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:brightness-110 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/dashboard'}
        >
          Acessar Conteúdos VIP
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AreaVip;
