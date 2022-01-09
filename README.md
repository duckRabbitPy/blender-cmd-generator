# Blender Command Line Render Tool: User Guide

<img src="./Media/blender.png" width="200" height="200" />

</br>

## What is command line rendering/batch rendering and what are the benefits?

- Command line rendering runs blender in the background with no user interface. The result is a faster, much more stable rendering process. If you have a large complex scene, rendering without a user interface can prevent crashes.
- If your computer is powerful enough, it will also allow you to work on other Blender projects whilst rendering in the background (more stable than opening multiple instances)
- You can also do ‘batch rendering’ you can queue up multiple renders to run sequentially. This is great if you want to render overnight or when away from your computer. You can read up about Blender command line rendering [here](https://docs.blender.org/manual/en/latest/advanced/command_line/render.html?fbclid=IwAR1H8WJmE3kzHT_m20aZahcAqlRY6va7A7Xn2bF8AXaqO9OfyKTshz9RCC8)

</br>

## What is Blender Command Line Render Tool?

- Blender Command Line Render Tool is a web based application to quickly and easily produce scripts that can be run on your computer’s command line (PowerShell). You have full visibility over the script generated.
- Instead of manually typing out these commands, which can be time consuming and prone to formatting errors, this simple interface automates the formatting of the script.
- Just follow the steps outlined on the page and copy and paste (Ctrl + V) the command into Windows Powershell (enter to run command).

</br>

1.  ### Input Target file

    - It is recommended that you move your blend file(s) you want to render to your desktop.
    - To find your blend file path, right click on the file, go to properties, navigate to the security tab and copy paste the object name. C:/ has been pre-populated (you can change if running off a different drive).

2.  ### Input Blender application download directory

    - Next you need to input your Blender application file path. You can do this by navigating to where your blender application is located and looking under properties as per step 1.

    This is an example of where I downloaded a copy of Blender 3.1 to my desktop C:\Users\duckrabbit\Desktop\Blender 3.1 alpha\blender-3.1.0-alpha+master.1d9bac7d921f-windows.amd64-release\blender.exe

    If you use Steam to open blender, the application may be stored within the steamapps directory e.g. \Program Files (x86)\Steam\steamapps\common\Blender\

    **Tip:** You can save the download directory as a preset as the blender application path will be the same for all renders.

3.  ### Select your render engine

    Choose between Eevee or Cycles – for Cycles you have the option to print stats – this will give additonal information in the command line e.g. the time taken to render (after the rendering has finished)

4.  ### Render Type

    - **Selective animation** - You can choose to render a frame range, select this option and enter the start and end frame you wish to render.
    - **Full animation** – this will render the full animation in its entirety.
    - **Single frame** – type in the frame number you want to be rendered.

5.  ### Generate new command

    This will generate the script for you to copy paste into the command line (Command + V to paste). Press enter to run.

    #### How do I access the command line?

    You can open the command line by searching for ‘Powershell’ in the windows search bar.

6.  ### Creating a batch rendering script

    Once you hit generate, simply change the variables above i.e. choose a new blender file or select different frame numbers etc. then hit ‘add to batch’ and this will generate a new script with the additional tasks added.

</br>

### Troubleshooting

- Make sure you set the output folder within the output properties tab of blender prior to rendering (where you want frames to be stored).
- Make sure you are happy with render settings in blender i.e. samples, resolution.
- Having an incorrect blender file path/directory is the most likely cause of issues. To simplify, you can re-download blender and save it to your desktop, or download a version from https://builder.blender.org/download/daily/archive/
- If the clear button doesn’t work, try refreshing your browser tab.
- The app defaults to C:/ If you have a different drive you want to run off (such as D:/ or Macbook then you can change this text.
- How do I know my render is running? – in the command line you should see text indicating the frame being rendered and how many samples have been processed. ‘Blender quit’ indicates the render is complete.
- Do not close the Powershell window until it has completed rendering, closing will stop the render. If you want to render again/another project, then close and open a new power shell window.
