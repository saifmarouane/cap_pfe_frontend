'use client';

import React, { useEffect, useRef, useState } from 'react';
 

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'; // Assurez-vous d'avoir le bon loader

 

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import useSWR from 'swr';
import Button from '@/shortcodes/Button';
import { RiRefreshLine } from 'react-icons/ri';
import { RiSlideshow2Line } from "react-icons/ri";


const TreeJsSection: React.FC = () => {
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null); // Ajoutez cette ligne
  const containerRef = useRef<HTMLDivElement>(null);

  
 


  const [summaryData, setSummaryData] = useState(null);







  const mountRef = useRef<HTMLDivElement>(null);
  let scene: THREE.Scene | null = null;
  let renderer: THREE.WebGLRenderer | null = null;










  useEffect(() => {
    const loadModel = async () => {
      // Charger le fichier STL
      const loader = new STLLoader();
      loader.load(
        'http://localhost:8000/generate_step_file/',
        function (geometry) {
          // Créer un matériau
          const material = new THREE.MeshPhongMaterial({
            color: 0x00FF00, // Green color
            specular: 0x111111,
            shininess: 200,
          });

          // Créer un maillage
          const mesh = new THREE.Mesh(geometry, material);
          mesh.scale.set(0.15, 0.15, 0.15);

          // Créer une scène si elle n'a pas encore été créée
          if (!scene) {
            scene = new THREE.Scene();
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // White light with 50% intensity
            scene.add(ambientLight);
          }

          // Ajouter le maillage à la scène
          scene.add(mesh);

          // Créer une caméra si elle n'a pas encore été créée
          const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
          if (!camera.position.z) {
            camera.position.z = 5;
          }

          // Créer un rendu WebGL si elle n'a pas encore été créée
          if (!renderer) {
            renderer = new THREE.WebGLRenderer({ alpha: true });
            renderer.setSize(200,200)
            renderer.setClearColor(0x000000, 0.2); // Transparent background
          }

          if (!containerRef.current) return;
          containerRef.current.appendChild(renderer.domElement);

          // Ajouter une lumière
          const light = new THREE.PointLight(0xffffff, 0.5);
          camera.add(light);
          scene.add(camera);

          // Animation de la scène
          const animate = function () {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
          };

          animate(); // Appeler animate une seule fois après le chargement du modèle
        },
        // Optional: onProgress callback
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        // Optional: onError callback
        function (error) {
          console.error('An error occurred while loading the STL file.', error);
        }
      );
    };

    loadModel();
  }, []);


  





  const downloadFile = async () => {
    try {
      const response = await fetch('http://localhost:8000/generate_step_file/', {
        method: 'GET',
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'text-to-cad-output.step';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to download file');
      }
    } catch (error) {
      console.error('Error while downloading file:', error);
    }
  };

  
  const summary = async (e: React.FormEvent) => {

    e.preventDefault();
  
    try {
      const userId = Cookies.get('user');
      const session = Cookies.get('session');
      console.log(userId)
      console.log(session)
      const response = await axios.get("http://localhost:8000/summary/", {
        params: {
            user: userId,
            session: session
        }
    });
      setSummaryData(response.data);  // Store the response data in state
      downloadFile();
      console.log('Success:', response.data);  // Handle the response as needed
    } catch (error) {
      console.error('Error posting summary:', error);
      // Optionally, handle different types of errors (e.g., network error, server error)
    }
  };

  return (
    <>
      <div className=" p-1 h-1/2 w-full  border border-gray-300 rounded-lg dark:border-gray-600 shadow-md">
        <div className="flex h-full flex-col">
          <div className="flex-initial p-2  border-gray-00 dark:border-gray-500  ">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-4 h-1 rounded-full bg-gray-800 animate-pulse" />
                <h1 className="text-lg font-semibold">Design concept</h1>
                <button onClick={summary} className=" flex animate-pulse  text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300 motion-safe:animate-bounce">
      générer <RiSlideshow2Line />
    </button>
                <span className="sr-only">Actualiser</span>
                </div>
              </div>
            </div>
             <div ref={containerRef} />

        </div>
      </div>
      <div className="mt-2 p-1 h-1/2 w-full border border-gray-300 rounded-lg dark:border-gray-600  shadow-md">
        <div className="flex h-full flex-col">
          <div className="flex-initial p-2 border-b border-gray-300 dark:border-gray-500 ">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-4 h-1 rounded-full bg-gray-800 animate-pulse" />
                <h1 className="text-lg font-semibold">Product Summary</h1>
              </div>
            </div>
          </div>
          <div className="p-4 ">
            <h2 className="text-lg font-semibold">The Object Information</h2>
            <p className="text-gray-500 dark:text-gray-400">
              This box summarizes product details using artificial intelligence. More details about the 3D object can be
              found here.
              <br />
              {JSON.stringify(summaryData)}

            </p>
          </div>
        </div>
      </div>
      <div className="h-4" />
    </>
  )
};

export default TreeJsSection;