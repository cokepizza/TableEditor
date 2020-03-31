# TableEditor

. Table editor that can be easily edited like Excel <https://hixxx.me/tableEditor>

----

## Table of contents

[● Technical Stack](#Technial-Stack)  
[● Service Overview](#Service-Overview)  
[● Service Contents](#Service-Contents)  

## Technical Stack

* Frontend
  * Single Page Application (SPA)
  * React.js
  * Redux
    * Thunk

## Service Overview

* How this Widget works
  * How to update View
    * Render the dynamic UI in such a way that necessary renderings are processed at once and unnecessary renderings are not performed
    * Styled Component is not suitable for dynamic UI, so it is only applied to static UI
    * Cells can be changed through load and save processes
* Functions
  * Rows, Cols Add & Del
  * Cell multiSelect using Ctrl key & Drag
  * Cell merge & divide
  * Property setting
  * Scalable Table
  * Editable both header & body
  * Provide property helpbox
  * DataBinding setting
* ShortCut
  * Cell Merge: + Button
  * Cell Divide: - Button
  * Table Zoom: Ctrl + Mouse Scroll
* Restriction
  * Merge cells only works with rectangular shapes
  * Merge cells only works in the same area

## Service Contents

* Cell Merge & Divide

![Honeycam 2020-03-31 19-04-33](https://user-images.githubusercontent.com/56418546/78014598-1f399980-7383-11ea-9c02-45b531f9d5b9.gif)

* Multi Select & Merge

![Honeycam 2020-03-31 19-12-23](https://user-images.githubusercontent.com/56418546/78014943-9838f100-7383-11ea-8071-1dee04db8bd4.gif)

* Add, Delete Cols & Rows

![Honeycam 2020-03-31 19-05-48](https://user-images.githubusercontent.com/56418546/78015076-cf0f0700-7383-11ea-9536-28a7fa179b40.gif)

* Tab(Inform, Properties, DataBinding)

![Honeycam 2020-03-31 19-06-55](https://user-images.githubusercontent.com/56418546/78015157-f7970100-7383-11ea-872a-c2caabea6bce.gif)

* Crop & Scale

![Honeycam 2020-03-31 19-08-25](https://user-images.githubusercontent.com/56418546/78015219-13020c00-7384-11ea-8052-99353499b2a9.gif)