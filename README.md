# three_viewr 主要用three模型查看，保存当前状态
  <a href="#">
    <img src="https://github.com/actinm/Three_View/blob/main/public/three_view.png" height="100">
  </a>
  <h1><a href="#">three_viewr</a></h1>

  <h1><a target="_blank"  href="https://three-view.vercel.app/#/home">domo</a></h1>


## 功能概述

这段代码实现了以下功能：
1. 加载3D模型（GLTF格式）
2. 分析模型的尺寸和位置
3. 自动调整模型位置，确保底部对齐到(0,0,0)点
4. 根据模型大小自动调整相机位置和控制器

## 主要函数

### addModel()

这是加载和处理3D模型的主要函数。

#### 功能：
- 使用GLTFLoader加载模型
- 计算模型的包围盒（Bounding Box）
- 判断模型原点位置（中心或底部）
- 如需要，调整模型位置使底部对齐(0,0,0)
- 将模型添加到场景
- 更新相机和控制器位置

#### 关键步骤：
1. 创建包围盒并计算模型尺寸
2. 获取模型中心点
3. 判断原点位置并调整模型位置
4. 添加模型到场景
5. 调用updateCameraAndControls()更新视图

### updateCameraAndControls(size, center)

这个函数用于根据模型的大小和位置来调整相机和控制器。

#### 参数：
- `size`: Vector3，模型的尺寸
- `center`: Vector3，模型的中心点

#### 功能：
- 计算合适的相机距离，确保整个模型可见
- 设置相机位置和朝向
- 更新控制器的目标点

## 关键代码解释
