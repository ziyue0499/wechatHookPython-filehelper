var ModuleAddress = Process.findModuleByName('wechatwin.dll');
var hookAddress = ModuleAddress.base.add('0x759654')

Interceptor.attach(hookAddress, {
    onEnter: function (args) {        
        var edi = this.context.esi;
        var edi1 = Memory.readPointer(edi);
        
      // 获得微信id
        var wxid = Memory.readUtf16String(Memory.readPointer(edi1.add('0x48')));
        if(wxid!="filehelper") {	
	        return;
	    }

        //发送文件助手获得的信息
        var content = Memory.readUtf16String(Memory.readPointer(edi1.add('0x70')));
        //console.log(content )     
	    
	      
       if(content!=null){
        // 把消息传到方法
	content='https://cn.bing.com/search?q='+content;
       	send(content);
       }	
    }
})
