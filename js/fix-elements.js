// 修复页面元素
document.addEventListener('DOMContentLoaded', function() {
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
    
    if (!document.getElementById('etext')) {
        const etext = document.createElement('div');
        etext.id = 'etext';
        etext.innerHTML = '友利奈绪爱小陈';
        document.body.appendChild(etext);
        
        // 入场动画
        setTimeout(() => {
            etext.style.opacity = '0';
            setTimeout(() => {
                etext.style.display = 'none';
            }, 1000);
        }, 2000);
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
        L2Dwidget.init({
            model: {
                jsonPath: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json',
                scale: 0.8
            },
            display: {
                position: 'right',
                width: 300,
                height: 300,
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
                enable: true,
                hide: true
            }
        });
    } else {
        console.warn('L2Dwidget未加载，使用简易模式');
        setTimeout(initializeLive2D, 1000); // 尝试再次初始化
    }
} 