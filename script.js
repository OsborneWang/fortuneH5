// 生肖数组
const zodiacAnimals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

// 星座信息
const constellations = [
    { name: '水瓶座', start: [1, 20], end: [2, 18] },
    { name: '双鱼座', start: [2, 19], end: [3, 20] },
    { name: '白羊座', start: [3, 21], end: [4, 19] },
    { name: '金牛座', start: [4, 20], end: [5, 20] },
    { name: '双子座', start: [5, 21], end: [6, 21] },
    { name: '巨蟹座', start: [6, 22], end: [7, 22] },
    { name: '狮子座', start: [7, 23], end: [8, 22] },
    { name: '处女座', start: [8, 23], end: [9, 22] },
    { name: '天秤座', start: [9, 23], end: [10, 23] },
    { name: '天蝎座', start: [10, 24], end: [11, 22] },
    { name: '射手座', start: [11, 23], end: [12, 21] },
    { name: '摩羯座', start: [12, 22], end: [1, 19] }
];

// 时运描述模板
const luckDescriptions = {
    excellent: [
        '近期您将迎来事业上的重要突破，贵人相助，机遇不断。',
        '运势如日中天，各方面发展顺利，是行动的好时机。',
        '天时地利人和，您的努力将得到丰厚回报。'
    ],
    good: [
        '整体运势平稳向上，小有收获，保持积极心态。',
        '虽然偶有小波折，但总体趋势良好，值得期待。',
        '运势稳中有升，适合规划未来，稳步前进。'
    ],
    average: [
        '运势平稳，需要更多耐心和努力才能有所突破。',
        '近期运势一般，建议稳扎稳打，避免冒进。',
        '保持现状，等待更好的时机到来。'
    ],
    poor: [
        '近期可能遇到一些挑战，需要谨慎应对，保持冷静。',
        '运势稍有波动，建议保守行事，避免重大决策。',
        '困难是暂时的，保持信心，坚持就是胜利。'
    ]
};

// 财运描述模板
const wealthDescriptions = {
    excellent: [
        '财运亨通，正财偏财皆有收获，投资理财需谨慎但可适当尝试。',
        '财源广进，收入有望增加，但要注意合理规划支出。',
        '财运旺盛，适合进行财务规划，可能会有意外之喜。'
    ],
    good: [
        '财运稳定，收入正常，建议做好储蓄和理财规划。',
        '财运平稳上升，小有进账，保持理性消费。',
        '财务状况良好，适合进行小额投资或理财。'
    ],
    average: [
        '财运一般，收支平衡，需要精打细算，避免不必要的开支。',
        '财务状况平稳，建议保守理财，不要冒险投资。',
        '财运平平，保持现状，等待更好的机会。'
    ],
    poor: [
        '近期财运较为紧张，需要控制支出，避免冲动消费。',
        '财务状况需要谨慎管理，建议减少不必要的开支。',
        '财运低迷，保持耐心，等待转机。'
    ]
};

// 简单的哈希函数，用于生成稳定的随机数
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // 转换为32位整数
    }
    return Math.abs(hash);
}

// 根据输入信息生成稳定的随机数（0-1之间）
function getStableRandom(seed) {
    const hash = simpleHash(seed);
    // 使用当前日期（只精确到天）和用户信息生成种子
    const today = new Date();
    const dateSeed = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const combinedSeed = seed + dateSeed;
    const combinedHash = simpleHash(combinedSeed);
    // 转换为0-1之间的浮点数
    return (combinedHash % 10000) / 10000;
}

// 计算生肖
function calculateZodiac(year) {
    // 生肖从1900年（鼠年）开始循环
    const baseYear = 1900;
    const index = (year - baseYear) % 12;
    return zodiacAnimals[index];
}

// 计算星座
function calculateConstellation(month, day) {
    for (let i = 0; i < constellations.length; i++) {
        const constellation = constellations[i];
        const [startMonth, startDay] = constellation.start;
        const [endMonth, endDay] = constellation.end;

        // 处理跨年的情况（摩羯座：12月22日 - 1月19日）
        if (startMonth > endMonth) {
            // 跨年星座：从12月到1月
            if ((month === startMonth && day >= startDay) || 
                (month === endMonth && day <= endDay)) {
                return constellation.name;
            }
        } else {
            // 正常情况：同一年内
            if (month === startMonth && day >= startDay) {
                return constellation.name;
            }
            if (month === endMonth && day <= endDay) {
                return constellation.name;
            }
            if (month > startMonth && month < endMonth) {
                return constellation.name;
            }
        }
    }
    return '未知';
}

