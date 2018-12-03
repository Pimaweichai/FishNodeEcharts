const {expect} = require('chai');
const genEchart = require('../index.js');
const path = require('path');
const fs = require('fs');

describe('FishNodeEcharts:',()=>{
    let config = {
        fontSize:24,
        width:300,
        height:300,
        quality:100,
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
        },
        pathname:'./Test'
    };
    describe('#genPNGFile',()=>{
        config.type = 'png';
        config.filename  = 'test.png'
        let filepath = path.join(__dirname,config.pathname,config.filename);
        try{
            fs.unlinkSync(filepath);
        }catch(e){};
        it('should generate the image file',async ()=>{
            let result = await genEchart(config);
            expect(result,filepath);
            expect(fs.existsSync(filepath),true);
        });
    });
    describe('#genJPGFile',()=>{
        config.type = 'jpg';
        config.filename  = 'test.jpg'
        let filepath = path.join(__dirname,config.pathname,config.filename);
        try{
            fs.unlinkSync(filepath);
        }catch(e){};
        it('should generate the image file',async ()=>{
            let result = await genEchart(config);
            expect(result,filepath);
            expect(fs.existsSync(filepath),true);
        });
    });
    describe('#genImageBuffer',()=>{
        it('should generate the image buffer',async ()=>{
            config.type = 'png';
            config.filename  = 'test.png'
            let filepath = path.join(__dirname,config.pathname,config.filename);
            config.filename = null;
            let buffer = await genEchart(config);
            expect(Buffer.isBuffer(buffer),true);
            try{
                let imageBuffer = fs.readFileSync(filepath);
                expect(buffer.length,imageBuffer.length);
            }catch(e){};
        })
    })
})
