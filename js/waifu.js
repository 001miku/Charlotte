// Live2D 配置和初始化
window.live2d_path = "https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget/";

// 全局变量
let messageTimer;
let waifuTips;

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

class WaifuTips {
    constructor() {
        this.dragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.init();
        
        // 确保看板娘不会消失
        this.checkVisibility();
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
            this.waifu.style.cssText = 'position:fixed;right:0;bottom:0;width:300px;height:300px;cursor:pointer;user-select:none;z-index:10001;transition:opacity 0.5s;opacity:1;display:block;background:none;';
            container.appendChild(this.waifu);
            
            // 如果没有找到tips，创建一个
            if (!this.tips) {
                this.tips = document.createElement('div');
                this.tips.className = 'waifu-tips';
                this.tips.style.cssText = 'position:absolute;top:-40px;left:20px;padding:5px 10px;width:260px;height:auto;min-height:30px;line-height:20px;text-align:center;font-size:12px;color:#333;background-color:rgba(236,217,188,0.9);border:1px solid rgba(224,186,140,0.62);border-radius:12px;opacity:0;transition:opacity 0.3s;z-index:10002;display:block;visibility:visible;';
                this.waifu.appendChild(this.tips);
            }
            
            // 如果没有找到live2d，创建一个
            if (!this.live2d) {
                this.live2d = document.createElement('canvas');
                this.live2d.id = 'live2d';
                this.live2d.width = 300;
                this.live2d.height = 300;
                this.live2d.style.cssText = 'position:relative;width:300px;height:300px;cursor:pointer;z-index:10001;background:none;';
                this.waifu.appendChild(this.live2d);
            }
        }
        
        // 设置固定定位在右下角
        this.waifu.style.position = 'fixed';
        this.waifu.style.right = '0px';
        this.waifu.style.bottom = '0px';
        this.waifu.style.left = 'auto';
        this.waifu.style.top = 'auto';
        this.waifu.style.zIndex = '10001';
        
        // 添加过渡效果
        this.waifu.style.transition = 'all 0.3s ease-in-out';
    }

    initTips() {
        // 移除鼠标跟随旋转功能
    }

    initDrag() {
        // 移除拖动功能
    }

    initInteraction() {
        // 鼠标进入事件
        this.waifu.addEventListener('mouseenter', () => {
            this.showRandomMessage('touch');
        });

        // 鼠标离开事件
        this.waifu.addEventListener('mouseleave', () => {
            this.showRandomMessage('default');
        });

        // 点击事件
        this.waifu.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const rect = this.live2d.getBoundingClientRect();
            const y = e.clientY - rect.top;
            
            if (y < rect.height * 0.3) {
                this.showMessage('哎呀！头部不要乱摸啦！', 3000);
            } else if (y < rect.height * 0.6) {
                this.showMessage('那里不可以碰！', 3000);
            } else {
                this.showMessage('呀！好痒呀！', 3000);
            }
            
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
        
        // 确保气泡显示在正确位置
        this.tips.style.display = 'block';
        this.tips.style.visibility = 'visible';
        this.tips.style.top = '-70px'; // 调整气泡位置
        this.tips.style.left = '10px';
        this.tips.style.zIndex = '10002';
        
        messageTimer = setTimeout(() => {
            this.tips.style.opacity = '0';
            this.tips.classList.remove('waifu-tips-active');
        }, timeout);
    }

    showRandomMessage(type) {
        const messageList = messages[type] || messages.default;
        const message = messageList[Math.floor(Math.random() * messageList.length)];
        this.showMessage(message, 6000);
    }

    // 检查看板娘是否可见
    checkVisibility() {
        setInterval(() => {
            if (this.waifu) {
                if (this.waifu.style.display === 'none') {
                    this.waifu.style.display = 'block';
                }
                if (this.waifu.style.opacity !== '1') {
                    this.waifu.style.opacity = '1';
                }
                if (this.tips && this.tips.classList.contains('waifu-tips-active') && this.tips.style.opacity !== '1') {
                    this.tips.style.opacity = '1';
                }
            }
        }, 500);  // 更频繁地检查
    }
}

