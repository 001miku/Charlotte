// 修复页面元素
document.addEventListener('DOMContentLoaded', function() {
    // 添加CDN备份机制
    setupCdnBackup();
    
    // 确保背景元素存在
    if (!document.getElementById('ebg')) {
        const ebg = document.createElement('div');
        ebg.id = 'ebg';
        document.body.appendChild(ebg);
    }
    
    if (!document.getElementById('ebga')) {
        const ebga = document.createElement('div');
        ebga.id = 'ebga';
        document.body.appendChild(ebga);
    }
    
    if (!document.getElementById('xuna')) {
        const xuna = document.createElement('div');
        xuna.id = 'xuna';
        document.body.appendChild(xuna);
    }
    
    // 确保背景图片正确加载
    const ebg = document.getElementById('ebg');
    if (ebg) {
        ebg.style.backgroundImage = "url('img/bgs.png')";
        ebg.style.backgroundSize = 'cover';
        ebg.style.backgroundPosition = 'center';
        ebg.style.opacity = '1';
    }
    
    // 加载雪花效果
    loadSnowEffect();
    
    // 初始化Live2D
    initializeLive2D();
});

// 设置CDN备份机制
function setupCdnBackup() {
    // CDN加载超时时间（毫秒）
    const CDN_TIMEOUT = 3000;
    
    // Live2D模型CDN列表
    const live2dCdnUrls = [
        'https://unpkg.com/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json',
        'https://cdn.jsdelivr.net/npm/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json',
        'https://fastly.jsdelivr.net/npm/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json'
    ];
    
    // Live2D库CDN列表
    const live2dLibCdnUrls = [
        'https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js',
        'https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js',
        'https://unpkg.com/live2d-widget/autoload.js'
    ];
    
    // 测试CDN是否可用
    window.testedModelCdns = [];
    window.testedLibCdns = [];
    
    // 测试模型CDN
    live2dCdnUrls.forEach(url => {
        const img = new Image();
        img.onload = function() {
            window.testedModelCdns.push(url);
        };
        img.onerror = function() {
            console.warn(`CDN不可用: ${url}`);
        };
        img.src = url.replace('koharu.model.json', 'koharu.1024/texture_00.png');
        
        // 设置超时
        setTimeout(() => {
            if (img.complete === false) {
                img.src = '';
                console.warn(`CDN超时: ${url}`);
            }
        }, CDN_TIMEOUT);
    });
    
    // 测试库CDN
    live2dLibCdnUrls.forEach(url => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        
        let loaded = false;
        script.onload = function() {
            loaded = true;
            window.testedLibCdns.push(url);
            document.body.removeChild(script);
        };
        script.onerror = function() {
            console.warn(`CDN库不可用: ${url}`);
            document.body.removeChild(script);
        };
        
        document.body.appendChild(script);
        
        // 设置超时
        setTimeout(() => {
            if (!loaded) {
                console.warn(`CDN库超时: ${url}`);
                if (document.body.contains(script)) {
                    document.body.removeChild(script);
                }
            }
        }, CDN_TIMEOUT);
    });
}

// 加载雪花效果
function loadSnowEffect() {
    const xuna = document.getElementById('xuna');
    if (!xuna) return;
    
    // 创建雪花
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.cssText = `
            position: absolute;
            color: #fff;
            font-size: ${Math.random() * 20 + 10}px;
            opacity: ${Math.random()};
            top: -20px;
            left: ${Math.random() * 100}%;
            animation: snowfall ${Math.random() * 5 + 5}s linear infinite;
        `;
        snowflake.innerHTML = '❄';
        xuna.appendChild(snowflake);
    }
    
    // 添加动画样式
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes snowfall {
            0% {
                transform: translateY(0) rotate(0deg);
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// 初始化Live2D
function initializeLive2D() {
    if (typeof L2Dwidget !== 'undefined') {
        // 选择最佳CDN
        let bestModelCdn = 'https://unpkg.com/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json';
        if (window.testedModelCdns && window.testedModelCdns.length > 0) {
            bestModelCdn = window.testedModelCdns[0];
        }
        
        L2Dwidget.init({
            model: {
                jsonPath: bestModelCdn,
                scale: 0.8
            },
            display: {
                position: 'right',
                width: 250,
                height: 320,
                hOffset: 0,
                vOffset: 0
            },
            mobile: {
                show: true,
                scale: 0.6
            },
            react: {
                opacityDefault: 1,
                opacityOnHover: 1
            },
            name: {
                canvas: 'live2d',
                div: 'live2d-widget'
            },
            dialog: {
                enable: true,
                script: {
                    'tap body': '哎呀！别碰我！',
                    'tap face': '人家在认真工作啦！',
                    'tap clothes': '要好好学习哦！'
                }
            },
            tool: {
                enable: false
            }
        });
        console.log('Live2D初始化成功，使用CDN: ' + bestModelCdn);
        
        // 设置waifu元素位置
        const waifu = document.querySelector('.waifu');
        if (waifu) {
            waifu.style.right = '0';
            waifu.style.bottom = '90px';
        }
    } else {
        console.warn('L2Dwidget未加载，5秒后重试');
        // 检查Live2D脚本是否存在，如果不存在则添加
        if (!document.querySelector('script[src*="live2d"]')) {
            const script = document.createElement('script');
            
            // 选择最佳CDN
            let bestLibCdn = 'https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js';
            if (window.testedLibCdns && window.testedLibCdns.length > 0) {
                bestLibCdn = window.testedLibCdns[0];
            }
            
            script.src = bestLibCdn;
            document.body.appendChild(script);
            console.log('已添加Live2D脚本: ' + bestLibCdn);
        }
        
        setTimeout(initializeLive2D, 5000); // 延长重试时间
    }
} 