NB-LuckyDraw
==============
* A desktop application for lucky drawing.
* Use web technology to realize it.

Dependency
--------------
* NW.js (Node-Webkit); [Home](http://nwjs.io/ "go to nwjs home page")

Test Environment
--------------
* NW.js v0.12.2
* Windows 7

How to Use
--------------
### Candidate Photo
Copy candidate photoes image into folder named "candidate"

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
    * drag file "index.html", and drop it into main panel of nw.js
* Operate application
    * lucky task
    ![](https://raw.githubusercontent.com/panfeng-pf/NB-LuckyDraw/master/snapshot/task.jpg)
    * lucky draw
    ![](https://raw.githubusercontent.com/panfeng-pf/NB-LuckyDraw/master/snapshot/draw-1.jpg)
    ![](https://raw.githubusercontent.com/panfeng-pf/NB-LuckyDraw/master/snapshot/draw-2.jpg)
    * lucky result
    ![](https://raw.githubusercontent.com/panfeng-pf/NB-LuckyDraw/master/snapshot/result.jpg)
