let fs     = require('fs');
let path   = require('path');
let echarts = require("echarts");
let {createCanvas,registerFont} = require("canvas");

echarts.setCanvasCreator(createCanvas);

fs.readdirSync(path.join(__dirname,"./fonts"))
  .filter(file=>/\.ttf/.test(file))
    .forEach(file=>{
        let fileNames = file.split('.ttf');
        registerFont(
            path.join(__dirname,`./fonts/${file}`),
            {
                family:fileNames[0]||''``
            }
        )
    })

/**
 * @param config = {
        width: 500 // Image width, type is number.
        height: 500 // Image height, type is number.
        option: {}, // Echarts configuration, type is Object.
        //If the path  is not set, return the Buffer of image.
        path:  '', // Path is filepath of the image which will be created.
    }
 *
*/

module.exports = async (config) => {
    try{
        let { width,height,option,path:imgPath } = config;
        if(!option) throw new Error('缺少option参数');
        width = parseInt(width) || 500;
        height = parseInt(height) || 500;
        let canvas = createCanvas(width,height);
        let ctx = canvas.getContext('2d');
        ctx.font = config.font||'12px "微软雅黑"';
        let chart = echarts.init(canvas);
        option.animation = false;
        chart.setOption(option);
        if (imgPath) {
            return new Promise((resolved)=>{
                const out = fs.createWriteStream(imgPath);
                const stream = canvas.createJPEGStream({
                    quality: 95,
                    chromaSubsampling: false
                });
                stream.pipe(out);
                out.on('finish',()=>resolved(imgPath))
            });
        } else {
            return canvas.toBuffer();
        }
    }catch(e){
        console.log(e);
        return null;
    }
}
