// 初始化图表
const ctx = document.getElementById('priceChart').getContext('2d');
let priceChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: '黄金价格',
            data: [],
            borderColor: '#e53935',
            tension: 0.3,
            pointRadius: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});

// 获取实时金价
async function fetchGoldPrice() {
    try {
        // 实际部署时替换为真实API地址
        const response = await fetch('https://api.example.com/gold-price');
        const data = await response.json();
        
        updateDisplay(data.price);
        updateChart(data.price);
        
    } catch (error) {
        // 使用模拟数据
        const mockPrice = 500 + Math.random() * 30;
        updateDisplay(mockPrice.toFixed(2));
        updateChart(mockPrice);
    }
}

// 更新显示
function updateDisplay(price) {
    document.getElementById('goldPrice').textContent = price;
    document.getElementById('updateTime').textContent = 
        new Date().toLocaleTimeString();
}

// 更新图表
function updateChart(price) {
    const now = new Date();
    const timeLabel = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    priceChart.data.labels.push(timeLabel);
    priceChart.data.datasets[0].data.push(price);
    
    if (priceChart.data.labels.length > 10) {
        priceChart.data.labels.shift();
        priceChart.data.datasets[0].data.shift();
    }
    
    priceChart.update();
}

// 初始化轮询
setInterval(fetchGoldPrice, 10000);
fetchGoldPrice(); // 首次加载