// 预测时运
function predictLuck(name, gender, zodiac, constellation, birthYear, birthMonth) {
    // 使用用户信息生成种子
    const seed = `${name}-${gender}-${zodiac}-${constellation}-${birthYear}-${birthMonth}`;
    const random = getStableRandom(seed);
    
    // 根据随机数确定时运等级
    let level, percentage, description;
    if (random >= 0.75) {
        level = 'excellent';
        percentage = 85 + Math.floor((random - 0.75) * 60); // 85-100
        const descs = luckDescriptions.excellent;
        description = descs[Math.floor(random * descs.length)];
    } else if (random >= 0.5) {
        level = 'good';
        percentage = 65 + Math.floor((random - 0.5) * 80); // 65-85
        const descs = luckDescriptions.good;
        description = descs[Math.floor(random * descs.length)];
    } else if (random >= 0.25) {
        level = 'average';
        percentage = 45 + Math.floor((random - 0.25) * 80); // 45-65
        const descs = luckDescriptions.average;
        description = descs[Math.floor(random * descs.length)];
    } else {
        level = 'poor';
        percentage = 25 + Math.floor(random * 80); // 25-45
        const descs = luckDescriptions.poor;
        description = descs[Math.floor(random * descs.length)];
    }
    
    // 根据生肖和星座微调
    const zodiacBonus = simpleHash(zodiac) % 10 - 5; // -5 到 5
    const constellationBonus = simpleHash(constellation) % 10 - 5;
    percentage = Math.max(20, Math.min(100, percentage + zodiacBonus + constellationBonus));
    
    return {
        percentage: Math.round(percentage),
        description: description,
        level: level
    };
}

// 预测财运
function predictWealth(name, gender, zodiac, constellation, birthYear, birthMonth) {
    // 使用不同的种子确保时运和财运有差异但都稳定
    const seed = `${name}-${gender}-${zodiac}-${constellation}-${birthYear}-${birthMonth}-wealth`;
    const random = getStableRandom(seed);
    
    let level, percentage, description;
    if (random >= 0.75) {
        level = 'excellent';
        percentage = 85 + Math.floor((random - 0.75) * 60);
        const descs = wealthDescriptions.excellent;
        description = descs[Math.floor(random * descs.length)];
    } else if (random >= 0.5) {
        level = 'good';
        percentage = 65 + Math.floor((random - 0.5) * 80);
        const descs = wealthDescriptions.good;
        description = descs[Math.floor(random * descs.length)];
    } else if (random >= 0.25) {
        level = 'average';
        percentage = 45 + Math.floor((random - 0.25) * 80);
        const descs = wealthDescriptions.average;
        description = descs[Math.floor(random * descs.length)];
    } else {
        level = 'poor';
        percentage = 25 + Math.floor(random * 80);
        const descs = wealthDescriptions.poor;
        description = descs[Math.floor(random * descs.length)];
    }
    
    // 根据生肖和星座微调
    const zodiacBonus = simpleHash(zodiac + 'wealth') % 10 - 5;
    const constellationBonus = simpleHash(constellation + 'wealth') % 10 - 5;
    percentage = Math.max(20, Math.min(100, percentage + zodiacBonus + constellationBonus));
    
    return {
        percentage: Math.round(percentage),
        description: description,
        level: level
    };
}

// 获取时运等级文本
function getLevelText(percentage) {
    if (percentage >= 80) return '极佳';
    if (percentage >= 65) return '良好';
    if (percentage >= 45) return '一般';
    return '需注意';
}

// 处理表单提交
document.getElementById('fortuneForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const birthdate = document.getElementById('birthdate').value;
    
    if (!name || !gender || !birthdate) {
        alert('请填写完整信息');
        return;
    }
    
    // 解析出生年月
    const [year, month] = birthdate.split('-').map(Number);
    const day = 15; // 默认使用月中，因为只有年月信息
    
    // 计算生肖和星座
    const zodiac = calculateZodiac(year);
    const constellation = calculateConstellation(month, day);
    
    // 预测时运和财运
    const luckResult = predictLuck(name, gender, zodiac, constellation, year, month);
    const wealthResult = predictWealth(name, gender, zodiac, constellation, year, month);
    
    // 显示结果
    document.getElementById('resultName').textContent = name;
    document.getElementById('resultGender').textContent = gender === 'male' ? '男' : '女';
    document.getElementById('resultZodiac').textContent = zodiac;
    document.getElementById('resultConstellation').textContent = constellation;
    
    // 显示时运
    const luckLevelEl = document.getElementById('luckLevel');
    const luckTextEl = document.getElementById('luckText');
    const luckDescEl = document.getElementById('luckDesc');
    
    luckLevelEl.style.width = luckResult.percentage + '%';
    luckTextEl.textContent = getLevelText(luckResult.percentage);
    luckDescEl.textContent = luckResult.description;
    
    // 显示财运
    const wealthLevelEl = document.getElementById('wealthLevel');
    const wealthTextEl = document.getElementById('wealthText');
    const wealthDescEl = document.getElementById('wealthDesc');
    
    wealthLevelEl.style.width = wealthResult.percentage + '%';
    wealthTextEl.textContent = getLevelText(wealthResult.percentage);
    wealthDescEl.textContent = wealthResult.description;
    
    // 显示结果区域
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('fortuneForm').classList.add('hidden');
    
    // 滚动到结果区域
    document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// 重置表单
function resetForm() {
    document.getElementById('fortuneForm').reset();
    document.getElementById('result').classList.add('hidden');
    document.getElementById('fortuneForm').classList.remove('hidden');
    document.getElementById('fortuneForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

