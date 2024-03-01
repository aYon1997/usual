let arr: any[] = [];

for (let index = 0; index < 60; index++) {
    let count = index + 1;
    arr.push({
        index: count,
        name: '机器人' + count,
        type: '智能型' + count,
        version: '1.0' + count,
        hobby: '扫地' + count
    });
}

export default arr;