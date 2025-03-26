/**
 * 千里之行逐字显示动画效果
 * 背景图片加载完成后在屏幕中央逐字显示"千里之行，始于足下"
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('千里之行逐字显示脚本加载');
    
    // 等待图片加载完成
    window.addEventListener('load', function() {
        // 延迟显示，确保背景图片已经显示
        setTimeout(createTypingAnimation, 1000);
    });
});

// 创建打字动画
function createTypingAnimation() {
    // 检查是否已存在动画容器
    if (document.getElementById('typing-container')) {
        return;
    }
    
    console.log('创建千里之行逐字显示动画');
    
    // 创建动画容器
    const typingContainer = document.createElement('div');
    typingContainer.id = 'typing-container';
    
    // 创建文字容器
    const typingText = document.createElement('div');
    typingText.id = 'typing-text';
    
    // 组装元素
    typingContainer.appendChild(typingText);
    document.body.appendChild(typingContainer);
    
    // 添加样式
    const typingStyle = document.createElement('style');
    typingStyle.innerHTML = `
        #typing-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 9999;
        }
        
        #typing-text {
            color: white;
            font-size: 36px;
            font-weight: bold;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
            letter-spacing: 5px;
        }
        
        @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; visibility: hidden; }
        }
    `;
    document.head.appendChild(typingStyle);
    
    // 开始打字动画
    startTyping();
}

// 逐字显示动画
function startTyping() {
    const text = "千里之行，始于足下";
    const typingText = document.getElementById('typing-text');
    const typingContainer = document.getElementById('typing-container');
    
    let i = 0;
    typingText.innerHTML = '';
    
    // 逐字显示
    const typingInterval = setInterval(function() {
        if (i < text.length) {
            typingText.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            
            // 显示完成后等待3秒，然后淡出
            setTimeout(function() {
                typingContainer.style.animation = 'fadeOut 2s forwards';
                
                // 动画结束后移除元素
                setTimeout(function() {
                    if (document.body.contains(typingContainer)) {
                        document.body.removeChild(typingContainer);
                    }
                }, 2000);
            }, 3000);
        }
    }, 300); // 每个字符之间的延迟时间
}

// 当页面加载完成后再次检查是否需要显示动画
window.addEventListener('load', function() {
    // 检查页面是否已经加载并且没有显示过动画
    if (!document.getElementById('typing-container') && !sessionStorage.getItem('typingAnimationShown')) {
        // 标记动画已显示
        sessionStorage.setItem('typingAnimationShown', 'true');
        // 创建动画
        setTimeout(createTypingAnimation, 1500);
    }
}); 