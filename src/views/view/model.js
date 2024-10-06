


import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/addons/loaders/KTX2Loader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { EXRLoader } from "three/addons/loaders/EXRLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


//fileURL =Your model src
function VIewFn(wrapDom, fileURL) {
    let state = {"autoRotate":false,"background":false,"wireframe":false,"skeleton":false,"grid":false,"screenSpacePanning":true,"pointSize":1,"bgColor":"#191919","environment":"Neutral","toneMapping":1,"playbackSpeed":1,"actionStates":{},"camera":"[default]","punctualLights":true,"exposure":0,"ambientIntensity":0.3,"ambientColor":"#FFFFFF","directIntensity":2.5132741228718345,"directColor":"#FFFFFF"}

    const environments = [
{
  id: '',
  name: 'None',
  path: null,
},
{
  id: 'neutral', // THREE.RoomEnvironment
  name: 'Neutral',
  path: null,
},
{
  id: 'venice-sunset',
  name: 'Venice Sunset',
  path: 'https://storage.googleapis.com/donmccurdy-static/venice_sunset_1k.exr',
  format: '.exr',
},
{
  id: 'footprint-court',
  name: 'Footprint Court (HDR Labs)',
  path: 'https://storage.googleapis.com/donmccurdy-static/footprint_court_2k.exr',
  format: '.exr',
},
];

let cameraPosition=[5,2,5]
    let modelRef = {
        current: null
    };

    let skeletonHelpersRef = {
        current: []
    };

    let gridHelpersRef = {
        current: null,
    };


    let sceneRef = {
        current: null,
    };


    let controlsRef = {
        current: null,
    };

   let pmremGenerator = {
        current: null,
    };

    let neutralEnvironment = {
        current: null,
    };
    let axesHelperRef = {
        current: null,
    };

    let isDestroyed = false;

    // 场景
    const scene = new THREE.Scene();
    // 保存场景引用
    sceneRef.current = scene;

    // 获取 wrapDom 的实际宽高
    const width = wrapDom.clientWidth;
    const height = wrapDom.clientHeight;

    // 相机
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
    camera.position.set(cameraPosition[0], cameraPosition[1],cameraPosition[2]);

    // 渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;
     // 保存渲染器引用到场景中
    scene.userData.renderer = renderer;

    wrapDom.appendChild(renderer.domElement);

    // 轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = state.screenSpacePanning;
    controls.autoRotate = state.autoRotate;
    controlsRef.current = controls;

  // 创建 RoomEnvironment
  pmremGenerator.current = new THREE.PMREMGenerator(renderer);
  pmremGenerator.current.compileEquirectangularShader();
  neutralEnvironment.current = pmremGenerator.current.fromScene(new RoomEnvironment()).texture;

    // 更新函数
    function update() {
        if (isDestroyed) return;
        renderer.render(scene, camera);
        requestAnimationFrame(update);
        controls.update();

        if (state.autoRotate && modelRef.current) {
            modelRef.current.rotation.y += 0.01; // 调整这个值可以改变旋转速度
        }
    }
    update();

    // 窗口大小调整
    function resize() {
        const newWidth = wrapDom.clientWidth;
        const newHeight = wrapDom.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    }
    window.addEventListener("resize", resize);

    // 添加模型
    addModel();
    function addModel() {
        new GLTFLoader().load(
            fileURL,
            (gltf) => {
                const carModel = gltf.scene;

                scene.add(carModel);
                modelRef.current = carModel;
                // printGraph(carModel);
                // 保存原始材质
                saveOriginalMaterials(carModel);

                // 初始更新材质
                updateMaterials(carModel, state);

                // 骨架更新
                updateSkeletonHelpers(scene, modelRef.current, state.skeleton);


               //网格
               const size = 50;
              const divisions = 50;
              gridHelpersRef.current = new THREE.GridHelper(size, divisions);
              axesHelperRef.current = new THREE.AxesHelper( 10 );
              updateGridHelper(state.grid);

                //背景
                updateBackground(state.bgColor);


                    //Environment
                 updateEnvironment(state.environment);


                //模型中心
        const clips = gltf.animations || [];
        setContent(scene, clips);
            },
            (xhr) => {
                // 加载进度
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            (error) => {
                console.error("加载发生错误", error);
            }
        );
    }

    // 打印
    function printGraph(node) {
        console.group(" <" + node.type + "> " + node.name);
        node.children.forEach((child) => printGraph(child));
    }

//是否展示grid
function updateGridHelper(skeleton) {

  if (skeleton) {
    sceneRef.current.add(gridHelpersRef.current);
    sceneRef.current.add( axesHelperRef.current );
  } else {
    sceneRef.current.remove(gridHelpersRef.current);
    sceneRef.current.remove( axesHelperRef.current );
  }
}

    // 新增函数用于更新骨架辅助对象
    function updateSkeletonHelpers(scene, model, showSkeleton) {
        // 移除现有的骨架辅助对象
        skeletonHelpersRef.current.forEach(helper => {
            scene.remove(helper);
        });
        skeletonHelpersRef.current = [];

        if (showSkeleton && model) {
            model.traverse((node) => {
                if (node.type === 'SkinnedMesh') {
                    const helper = new THREE.SkeletonHelper(node.skeleton.bones[0].parent);
                    helper.material.linewidth = 3;
                    scene.add(helper);
                    skeletonHelpersRef.current.push(helper);
                }
            });
        }
    }

    //背景
function updateBackground(bgColor) {
  if (sceneRef.current) {
    if (!sceneRef.current.background) {
      sceneRef.current.background = new THREE.Color(bgColor);
    } else {
      sceneRef.current.background.set(bgColor);
    }
  }
}


  async function updateEnvironment(name) {
  let scene=sceneRef.current
  const environment = environments.find(e => e.name === name);
  let envMap;

  if (environment.id === 'neutral') {
    envMap = neutralEnvironment.current;
  } else if (environment.path) {
    envMap = await getCubeMapTexture(environment.path);
  } else {
    envMap = null;
  }

  if (envMap) {
    scene.environment = envMap;
    scene.background = state.background ? envMap : null;
  } else {
    scene.environment = null;
    scene.background = null;
  }

  traverseMaterials(scene, (material) => {
    if (material.isMeshStandardMaterial || material.isGLTFSpecularGlossinessMaterial) {
      material.envMap = envMap;
      material.needsUpdate = true;
    }
  });
}


async function getCubeMapTexture(path) {
  if (path.endsWith('.exr')) {
    const exrLoader = new EXRLoader();
    const texture = await exrLoader.loadAsync(path);
    const envMap = pmremGenerator.current.fromEquirectangular(texture).texture;
    texture.dispose();
    return envMap;
  } else {
    const texture = await new THREE.TextureLoader().loadAsync(path);
    const envMap = pmremGenerator.current.fromEquirectangular(texture).texture;
    texture.dispose();
    return envMap;
  }
}
function updateLights() {
  const scene = sceneRef.current;
  const renderer = scene?.userData?.renderer;
  if (!scene || !renderer) return;

  // 更新色调映射
  renderer.toneMapping = Number(state.toneMapping);
  renderer.toneMappingExposure = Math.pow(2, state.exposure);

  // 更新 RoomEnvironment 的曝光度
  if (neutralEnvironment.current) {
    neutralEnvironment.current.intensity = Math.pow(2, state.exposure);
  }

  // 更新环境光
  const ambientLight = scene.getObjectByName('AmbientLight');
  if (ambientLight) {
    ambientLight.intensity = state.ambientIntensity;
    ambientLight.color.set(state.ambientColor);
  }

  // 更新直射光
  const directionalLight = scene.getObjectByName('DirectionalLight');
  if (directionalLight) {
    directionalLight.intensity = state.directIntensity;
    directionalLight.color.set(state.directColor);
  }

  // 处理点光源的显示/隐藏
  scene.traverse((object) => {
    if (object.isLight && object.name !== 'AmbientLight' && object.name !== 'DirectionalLight') {
      object.visible = state.punctualLights;
    }
  });

  // 更新所有材质
  traverseMaterials(scene, (material) => {
    if (material.isMeshStandardMaterial || material.isGLTFSpecularGlossinessMaterial) {
      material.envMapIntensity = Math.pow(2, state.exposure);
      material.needsUpdate = true;
    }
  });
}

// 用于更新模型的位置和大小
  function setContent(object, clips) {
    object.updateMatrixWorld(); // donmccurdy/three-gltf-viewer#330

    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3()).length();
    const center = box.getCenter(new THREE.Vector3());

    controlsRef.current.reset();

    object.position.x -= center.x;
    object.position.y -= center.y;
    object.position.z -= center.z;

    controlsRef.current.maxDistance = size * 10;
  }

        // 返回一个销毁函数
return function destroy() {
  isDestroyed = true;
  
  // 移除事件监听器
  window.removeEventListener("resize", resize);
  
  // 销毁 Three.js 对象
  if (renderer) {
    renderer.dispose();
  }
  if (controls) {
    controls.dispose();
  }
  
  // 清空场景
  while(scene.children.length > 0) { 
    scene.remove(scene.children[0]); 
  }
  
  // 移除 canvas 元素
  if (wrapDom && renderer.domElement) {
    wrapDom.removeChild(renderer.domElement);
  }
  
  // 清空引用
  sceneRef.current = null;
  modelRef.current = null;
  controlsRef.current = null;
  pmremGenerator.current = null;
  neutralEnvironment.current = null;
  
  // 清空辅助对象数组
  skeletonHelpersRef.current = [];
  gridHelpersRef.current = null;
  axesHelperRef.current = null;
};

}
//////////函数外
function traverseMaterials(object, callback) {
    object.traverse((node) => {
        if (!node.isMesh) return;

        const materials = Array.isArray(node.material)
            ? node.material
            : [node.material];

        materials.forEach((material) => {
            callback(material);
        });
    });
}

// 在加载模型后调用这个函数来保存原始材质
function saveOriginalMaterials(model) {
    traverseMaterials(model, (material) => {
        if (!material.userData) material.userData = {};
        material.userData.originalProperties = {
            wireframe: material.wireframe,
            color: material.color.getHex(),
            emissive: material.emissive ? material.emissive.getHex() : null,
            // 添加其他你可能需要保存的属性
        };
    });
}

// 更新材质的函数
function updateMaterials(model, state) {
    traverseMaterials(model, (material) => {
        if (state.wireframe) {
            material.wireframe = true;
            // 可以在这里设置线框模式的其他属性，如颜色等
        } else {
            // 恢复原始属性
            if (material.userData && material.userData.originalProperties) {
                const original = material.userData.originalProperties;
                material.wireframe = original.wireframe;
                material.color.setHex(original.color);
                if (material.emissive && original.emissive !== null) {
                    material.emissive.setHex(original.emissive);
                }
                // 恢复其他保存的属性
            }
        }
        material.needsUpdate = true;
    });


}

export default VIewFn



