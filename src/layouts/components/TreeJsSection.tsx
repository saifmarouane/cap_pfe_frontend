'use client';

import React, { useEffect, useRef, useState } from 'react';
 

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

 


const TreeJsSection: React.FC = () => {
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null); // Ajoutez cette ligne

  useEffect(() => {
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
      });

      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 5;

      const controls = new OrbitControls(camera, canvasRef.current);
      controls.target.set(0, 0, 0);
      controls.update();

      const animate = () => {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        controls.update();

        // renderer.render(scene, camera);
      };

      animate();

      window.addEventListener('resize', onWindowResize);

      return () => {
        window.removeEventListener('resize', onWindowResize);
      };

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    }
  }, []);





  return (
    <>
      <div className=" p-1 h-1/2 w-full  border border-gray-300 rounded-lg dark:border-gray-600 shadow-md">
        <div className="flex h-full flex-col">
          <div className="flex-initial p-2  border-gray-00 dark:border-gray-500  ">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-4 h-1 rounded-full bg-gray-800 animate-pulse" />
                <h1 className="text-lg font-semibold">Design concept</h1>
                </div>
              </div>
            
            </div>
          <div/>
             
          <canvas ref={canvasRef}          className="flex-1   h-4/5 rounded-lg "
  />
        </div>
      </div>
      <div className="mt-2 p-1 h-1/3 w-full border border-gray-300 rounded-lg dark:border-gray-600  shadow-md">
        <div className="flex h-full flex-col">
          <div className="flex-initial p-2 border-b border-gray-300 dark:border-gray-500 ">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-4 h-1 rounded-full bg-gray-800 animate-pulse" />
                <h1 className="text-lg font-semibold">Product Summary</h1>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold">The Object Information</h2>
            <p className="text-gray-500 dark:text-gray-400">
              This box summarizes product details using artificial intelligence. More details about the 3D object can be
              found here.
            </p>
          </div>
        </div>
      </div>
      <div className="h-4" />
    </>
  )
};

export default TreeJsSection;