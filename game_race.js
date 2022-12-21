
function main() {
        Java.perform(function (){

            
        if(true)
        Java.use("android.app.Activity").onCreate .overload('android.os.Bundle').implementation = function (bundle){
                console.log(this.getClass().getName());
                var activityName = this.getClass().getName()
                console.log('')
                if ( activityName .indexOf('adunit') > 0){
                    this.onCreate(bundle)
                    this.finish()
                } else{
                    this.onCreate(bundle)
                }

            
        }
        


        var moduleName = "libil2cpp.so";

        
        Interceptor.attach(Module.findExportByName(null, "dlopen"), {
            onEnter: function(args) {
                this.lib = Memory.readUtf8String(args[0]);
                console.log("dlopen called with: " + this.lib);
            },
            onLeave: function(retval) {

                if (this.lib != null && this.lib.endsWith(moduleName)) {
                    console.log("ret: " + retval);
                    var baseAddr = Module.findBaseAddress(moduleName)
                    console.log("baseAddr1: " + baseAddr)


                    if(false)
                    {
                        Interceptor.attach(baseAddr.add(0x10E5190), {
                            onEnter: function(args) {
    
                                Memory.writeInt(ptr(this.context.x20).add(0x10),0xAAAAAAA)
                                console.log( Memory.readInt(ptr(this.context.x20).add(0x10)))
                                
    
                            }
                        })
    
                        
                        Interceptor.attach(baseAddr.add(0x10E4FD8), {
                            onEnter: function(args) {
                                console.log( Memory.readInt(ptr(this.context.x20).add(0x14)))
                                Memory.writeInt(ptr(this.context.x20).add(0x14),0xAAAAAAA)
                                console.log( Memory.readInt(ptr(this.context.x20).add(0x14)))
                                
    
                            }
                        })
                    }
         
          
          
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

                }
                return ret
            }
        })


    })
}
setImmediate( main );


// 样本 
// 链接：https://pan.baidu.com/s/1VHD74XH0rreF89FnFW0Ygg 
// 提取码：uwtl
// frida -U -f com.smokoko.race -l game_race.js












