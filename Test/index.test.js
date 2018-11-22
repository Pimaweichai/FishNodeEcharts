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
            title: {
                text: '测试'
            },
            tooltip: {},
            legend: {
                data:['test']
            },
            xAxis: {
                data: ["a","b","c","d","f","g"]
            },
            yAxis: {},
            series: [{
                name: 'test',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
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
