NB-LuckyDraw
==============
* A desktop application for lucky drawing.
* Use web technology to realize it.

Dependency
--------------
* NW.js (Node-Webkit)
    * home: [http://nwjs.io/](http://nwjs.io/)
    * support OS: Win64, OSX64, Linux64, Win32, OSX32, Linux32

Test Environment
--------------
* NW.js v0.12.2 Win64
* Windows 7 x64

How to Use
--------------
### Candidate Photo
Copy candidate photoes image into folder named **`candidate`**

Photo file name format is: ${id}${name}.${ext}

* id: candidate employee ID, 6 digits
* name: candidate name
* ext: image Ext. name, such as jpg,png,gif

e.g.:

* 123456Blade Pan.png
* 567890Neo Dong.jpg

### Basic Operation
* Execute application
    * execute nw.js (in windows 7, file is "nw.exe")
    * drag file **`index.html`**, and drop it into main panel of nw.js
    * application will running by **`full-screen`** mode. you may press key **`Esc`** to leave full-screen mode.
* Operate application
    * lucky task
    ![](https://raw.githubusercontent.com/panfeng-pf/NB-LuckyDraw/master/snapshot/task.jpg)
    * lucky draw
    ![](https://raw.githubusercontent.com/panfeng-pf/NB-LuckyDraw/master/snapshot/draw-1.jpg)
    ![](https://raw.githubusercontent.com/panfeng-pf/NB-LuckyDraw/master/snapshot/draw-2.jpg)
    * lucky result
    ![](https://raw.githubusercontent.com/panfeng-pf/NB-LuckyDraw/master/snapshot/result.jpg)
