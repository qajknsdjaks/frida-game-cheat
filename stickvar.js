
function main() {

    Java.perform(function (){
    

        if(true)
        Java.use("android.app.Activity").onCreate .overload('android.os.Bundle').implementation = function (bundle){

            console.log(this.getClass().getName());
            var activityName = this.getClass().getName()
            if ( activityName .indexOf('aligames.shootAndroid')>0 || activityName .indexOf('gundam.sdk')>0){
                this.onCreate(bundle)
            }else{
                this.onCreate(bundle)
                this.finish()

            }
        }

    var moduleName = "libil2cpp.so";
    var setTimeScale = null
 
    
    Interceptor.attach(Module.findExportByName(null, "dlopen"), {
        onEnter: function(args) {
            this.lib = Memory.readUtf8String(args[0]);
            console.log("dlopen called with: " + this.lib);
        },
        onLeave: function(retval) {

            if (this.lib.endsWith('libunity.so')) {
                var baseAddr = Module.findBaseAddress('libunity.so');
                //0xF2D6C jiasu
                setTimeScale = new NativeFunction(baseAddr.add(0xF2D6C), "pointer", ["float"])
                console.log('setTimeScale')
                console.log(setTimeScale)

              //  getTimeScale = new NativeFunction(baseAddr.add(0xF2D58), "pointer", ["float"])
                console.log('getTimeScale')
             //   console.log(getTimeScale)

                
                Interceptor.attach(baseAddr.add(0xF2D58), {
                    onEnter: function (args) {
                    }, 
                    
                    onLeave: function (retval) {
                       // retval.replace(jstring)
                       if(this.context.s0 > 1)
                       {
                        this.context.s0 = 1
                       }
                        // console.log('called from:\n' +
                        // Thread.backtrace(this.context, Backtracer.ACCURATE)
                        // .map(DebugSymbol.fromAddress).join('\n') + '\n')
                        return retval
                    }
                })
     

            }

            if (this.lib.endsWith(moduleName)) {
                console.log("ret: " + retval);
                var baseAddr = Module.findBaseAddress(moduleName)
                console.log("baseAddr: " + baseAddr)

                var count = 0
                var baseStatueAddr1 = null
                var baseStatueAddr2 = null
                Interceptor.attach(baseAddr.add(0x808950), {
                    onEnter: function(args) {

                        console.log(((ptr(args[0]))))
                        if(count % 2 == 0){
                            baseStatueAddr1 = ptr(args[0])
                        }else{
                            baseStatueAddr2 = ptr(args[0])
                        }
                        count ++ 
                    }
                })

          
            //   if(false)
                {

                      //0x7C8E50   无限指挥点
                var addr = baseAddr.add(0x7C8E50)
                Memory.patchCode(addr, Process.pageSize , function (code) {
                    var codeWriter = new Arm64Writer(code, { pc: addr });
                    //data.writeS64();
                    codeWriter.putInstruction(0x1f2003d5);
                    //cw.putBrReg()
                    //cw.putRet();
                    codeWriter.flush();
                });

                var addr = baseAddr.add(0x7B674C)
                Memory.patchCode(addr, Process.pageSize , function (code) {
                    var codeWriter = new Arm64Writer(code, { pc: addr });
                    //data.writeS64();
                    codeWriter.putInstruction(0x1f2003d5);
                    //cw.putBrReg()
                    //cw.putRet();
                    codeWriter.flush();
                });
                //85CEA4
                var addr = baseAddr.add(0x85CEA4)
                Memory.patchCode(addr, Process.pageSize , function (code) {
                    console.log('----->'+addr)
                    var codeWriter = new Arm64Writer(code, { pc: addr })
                    codeWriter.putInstruction(0x2020211E);
                   // codeWriter.putInstruction(0x1E212020);
                    codeWriter.flush();
                    console.log(hexdump(addr))
                })

            
               
                Interceptor.attach(baseAddr.add(0x80D35C), {
                    onEnter: function(args) {

                        Memory.writeFloat(baseStatueAddr1.add(0xd0),1000000)//锁血
                        //Memory.writeFloat(baseStatueAddr2.add(0xd0),100)//秒杀

                        //无限人口
                        //[[libil2cpp.so.1+1AED730]+b8]+4


                        var populationLimitAddr = Memory.readPointer(Memory.readPointer(ptr(baseAddr).add(0x1AED730)).add(0xb8)).add(4)
                        //console.log(Memory.readInt(populationLimitAddr))
                        Memory.writeInt(populationLimitAddr,999)
                      
                         //写入金币
                        console.log(ptr(args[1]).add(0x60))
                        console.log(Memory.readInt(ptr(args[1]).add(0x60)))
                        Memory.writeInt(ptr(args[1]).add(0x60),999999)
                    }
                })

                //加速
                {
                    setInterval(function(){
                       setTimeScale(5.0)
                    }, 10000)
                    
                }
      
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
                console.log("baseAddr")
                console.log(baseAddr)

            }
            return ret
        }
    })


})
}
setImmediate( main );


// frida -U -f com.yrtgame.stickvar.aligames -l stickvar.js

// 基于frida16 ，不然部分功能无法生效









