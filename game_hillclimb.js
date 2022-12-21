
function main() {
        Java.perform(function (){
        


        var moduleName = "libgame.so";

        
        Interceptor.attach(Module.findExportByName(null, "dlopen"), {
            onEnter: function(args) {
                this.lib = Memory.readUtf8String(args[0]);
                console.log("dlopen called with: " + this.lib);
            },
            onLeave: function(retval) {

                if (this.lib.endsWith(moduleName)) {
                    console.log("ret: " + retval);
                    var baseAddr = Module.findBaseAddress(moduleName)
                    console.log("baseAddr1: " + baseAddr)

       

          
          
                    }

 
            }
        });

        var fileName
        var dlopen_ext = Module.findExportByName(null, 'android_dlopen_ext')
        Interceptor.attach(dlopen_ext, {
            onEnter: function (args) {

                fileName = ptr(args[0]).readCString()
                console.log(fileName)

            }, onLeave: function (ret) {
                if (fileName.endsWith(moduleName)) {

                    var baseAddr = Module.findBaseAddress(moduleName);
                    console.log("baseAddr2")
                    console.log(baseAddr)

                    {
                        setInterval(function(){
                           
                           // setTimeScale(5.0)
                           console.log('11111111')
                           var monoy = (Memory.readInt(ptr(baseAddr).add(0x684C0C)))
                           Memory.writeInt(ptr(baseAddr).add(0x684C0C),0xAAAAAAA,)
                           console.log('monoy',monoy)
                           var gems = (Memory.readInt(ptr(baseAddr).add(0x684CAC)))
                           Memory.writeInt(ptr(baseAddr).add(0x684CAC),0xAAAAAAA)
                           console.log('gems',gems)
                        }, 10000)
                        
                    }

                }
                return ret
            }
        })


    })
}
setImmediate( main );

// 样本
// 链接：https://pan.baidu.com/s/1panCn4kvsUffC7Tn10sFmw 
// 提取码：kdxy

// frida -U -f com.smokoko.race -l game_hillclimb.js











