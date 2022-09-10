const COS = require('cos-nodejs-sdk-v5');

const cos = new COS({
  SecretId: '你的SecretId',
  SecretKey: '你的SecretKey',
});

/**
 * cos文件上传
 * @param key
 * @param body
 * @param size
 * @returns
 */
export function cosUpload(key, body, size): Promise<string> {
  return new Promise((resolve) => {
    cos.putObject(
      {
        Bucket: '你的Bucket名称',
        Region: 'ap-nanjing',
        Key: key,
        onProgress: function (progressData) {
          console.log(JSON.stringify(progressData));
        },
        Body: body,
        ContentLength: size,
      },
      async (err, data) => {
        if (err) {
          throw new Error('上传失败');
        } else {
          resolve(data.Location);
        }
      },
    );
  });
}

/**
 * 字节转换
 * @param bytes
 * @returns
 */
export function byteConvert(bytes: number): string {
  if (isNaN(bytes)) {
    return '';
  }
  const symbols = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let exp = Math.floor(Math.log(bytes) / Math.log(2));
  const biteIndex = Math.floor(exp / 10);
  if (exp < 1) {
    exp = 0;
  }
  bytes = bytes / Math.pow(2, 10 * biteIndex);
  let r;
  if (bytes.toString().length > bytes.toFixed(2).toString().length) {
    r = bytes.toFixed(1);
  }
  return r + symbols[biteIndex];
}

/**
 * 获取文件类型
 * @param name
 * @returns
 */
export function getFileType(name: string): string {
  return name.split('.').pop();
}
