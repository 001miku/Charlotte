/**
 * Live2D看板娘修复脚本
 * 用于解决Live2D加载问题和页面遮罩问题
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Live2D修复脚本加载');
    
    // 修复黑色遮罩问题
    fixBlackOverlay();
    
    // 检查并创建waifu元素
    createWaifuElements();
    
    // 延迟初始化Live2D
    setTimeout(initLive2DManually, 1000);
});

// 修复黑色遮罩问题
function fixBlackOverlay() {
    // 找到并隐藏可能的遮罩元素
    const overlayElements = ['#etext'];
    
    overlayElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element && window.getComputedStyle(element).opacity !== '0') {
            console.log('隐藏遮罩元素:', selector);
            element.style.opacity = '0';
            setTimeout(() => {
                element.style.display = 'none';
            }, 500);
        }
    });
}

// 检查并创建waifu元素
function createWaifuElements() {
    // 检查是否已存在waifu元素
    if (!document.querySelector('.waifu')) {
        console.log('创建waifu元素');
        
        // 创建waifu容器
        const waifu = document.createElement('div');
        waifu.className = 'waifu';
        
        // 创建waifu提示
        const waifuTips = document.createElement('div');
        waifuTips.className = 'waifu-tips';
        waifuTips.innerHTML = '欢迎来到我的小窝~';
        
        // 创建waifu画布
        const waifuCanvas = document.createElement('canvas');
        waifuCanvas.id = 'live2d';
        waifuCanvas.width = 300;
        waifuCanvas.height = 300;
        
        // 组装waifu元素
        waifu.appendChild(waifuTips);
        waifu.appendChild(waifuCanvas);
        document.body.appendChild(waifu);
        
        // 添加waifu样式
        const waifuStyle = document.createElement('style');
        waifuStyle.innerHTML = `
            .waifu {
                position: fixed;
                right: 0;
                bottom: 0;
                z-index: 999;
                transition: all .3s ease-in-out;
                transform-origin: right bottom;
            }
            .waifu-tips {
                position: absolute;
                top: -70px;
                left: 10px;
                padding: 5px 10px;
                width: 220px;
                min-height: 50px;
                color: #fff;
                background-color: rgba(50, 50, 50, 0.7);
                box-sizing: border-box;
                border-radius: 12px;
                z-index: 10002;
                font-size: 14px;
                text-overflow: ellipsis;
                overflow: hidden;
                animation-delay: 5s;
                animation-duration: 50s;
                animation-iteration-count: infinite;
                animation-name: shake;
                animation-timing-function: ease-in-out;
            }
            @keyframes shake {
                2% { transform: translate(0.5px, -1.5px) rotate(-0.5deg); }
                4% { transform: translate(0.5px, 1.5px) rotate(1.5deg); }
                6% { transform: translate(1.5px, 1.5px) rotate(1.5deg); }
                8% { transform: translate(2.5px, 1.5px) rotate(0.5deg); }
                10% { transform: translate(0.5px, 2.5px) rotate(0.5deg); }
                12% { transform: translate(1.5px, 1.5px) rotate(0.5deg); }
                14% { transform: translate(0.5px, 0.5px) rotate(0.5deg); }
                16% { transform: translate(-1.5px, -0.5px) rotate(1.5deg); }
                18% { transform: translate(0.5px, 0.5px) rotate(1.5deg); }
                20% { transform: translate(2.5px, 2.5px) rotate(1.5deg); }
                22% { transform: translate(0.5px, -1.5px) rotate(1.5deg); }
                24% { transform: translate(-1.5px, 1.5px) rotate(-0.5deg); }
                26% { transform: translate(1.5px, 0.5px) rotate(1.5deg); }
                28% { transform: translate(-0.5px, -0.5px) rotate(-0.5deg); }
                30% { transform: translate(1.5px, -0.5px) rotate(-0.5deg); }
                32% { transform: translate(2.5px, -1.5px) rotate(1.5deg); }
                34% { transform: translate(2.5px, 2.5px) rotate(-0.5deg); }
                36% { transform: translate(0.5px, -1.5px) rotate(0.5deg); }
                38% { transform: translate(2.5px, -0.5px) rotate(-0.5deg); }
                40% { transform: translate(-0.5px, 2.5px) rotate(0.5deg); }
                42% { transform: translate(-1.5px, 2.5px) rotate(0.5deg); }
                44% { transform: translate(-1.5px, 1.5px) rotate(0.5deg); }
                46% { transform: translate(1.5px, -0.5px) rotate(-0.5deg); }
                48% { transform: translate(2.5px, -0.5px) rotate(0.5deg); }
                50% { transform: translate(-1.5px, 1.5px) rotate(0.5deg); }
                52% { transform: translate(-0.5px, 1.5px) rotate(0.5deg); }
                54% { transform: translate(-1.5px, 1.5px) rotate(0.5deg); }
                56% { transform: translate(0.5px, 2.5px) rotate(1.5deg); }
                58% { transform: translate(2.5px, 2.5px) rotate(0.5deg); }
                60% { transform: translate(2.5px, -1.5px) rotate(1.5deg); }
                62% { transform: translate(-1.5px, 0.5px) rotate(1.5deg); }
                64% { transform: translate(-1.5px, 1.5px) rotate(1.5deg); }
                66% { transform: translate(0.5px, 2.5px) rotate(1.5deg); }
                68% { transform: translate(2.5px, -1.5px) rotate(1.5deg); }
                70% { transform: translate(2.5px, 2.5px) rotate(0.5deg); }
                72% { transform: translate(-0.5px, -1.5px) rotate(1.5deg); }
                74% { transform: translate(-1.5px, 2.5px) rotate(1.5deg); }
                76% { transform: translate(-1.5px, 2.5px) rotate(1.5deg); }
                78% { transform: translate(-1.5px, 2.5px) rotate(0.5deg); }
                80% { transform: translate(-1.5px, 0.5px) rotate(-0.5deg); }
                82% { transform: translate(-1.5px, 0.5px) rotate(-0.5deg); }
                84% { transform: translate(-0.5px, 0.5px) rotate(1.5deg); }
                86% { transform: translate(2.5px, 1.5px) rotate(0.5deg); }
                88% { transform: translate(-1.5px, 0.5px) rotate(1.5deg); }
                90% { transform: translate(-1.5px, -0.5px) rotate(-0.5deg); }
                92% { transform: translate(-1.5px, -1.5px) rotate(1.5deg); }
                94% { transform: translate(0.5px, 0.5px) rotate(-0.5deg); }
                96% { transform: translate(2.5px, -0.5px) rotate(-0.5deg); }
                98% { transform: translate(-1.5px, -1.5px) rotate(-0.5deg); }
                0%, 100% { transform: translate(0, 0) rotate(0); }
            }
        `;
        document.head.appendChild(waifuStyle);
    }
}

// 手动初始化Live2D
function initLive2DManually() {
    // 检查L2Dwidget是否可用
    if (typeof L2Dwidget !== 'undefined') {
        console.log('开始手动初始化Live2D');
        
        try {
            // 初始化Live2D
            L2Dwidget.init({
                model: {
                    jsonPath: 'https://unpkg.com/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json',
                    scale: 1.0
                },
                display: {
                    position: 'right',
                    width: 300,
                    height: 400,
                    hOffset: 0,
                    vOffset: -70
                },
                mobile: {
                    show: true,
                    scale: 0.8
                },
                react: {
                    opacityDefault: 1,
                    opacityOnHover: 1
                },
                dialog: {
                    enable: true,
                    script: {
                        'tap body': '哎呀！别碰我！',
                        'tap face': '人家在认真工作啦！',
                        'tap clothes': '要好好学习哦！'
                    }
                },
                // 确保工具栏功能被禁用
                tool: {
                    enable: false
                }
            });
            console.log('Live2D初始化成功');
            
            // 显示waifu元素
            const waifu = document.querySelector('.waifu');
            if (waifu) {
                waifu.style.display = 'block';
                waifu.style.right = '0'; // 确保显示在右侧
                waifu.style.bottom = '0'; // 确保显示在底部
            }
        } catch (error) {
            console.error('Live2D初始化失败:', error);
            // 5秒后重试
            setTimeout(initLive2DManually, 5000);
        }
    } else {
        console.warn('L2Dwidget未加载，尝试加载相关脚本');
        
        // 加载必要的脚本
        loadScript('https://cdn.jsdelivr.net/npm/live2d-widget@3.1.4/lib/L2Dwidget.min.js')
            .then(() => loadScript('https://cdn.jsdelivr.net/npm/live2d-widget@3.1.4/lib/L2Dwidget.0.min.js'))
            .then(() => {
                console.log('Live2D脚本加载成功，5秒后初始化');
                setTimeout(initLive2DManually, 5000);
            })
            .catch(error => {
                console.error('Live2D脚本加载失败:', error);
                // 尝试使用备用CDN
                loadScript('https://fastly.jsdelivr.net/npm/live2d-widget@3.1.4/lib/L2Dwidget.min.js')
                    .then(() => loadScript('https://fastly.jsdelivr.net/npm/live2d-widget@3.1.4/lib/L2Dwidget.0.min.js'))
                    .then(() => {
                        console.log('备用Live2D脚本加载成功，5秒后初始化');
                        setTimeout(initLive2DManually, 5000);
                    })
                    .catch(err => {
                        console.error('备用Live2D脚本加载失败:', err);
                    });
            });
    }
}

// 加载脚本工具函数
function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`脚本加载失败: ${url}`));
        
        document.body.appendChild(script);
    });
}

// 每隔5秒检查一次Live2D状态
setInterval(() => {
    // 检查Live2D画布是否可见
    const live2d = document.getElementById('live2d');
    if (live2d && !live2d.getContext) {
        console.log('检测到Live2D画布不可用，尝试重新初始化');
        createWaifuElements();
        initLive2DManually();
    }
    
    // 检查waifu元素是否显示
    const waifu = document.querySelector('.waifu');
    if (waifu && window.getComputedStyle(waifu).display === 'none') {
        console.log('检测到waifu元素被隐藏，尝试显示');
        waifu.style.display = 'block';
        waifu.style.right = '0'; // 确保显示在右侧
        waifu.style.bottom = '0'; // 确保显示在底部
    }
    
    // 检查并隐藏工具栏
    const toolBar = document.querySelector('.waifu-tool');
    if (toolBar) {
        toolBar.style.display = 'none';
    }
    
    // 再次修复黑色遮罩问题
    fixBlackOverlay();
}, 3000); 