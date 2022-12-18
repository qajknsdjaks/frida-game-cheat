
function main() {
    Java.perform(function (){
    



    var moduleName = 'libMyGame.so'

    
    Interceptor.attach(Module.findExportByName(null, "dlopen"), {
        onEnter: function(args) {
            this.lib = Memory.readUtf8String(args[0]);
            console.log("dlopen called with: " + this.lib);
        },
        onLeave: function(retval) {

            if (this.lib.endsWith(moduleName)) {
                console.log("dlopen")
                var baseAddr = Module.findBaseAddress(moduleName)
                console.log(baseAddr)

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
                console.log("android_dlopen_ext")
                console.log(baseAddr)
                {

                    var mt24mgr = Module.findExportByName(moduleName, '_ZN4mt247GameMgrC2Ev')
                    var mt50mgr = Module.findExportByName(moduleName, '_ZN4mt507GameMgrC2Ev')
                    var refreshAddr = Module.findExportByName(moduleName, '_ZN4mt507UILayer17refreshHeroStatusEv')
                
                    var schedulerAddr = Module.findExportByName(moduleName, '_ZN7cocos2d9SchedulerC2Ev')
                    var refreshFunc= new NativeFunction(refreshAddr, "int", ["pointer"])
          
                    console.log(mt24mgr)
                    console.log(mt50mgr)
                    console.log(refreshAddr)
                    var schedulerInstance = null
                    // Interceptor.attach(schedulerAddr, {
                    //     onEnter: function (args) {
                    //       console.log('schedulerInstance')

                    //       console.log(ptr(args[0]))

                    //       schedulerInstance = ptr(args[0])
            
                    //     }
                    // })

                    var playerBaseMT24 = null
                    Interceptor.attach(mt24mgr, {
                        onEnter: function (args) {
                          console.log('mt24mgr')
                          console.log(ptr(args[0]))
                          playerBaseMT24 = ptr(args[0])
                        }
                    })
                    var playerBaseMT50 = null
                    Interceptor.attach(mt50mgr, {
                        onEnter: function (args) {
                       
                          console.log('mt50mgr')
                          playerBaseMT50 = ptr(args[0])
                          console.log(playerBaseMT50)
            
                        }
                    })


                    {
                        setInterval(function(){
                          
                            if(playerBaseMT50!=null && Memory.readInt( playerBaseMT50.add(0xc))< -200000){
                                console.log('mod',Memory.readPointer( playerBaseMT50.add(0xc)))
                                Memory.writeInt(playerBaseMT50.add(0x18),888888) 
                                Memory.writeInt(playerBaseMT50.add(0x18+4),888888)
                                Memory.writeInt(playerBaseMT50.add(0x18+8),888888)
                                Memory.writeInt(playerBaseMT50.add(0x18+12),888888)
                                refreshFunc(Memory.readPointer( playerBaseMT50.add(0xc)))

                                // Memory.writeInt(playerBaseMT50.add(0x28),888888) //v8a
                                // Memory.writeInt(playerBaseMT50.add(0x28+4),888888)
                                // Memory.writeInt(playerBaseMT50.add(0x28+8),888888)
                                // Memory.writeInt(playerBaseMT50.add(0x28+12),888888)
                                // refreshFunc(Memory.readPointer( playerBaseMT50.add(0x18)))

                             // Memory.writeFloat(ptr(schedulerInstance).add(6),5.0) 

                               playerBaseMT50 = null
                               playerBaseMT24 = null 
                            }
                     
                        }, 10000)
                        
                    }
                }
              
                {

                    var refreshAddr2 = Module.findExportByName(moduleName, '_ZN4mt247UILayer17refreshHeroStatusEv')

                    var refreshFunc2= new NativeFunction(refreshAddr2, "int", ["pointer"])

                    
                        setInterval(function(){

                            if(playerBaseMT24!=null && Memory.readInt( playerBaseMT24.add(0xc))< -200000 ){

                                console.log('mod mt24',Memory.readPointer( playerBaseMT24.add(0xc)))


                                Memory.writeInt(playerBaseMT24.add(0x18),888888) 
                                Memory.writeInt(playerBaseMT24.add(0x18+4),888888)
                                Memory.writeInt(playerBaseMT24.add(0x18+8),888888)
                                Memory.writeInt(playerBaseMT24.add(0x18+12),888888)
                                Memory.writeInt(playerBaseMT24.add(0x18+16),888888)
                                refreshFunc2(Memory.readPointer( playerBaseMT24.add(0xc)))
                                
                                // Memory.writeInt(playerBaseMT24.add(0x28),888888)
                                // Memory.writeInt(playerBaseMT24.add(0x28+4),888888)
                                // Memory.writeInt(playerBaseMT24.add(0x28+8),888888)
                                // Memory.writeInt(playerBaseMT24.add(0x28+12),888888)
                                // Memory.writeInt(playerBaseMT24.add(0x28+16),888888)
                                // refreshFunc(Memory.readPointer( playerBaseMT24.add(0x18)))

                                playerBaseMT50 = null
                                playerBaseMT24 = null 
                            }
                     
                        }, 10000)
                }
         

          

            }
            return ret
        }
    })


})
}
setImmediate( main );
//https://lachs.lanzoue.com/i4USG0iz9yif  样本
//魔塔 v8a 上面有各种奇怪问题 只制作了v7a（ googeplay 下载游戏包 ）
// frida -U -f com.mtclassic.yfsgame -l mtclassic.js











