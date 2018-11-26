# FishNodeEcharts [![GitHub issues](https://img.shields.io/github/issues/Pimaweichai/FishNodeEcharts.svg)](https://github.com/Pimaweichai/FishNodeEcharts/issues)[![GitHub forks](https://img.shields.io/github/forks/Pimaweichai/FishNodeEcharts.svg)](https://github.com/Pimaweichai/FishNodeEcharts/network[![GitHub stars](https://img.shields.io/github/stars/Pimaweichai/FishNodeEcharts.svg)](https://github.com/Pimaweichai/FishNodeEcharts/stargazers)[![GitHub license](https://img.shields.io/github/license/Pimaweichai/FishNodeEcharts.svg)](https://github.com/Pimaweichai/FishNodeEcharts/blob/master/LICENSE)

Create echarts on server side by node
### How to instal

OS | Command
----- | -----
OS X | `brew install pkg-config cairo pango libpng jpeg giflib`
Ubuntu | `sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++`
Fedora | `sudo yum install cairo cairo-devel cairomm-devel libjpeg-turbo-devel pango pango-devel pangomm pangomm-devel giflib-devel`
Solaris | `pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto`
Windows | [Instructions on our wiki](https://github.com/Automattic/node-canvas/wiki/Installation---Windows)

```
npm install fish-node-echarts
```
### ENV
#####node
version > 8.x

### How to use

```
@param config = {
    width: 500 // image width, it is not required, the default will be 500 
    height: 500 // image height,it is not required, default will be 500 
    option: {}, //it is required, echarts configuration
    path:'', // the filepath where the image which will be created. it is not required, if it is not provided, the function will not generate the file but return an image buffer.
}
```


#####1.  require the module
```
const genEchart = require('fish-node-echarts');
```
#####2. define an echart option(you can check the [echarts](http://www.echartsjs.com/option.html) ducument):
```
const option = {
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
};

```
#### 3. Generate the echart image file or buffer:
##### (1) generate the image buffer:
##### promise
```
genEchart({
    width:500,
    height:500,
    option,
    path:'./test.jpg'
}).then(filename =>{
	//get the echart image filename
});

```

##### async 
```
let filename = await genEchart({
    width:500,
    height:500,
    option,
    path:'./test.jpg'
});

```
##### (2) generate the image buffer:
##### promise
```
genEchart({
    width:500,
    height:500,
    option
}).then(buffer=>{
	//get the echart image buffer
});

```

##### async 
```
let buffer = await genEchart({
    width:500,
    height:500,
    option
});

```







