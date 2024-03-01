// 异常捕获hook
const catchError = (func: Function, msg: string) => {
    return new Promise(async(resolve, reject) => {
        try {
            let result = await func();

            resolve(result);

        } catch (err) {
            console.warn(`TypeError: ${msg} is error !`);
            console.warn(err);

            reject();
        } finally {

        }
    })
}

export default catchError;