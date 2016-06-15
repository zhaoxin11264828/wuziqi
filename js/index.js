$(function(){
	var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var canvasS = 600;
    var row = 15;
    var blocks = canvasS/row;
    $('#canvas').get(0).width = canvasS;
    $('#canvas').get(0).height = canvasS;
 
    var drow = function(){
    	var jiangge = blocks/2+0.5;

    	// 横线
    	ctx.save();
    	ctx.beginPath();
    	ctx.translate(jiangge,jiangge);
    	for(var i = 0;i<row;i++){
    		ctx.moveTo(0,0);
    	    ctx.lineTo(canvasS-blocks,0);
    	    ctx.translate(0,blocks);
    	}
    	
    	ctx.stroke();
    	ctx.closePath();
    	ctx.restore();

    	// 竖线
    	ctx.save();
    	ctx.beginPath();
    	ctx.translate(jiangge,jiangge);
    	for(var i = 0;i<row;i++){
    		ctx.moveTo(0,0);
    	    ctx.lineTo(0,canvasS-blocks);
    	    ctx.translate(blocks,0);
    	}
    	
    	ctx.stroke();
    	ctx.closePath();
    	ctx.restore();

    	// 坐标点
    	
    	var points = [3.5*blocks+0.5,11.5*blocks+0.5];
    	for(var i = 0;i<2;i++){
    		for(var j = 0;j<2;j++){
    			ctx.save();
    			ctx.beginPath();
    			ctx.translate(points[i],points[j]);
               
               ctx.moveTo(0,0);
               ctx.arc(0,0,5,0,Math.PI/180*360);
               ctx.fill();
               ctx.closePath();
               ctx.restore();

    		}
    	}
    	

    	ctx.save();
    	ctx.beginPath();
    	ctx.translate(7.5*blocks+0.5,7.5*blocks+0.5);
    	ctx.moveTo(0,0);
    	ctx.arc(0,0,5,0,Math.PI/180*360);
    	ctx.fill();
    	ctx.closePath();
    	ctx.restore();
    }
drow();
     var qizi={x:0,y:2,color:'0',dep:1}; 
     var r = 15;
     var kaiguan = true;
     var drop = function(qizi,r){
        ctx.save();
    	ctx.beginPath();
    	if(kaiguan==true){
    		ctx.fillStyle='black';
    		kaiguan = false;
    	}else{
    		ctx.fillStyle='#fff';
    		kaiguan = true;
    	}
    	
    	ctx.translate(qizi.x*blocks+20.5,qizi.y*blocks+20.5);
    	ctx.moveTo(0,0);
    	ctx.arc(0,0,r,0,Math.PI/180*360);
    	ctx.fill();
    	ctx.closePath();
    	ctx.restore();
     }

     var heng,shu,zuoxie,youxie;
     var panduan = function(qizi){
     	 heng=1,shu=1,zuoxie=1,youxie=1;
     	shuju={};
     	$.each(jilu,function(k,v){
         	if(v.color===qizi.color){
         		shuju[k] = v;
         	}
         })
       
     	// 竖向判断
        var tx,ty;
        tx = qizi.x;
        ty = qizi.y;
        while(shuju[tx+'-'+(ty-1)]){
        	shu++;ty--;
        }
        tx = qizi.x;
        ty = qizi.y;
         while(shuju[tx+'-'+(ty+1)]){
        	shu++;ty++;
        }
        // 横向
        while(shuju[(tx-1)+'-'+ty]){
        	heng++;tx--;
        }
        tx = qizi.x;
        ty = qizi.y;
         while(shuju[(tx+1)+'-'+ty]){
        	heng++;tx++;
        }
        // 右斜
        while(shuju[(tx+1)+'-'+(ty-1)]){
        	youxie++;tx++;ty--;
        }
        tx = qizi.x;
        ty = qizi.y;
         while(shuju[(tx-1)+'-'+(ty+1)]){
        	youxie++;tx--;ty++;
        }

        // 左斜
        while(shuju[(tx-1)+'-'+(ty-1)]){
        	zuoxie++;tx--;ty--;
        }
        tx = qizi.x;
        ty = qizi.y;
         while(shuju[(tx+1)+'-'+(ty+1)]){
        	zuoxie++;tx++;ty++;
        }

     }
        var dep = 1;
        var jilu = {
        	// '1-1':{x:1,y:1,color:1,dep:1},
        }
        var shuju = {};

     $('#canvas').on('click',function(e){ 
     	
     	var x = Math.floor(e.offsetX/blocks);
     	var y = Math.floor(e.offsetY/blocks);
     	if(jilu[x+'-'+y]){
     		return;
     	}
     	if(kaiguan){
     		$('#black_play').get(0).play();
     		qizi ={x:x,y:y,color:'1',dep:dep++};

     	}else{
     		$('#white_play').get(0).play();
           qizi ={x:x,y:y,color:'0',dep:dep++};
     	}
     	drop(qizi,r);
     	  jilu[x+'-'+y] =qizi; 

         
         panduan(qizi);
         if(heng==5||shu==5||youxie==5||zuoxie==5){
         	$('.box2').css('z-index','10000');
         	$('#save').css('display','block');
            $('#reset').css('display','block');

         	// 生成棋谱
         	
             for(i in jilu){
             	console.log(jilu[i].x+0.5, jilu[i].y+0.5)
             	ctx.save();
             	ctx.beginPath();
             	ctx.font='20px consolas';
             	ctx.textAlign="center";
             	ctx.textBaseline="middle";
             	if(jilu[i].color==='1'){
             		ctx.fillStyle="white";
             	}
             	ctx.fillText(jilu[i].dep,jilu[i].x*blocks+20.5, jilu[i].y*blocks+20.5);
             	ctx.fill();
             	ctx.closePath();
             	ctx.restore();
             }
         	
         	if(qizi.color=='1'){
         		$('#blackwin').css('display','block')
         		
         	}else{
         		$('#whitewin').css('display','block')
         		
         	}
         }
      
     $('#save').on('click',function(){
     	$(this).text('保存成功');
     	var image = $('#canvas').get(0).toDataURL('image/png',1);
     	$(this).attr('href',image);
     	$(this).attr('dowload','qipu.png');
     })
     })

     
       
    $('#reset').on('click',function(){
        
        $('.box2').css('z-index','-12000');
        $('#save').css('display','none');
        $('#reset').css('display','none');
        $('#blackwin').css('display','none');
            $('#whitewin').css('display','none');
            jilu = {};
            ctx.clearRect(0,0,canvasS,canvasS);
        drow();
    })
   

    $('#hui').on('click',function(){
        var newjilu= {};
        $.each(jilu,function(k,v){
            console.log(v.dep!==qizi.dep);
            if(v.dep!==qizi.dep){

                newjilu[k] = v;

            }
         })
         jilu = newjilu;
         console.log(jilu)
         ctx.clearRect(0,0,canvasS,canvasS);
         drow();
         for(i in jilu){
            newqizi = jilu[i];
            console.log(newqizi);
            ctx.save();
        ctx.beginPath();
        if(newqizi.color=='1'){
            ctx.fillStyle='black';
        }else{
            ctx.fillStyle='#fff';
        }       
        ctx.translate(newqizi.x*blocks+20.5,newqizi.y*blocks+20.5);
        ctx.moveTo(0,0);
        ctx.arc(0,0,r,0,Math.PI/180*360);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
         }
    })



   
})