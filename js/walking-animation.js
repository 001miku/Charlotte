/**
 * 千里之行动画效果
 * 实现一个走路的小人动画效果
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('千里之行动画脚本加载');
    
    // 创建动画容器
    createWalkingAnimation();
    
    // 初始化动画
    setTimeout(initWalkingAnimation, 1000);
});

// 创建走路动画容器
function createWalkingAnimation() {
    // 检查是否已存在走路动画容器
    if (!document.querySelector('#walking-container')) {
        console.log('创建千里之行动画容器');
        
        // 创建动画容器
        const walkingContainer = document.createElement('div');
        walkingContainer.id = 'walking-container';
        
        // 创建小人元素
        const walker = document.createElement('div');
        walker.id = 'walker';
        
        // 创建文字元素
        const walkingText = document.createElement('div');
        walkingText.id = 'walking-text';
        walkingText.innerHTML = '千里之行，始于足下';
        
        // 组装动画元素
        walkingContainer.appendChild(walker);
        walkingContainer.appendChild(walkingText);
        document.body.appendChild(walkingContainer);
    }
}

// 初始化走路动画
function initWalkingAnimation() {
    const walker = document.getElementById('walker');
    const walkingText = document.getElementById('walking-text');
    
    if (walker && walkingText) {
        // 显示文字
        walkingText.style.opacity = '1';
        
        // 添加脚印效果
        walker.addEventListener('animationiteration', () => {
            // 每次动画迭代时创建多个脚印
            createFootprints();
        });
        
        // 立即创建一些脚印
        createFootprints();
        
        // 定期切换文字
        let quotes = [
            '千里之行，始于足下',
            '不积跬步，无以至千里',
            '志不强者智不达',
            '合抱之木，生于毫末',
            '水滴石穿，非一日之功'
        ];
        
        let currentQuote = 0;
        setInterval(() => {
            currentQuote = (currentQuote + 1) % quotes.length;
            walkingText.innerHTML = quotes[currentQuote];
            
            // 文字变化时添加简单的动画效果
            walkingText.style.animation = 'none';
            walkingText.offsetHeight; // 触发重绘
            walkingText.style.animation = 'textChange 0.5s ease';
        }, 5000);
        
        // 添加CSS动画
        if (!document.querySelector('#walking-animation-keyframes')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'walking-animation-keyframes';
            styleSheet.textContent = `
                @keyframes textChange {
                    0% { transform: translateX(-50%) translateY(0); opacity: 0.7; }
                    50% { transform: translateX(-50%) translateY(-5px); opacity: 1; }
                    100% { transform: translateX(-50%) translateY(0); opacity: 0.9; }
                }
            `;
            document.head.appendChild(styleSheet);
        }
    } else {
        console.warn('走路动画元素不存在，5秒后重试');
        setTimeout(initWalkingAnimation, 5000);
    }
}

// 创建多个脚印效果
function createFootprints() {
    // 获取当前小人位置
    const walker = document.getElementById('walker');
    if (!walker) return;
    
    // 计算位置（小人当前位置）
    const rect = walker.getBoundingClientRect();
    const walkerLeft = rect.left + window.scrollX;
    
    // 创建3-5个脚印，间隔一定距离
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createSingleFootprint(walkerLeft - i * 20);
        }, i * 150);
    }
}

// 创建单个脚印
function createSingleFootprint(leftPosition) {
    // 创建脚印元素
    const footprint = document.createElement('div');
    footprint.className = 'footprint';
    
    // 随机调整一些位置，使脚印看起来更自然
    const randomOffset = Math.random() * 5 - 2.5;
    
    // 设置脚印位置
    footprint.style.left = (leftPosition + randomOffset) + 'px';
    
    // 添加到容器
    document.body.appendChild(footprint);
    
    // 动画结束后移除脚印
    setTimeout(() => {
        if (document.body.contains(footprint)) {
            document.body.removeChild(footprint);
        }
    }, 2000);
}

// 每隔一段时间检查动画是否正常
setInterval(() => {
    // 检查动画容器是否存在
    const walkingContainer = document.getElementById('walking-container');
    if (!walkingContainer) {
        console.log('千里之行动画容器不存在，重新创建');
        createWalkingAnimation();
        initWalkingAnimation();
    }
    
    // 检查文字是否显示
    const walkingText = document.getElementById('walking-text');
    if (walkingText && walkingText.style.opacity !== '1') {
        console.log('千里之行文字未显示，重新显示');
        walkingText.style.opacity = '1';
    }
    
    // 创建脚印效果，增加走路感
    createFootprints();
}, 10000); 