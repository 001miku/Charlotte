/**
 * 图片加载优化脚本
 * 确保所有关键图片都能正确加载
 */

document.addEventListener('DOMContentLoaded', function() {
    // 关键图片列表
    const criticalImages = [
        { id: 'bgImage', path: 'img/bgs.png', selector: '#ebg' },
        { id: 'logoImage', path: 'img/cnm.sb.svg', selector: '.nav01_logo img' },
        { id: 'teamImage1', path: 'img/cnmteam01.png', selector: '.exnav03_team img:nth-child(1)' },
        { id: 'teamImage2', path: 'img/cnmteam02.png', selector: '.exnav03_team img:nth-child(2)' },
        { id: 'teamImage3', path: 'img/cnmteam03.png', selector: '.exnav03_team img:nth-child(3)' },
        { id: 'teamImage4', path: 'img/cnmteam04.png', selector: '.exnav03_team img:nth-child(4)' },
        { id: 'teamImage5', path: 'img/cnmteam05.png', selector: '.exnav03_team img:nth-child(5)' }
    ];

    // 预加载关键图片
    criticalImages.forEach(imageInfo => {
        const img = new Image();
        img.onload = function() {
            const elements = document.querySelectorAll(imageInfo.selector);
            elements.forEach(el => {
                if (el.tagName === 'IMG') {
                    el.src = imageInfo.path;
                } else {
                    el.style.backgroundImage = `url('${imageInfo.path}')`;
                }
            });
        };
        img.onerror = function() {
            console.warn(`无法加载图片: ${imageInfo.path}, 尝试应用备用图片...`);
            // 图片加载失败时的处理逻辑
            const elements = document.querySelectorAll(imageInfo.selector);
            elements.forEach(el => {
                if (el.tagName === 'IMG') {
                    // 设置一个备用图片或占位符
                    el.src = 'img/placeholder.png';
                } else {
                    // 对于背景图片，可以设置纯色背景
                    el.style.backgroundColor = '#333';
                }
            });
        };
        img.src = imageInfo.path;
    });

    // 强制设置背景图片
    setTimeout(() => {
        const ebg = document.getElementById('ebg');
        if (ebg) {
            ebg.style.backgroundImage = "url('img/bgs.png')";
            ebg.style.backgroundSize = 'cover';
            ebg.style.backgroundPosition = 'center';
            ebg.style.opacity = '1';
        }

        // 显示所有的图片元素
        document.querySelectorAll('img').forEach(img => {
            if (!img.src || img.src.indexOf('api.') > -1) {
                // 如果是API随机图片或者未设置src，替换成本地图片
                if (img.parentNode && (img.parentNode.className.indexOf('nav05_zp') > -1 || 
                                     img.parentNode.className.indexOf('exnav05_centent_mb') > -1)) {
                    img.src = 'img/placeholder.png';
                    img.style.display = 'block';
                }
            }
        });
    }, 500);
}); 