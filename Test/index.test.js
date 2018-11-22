const {should,expect,assert} = require('chai');
const genEchart = require('../index.js');
const path = require('path');
const fs = require('fs');

describe('FishNodeEcharts:',()=>{
    let defaultConfig = {
        font:'12px 微软雅黑',
        width:300,
        height:300,
        option:{
            backgroundColor:'#fff',
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        }
    };
    let pathname=path.join(__dirname,`./test.jpg`)
    describe('#genImageFile',()=>{
        try{
            fs.unlinkSync(pathname);
        }catch(e){};
        let config = {...defaultConfig,path:pathname};
        it('should generate the image file',async ()=>{
            let result = await genEchart(config);
            expect(result,pathname);
            expect(fs.existsSync(pathname),true);
        });
    });
    describe('#genImageBuffer',()=>{
        it('should generate the image buffer',async ()=>{
            let buffer = await genEchart(defaultConfig);
            expect(Buffer.isBuffer(buffer),true);
            try{
                let imageBuffer = fs.readFileSync(pathname);
                expect(buffer.length,imageBuffer.length);
            }catch(e){};
        })
    })
})
