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
    let {
        width,
        height,
        option,
        pathname=path.join(__dirname,'./'),
        filename,
        type='png',
        fontSize=12
    } = config;
    if(!option) throw new Error('缺少option参数');
    width = parseInt(width) || 500;
    height = parseInt(height) || 500;
    let canvas = createCanvas(width,height);
    let ctx = canvas.getContext('2d');
    ctx.font =fontSize+'px "微软雅黑"';
    ctx.quality = 'bilinear';
    let chart = echarts.init(canvas,null);
    option.animation = false;
    chart.setOption(option);
    if (filename) {
        let filepath = path.join(__dirname,pathname,filename);
        const out = fs.createWriteStream(filepath);
        if(type=='png'||type=='PNG'){
            return new Promise((resolved,reject)=>{
                const stream = canvas.createPNGStream({compressionLevel: 0});
                stream.pipe(out);
                out.on('finish',()=>resolved(filepath));
                out.on('error',()=>reject());
            });
        } else if(type=='jpg'||type=='JPG'||type=='jpeg'||type=='JPEG'){
            return new Promise((resolved,reject)=>{
                const stream = canvas.createJPEGStream({
                    quality:1,
                    progressive: false,
                    chromaSubsampling: true
                });
                stream.pipe(out);
                out.on('finish',()=>resolved(filepath));
                out.on('error',()=>reject());
            });
        } else{
            return null;
        }
    }
    else {
        return canvas.toBuffer();
    }
}