// 欢迎消息
function welcomeMessage() {
    if (!waifuTips) return;  // 如果waifuTips实例还没创建，直接返回
    
    let text;
    if (location.pathname === "/") { // 如果是主页
        const now = new Date().getHours();
        if (now > 5 && now <= 7) text = "早上好！一日之计在于晨，美好的一天就要开始了。";
        else if (now > 7 && now <= 11) text = "上午好！工作顺利嘛，不要久坐，多起来走动走动哦！";
        else if (now > 11 && now <= 13) text = "中午了，工作了一个上午，现在是午餐时间！";
        else if (now > 13 && now <= 17) text = "午后很容易犯困呢，今天的运动目标完成了吗？";
        else if (now > 17 && now <= 19) text = "傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红～";
        else if (now > 19 && now <= 21) text = "晚上好，今天过得怎么样？";
        else if (now > 21 && now <= 23) text = ["已经这么晚了呀，早点休息吧，晚安～", "深夜时要爱护眼睛呀！"];
        else text = "你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？";
    } else if (document.referrer !== "") {
        const referrer = new URL(document.referrer),
            domain = referrer.hostname.split(".")[1];
        if (location.hostname === referrer.hostname) text = `欢迎阅读<span>「${document.title.split(" - ")[0]}」</span>`;
        else if (domain === "baidu") text = `Hello！来自 百度搜索 的朋友<br>你是搜索 <span>${referrer.search.split("&wd=")[1].split("&")[0]}</span> 找到的我吗？`;
        else if (domain === "so") text = `Hello！来自 360搜索 的朋友<br>你是搜索 <span>${referrer.search.split("&q=")[1].split("&")[0]}</span> 找到的我吗？`;
        else if (domain === "google") text = `Hello！来自 谷歌搜索 的朋友<br>欢迎阅读<span>「${document.title.split(" - ")[0]}」</span>`;
        else text = `Hello！来自 <span>${referrer.hostname}</span> 的朋友`;
    } else {
        text = `欢迎阅读<span>「${document.title.split(" - ")[0]}」</span>`;
    }
    
    // 使用waifuTips实例的showMessage方法
    waifuTips.showMessage(text, 7000);
}

// 初始化Live2D
function initLive2D() {
    try {
        // 先创建DOM结构
        createWaifuDom();
        
        // 如果L2Dwidget存在，则初始化
        if (typeof L2Dwidget !== 'undefined') {
            L2Dwidget.init({
                model: {
                    jsonPath: 'https://unpkg.com/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json',
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
                    hide: true  // 默认隐藏菜单栏
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
                setTimeout(welcomeMessage, 1000);
            }
        }, 1000);
        
    } catch (error) {
        console.error('初始化Live2D失败:', error);
        // 出错时也要创建交互实例
        setTimeout(() => {
            waifuTips = new WaifuTips();
        }, 1000);
    }
}

// 创建看板娘DOM结构
function createWaifuDom() {
    // 检查是否已存在
    if (document.getElementById('live2d-widget')) return;
    
    const waifuContainer = document.createElement('div');
    waifuContainer.id = 'live2d-widget';
    waifuContainer.style.cssText = 'position:fixed;right:0;bottom:0;width:300px;height:300px;z-index:10000;pointer-events:auto;';
    document.body.appendChild(waifuContainer);

    const waifu = document.createElement('div');
    waifu.className = 'waifu';
    waifu.style.cssText = 'position:fixed;right:0;bottom:0;width:300px;height:300px;cursor:pointer;user-select:none;z-index:10001;transition:opacity 0.5s;opacity:1;display:block;background:none;';
    waifuContainer.appendChild(waifu);

    const waifuTipsElement = document.createElement('div');
    waifuTipsElement.className = 'waifu-tips';
    waifuTipsElement.style.cssText = 'position:absolute;top:-70px;left:10px;padding:5px 10px;width:260px;height:auto;min-height:30px;line-height:20px;text-align:center;font-size:12px;color:#333;background-color:rgba(236,217,188,0.9);border:1px solid rgba(224,186,140,0.62);border-radius:12px;opacity:0;transition:opacity 0.3s;z-index:10002;display:block;visibility:visible;';
    waifu.appendChild(waifuTipsElement);

    const canvas = document.createElement('canvas');
    canvas.id = 'live2d';
    canvas.width = 300;
    canvas.height = 300;
    canvas.style.cssText = 'position:relative;width:300px;height:300px;cursor:pointer;z-index:10001;background:none;';
    waifu.appendChild(canvas);
}

// 等待页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化Live2D
    initLive2D();
}); 