// Live2D 配置和初始化
window.live2d_path = "https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget/";

// 全局变量
let messageTimer = null;
let waifuTips = null;

// 对话内容配置
const messages = {
    // 普通消息
    default: [
        "好久不见，日子过得好快呢……",
        "大坏蛋！你都多久没理人家了呀，嘤嘤嘤～",
        "嗨～快来逗我玩吧！",
        "拿小拳拳锤你胸口！",
        "记得把小家加入收藏夹哦！",
        "我是不是你最可爱的小助手呀~",
        "主人好，我是你的贴心小助理~",
        "你知道吗？你可以用鼠标拖动我哦~"
    ],
    
    // 触摸消息
    touch: [
        "我们来玩个游戏吧！",
        "哎呀！你这个坏蛋，不要乱点啦！",
        "再摸的话我可要报警了！⌇●﹏●⌇",
        "110吗，这里有个变态一直在摸我(ó﹏ò｡)",
        "不要动手动脚的！快把手拿开~~",
        "真…真的是不知羞耻！",
        "Hentai！"
    ],
    
    // 晚安消息
    night: [
        "已经这么晚了呀，早点休息吧，晚安～",
        "深夜时要爱护眼睛呀！",
        "你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？",
        "晚安~ 好梦~",
        "睡个好觉，明天继续开心哦~"
    ],
    
    // 问候消息
    welcome: [
        "欢迎来到我的小窝~",
        "任何事情都不要太勉强自己哦~",
        "今天也要元气满满哦~",
        "快来逗我玩吧！",
        "我有好多有趣的事想和你分享呢~"
    ]
};

// 动作配置
const motions = {
    idle: ['idle', 'idle2', 'idle3'],
    happy: ['happy', 'happy2'],
    angry: ['angry', 'angry2'],
    sad: ['sad', 'sad2'],
    surprised: ['surprised', 'surprised2'],
    normal: ['normal', 'normal2']
};

// Waifu类
class WaifuTips {
    constructor() {
        this.init();
    }

    init() {
        try {
            this.initWaifu();
            this.initTips();
            this.initInteraction();
            this.showMessage('欢迎来到我的小窝~', 6000);
        } catch (error) {
            console.error('初始化看板娘失败:', error);
        }
    }

    initWaifu() {
        // 尝试多种选择器确保能找到元素
        this.waifu = document.querySelector('.waifu') || document.querySelector('#waifu');
        this.live2d = document.querySelector('#live2d');
        this.tips = document.querySelector('.waifu-tips');

        if (!this.waifu) {
            console.warn('找不到.waifu元素，尝试创建');
            
            // 尝试获取容器
            const container = document.getElementById('live2d-widget');
            if (!container) {
                throw new Error('找不到live2d-widget容器');
            }
            
            // 如果没有找到waifu，创建一个
            this.waifu = document.createElement('div');
            this.waifu.className = 'waifu';
            this.waifu.style.cssText = 'position:fixed;right:0;bottom:0;width:300px;height:300px;cursor:pointer;user-select:none;z-index:10001;opacity:1;display:block;background:none;';
            container.appendChild(this.waifu);
            
            // 如果没有找到tips，创建一个
            if (!this.tips) {
                this.tips = document.createElement('div');
                this.tips.className = 'waifu-tips';
                this.tips.style.cssText = 'position:absolute;top:-70px;left:10px;padding:5px 10px;width:260px;text-align:center;opacity:0;z-index:10002;';
                this.waifu.appendChild(this.tips);
            }
            
            // 如果没有找到live2d，创建一个
            if (!this.live2d) {
                this.live2d = document.createElement('canvas');
                this.live2d.id = 'live2d';
                this.live2d.width = 300;
                this.live2d.height = 300;
                this.live2d.style.cssText = 'position:relative;width:300px;height:300px;';
                this.waifu.appendChild(this.live2d);
            }
        }
    }

    initTips() {
        if (!this.tips) return;
        this.tips.innerHTML = '';
    }

    initInteraction() {
        // 确保元素存在
        if (!this.waifu) return;
        
        this.waifu.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // 随机消息
            const messages = [
                '是…是想要摸摸吗？',
                '别戳我，好痒！',
                '喜欢我吗？',
                '你在干什么呀？',
                '再摸我就报警了！'
            ];
            this.showMessage(messages[Math.floor(Math.random() * messages.length)], 4000);
            return false;
        });
    }

    showMessage(text, timeout = 4000) {
        if (!text || !this.tips) return;
        
        if (messageTimer) {
            clearTimeout(messageTimer);
            messageTimer = null;
        }

        this.tips.innerHTML = text;
        this.tips.style.opacity = '1';
        this.tips.classList.add('waifu-tips-active');
        this.tips.style.display = 'block';
        this.tips.style.visibility = 'visible';
        
        messageTimer = setTimeout(() => {
            this.tips.style.opacity = '0';
            this.tips.classList.remove('waifu-tips-active');
        }, timeout);
    }

    checkVisibility() {
        if (this.waifu && this.waifu.style.display === 'none') {
            this.waifu.style.display = 'block';
        }
    }
}

// 创建DOM结构
function createWaifuDom() {
    if (document.getElementById('live2d-widget')) return;
    
    const waifuContainer = document.createElement('div');
    waifuContainer.id = 'live2d-widget';
    waifuContainer.style.cssText = 'position:fixed;right:0;bottom:0;width:300px;height:300px;z-index:10000;';
    document.body.appendChild(waifuContainer);

    const waifu = document.createElement('div');
    waifu.className = 'waifu';
    waifu.style.cssText = 'position:fixed;right:0;bottom:0;width:300px;height:300px;cursor:pointer;z-index:10001;';
    waifuContainer.appendChild(waifu);

    const waifuTipsElement = document.createElement('div');
    waifuTipsElement.className = 'waifu-tips';
    waifuTipsElement.style.cssText = 'position:absolute;top:-70px;left:10px;padding:5px 10px;width:260px;text-align:center;opacity:0;z-index:10002;';
    waifu.appendChild(waifuTipsElement);

    const canvas = document.createElement('canvas');
    canvas.id = 'live2d';
    canvas.width = 300;
    canvas.height = 300;
    canvas.style.cssText = 'position:relative;width:300px;height:300px;';
    waifu.appendChild(canvas);
}

// 初始化Live2D
function initLive2D() {
    try {
        createWaifuDom();
        
        // 如果L2Dwidget存在，则初始化
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
            // 使用本地图片代替Live2D模型
            const canvas = document.getElementById('live2d');
            if (canvas) {
                canvas.style.background = "url('./img/waifu.png') no-repeat center/contain";
            }
        }
        
        // 创建交互实例
        setTimeout(() => {
            if (!waifuTips) {
                waifuTips = new WaifuTips();
            }
        }, 1000);
        
    } catch (error) {
        console.error('初始化Live2D失败:', error);
    }
}

// 欢迎消息
function welcomeMessage() {
    if (waifuTips) {
        waifuTips.showMessage('欢迎来到我的博客~', 6000);
    }
}

// 当页面加载完成时初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLive2D);
} else {
    initLive2D();
} 