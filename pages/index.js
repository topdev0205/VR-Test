import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Unity, { UnityContext } from "nextjs-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "unity_build/Build.loader.js",
  dataUrl: "unity_build/Build.data",
  frameworkUrl: "unity_build/Build.framework.js",
  codeUrl: "unity_build/Build.wasm",
});

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progression, setProgression] = useState(0);

  useEffect(() => {
    unityContext.on("loaded", function () {
      setIsLoaded(true);
    });

    unityContext.on("progress", function (progression) {
      setProgression(progression);
    });
  }, []);

  return (
    <div style={{width: '100%', height: '100vh'}}>
      <div className="vr-loading" style={{ display: isLoaded ? "none" : "block" }}>Loading {(progression * 100).toFixed(2)}%...</div>
      <Unity 
        style={{width: '100%', height: '100vh', display: 'block'}} 
        unityContext={unityContext} 
      />
    </div>
  )
}
