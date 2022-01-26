
const fs = require("fs");

const path = require("path");

let types = {
    media: ["mp4", "mkv", "mp3","jpg"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
      "docx",
      "doc",
      "pdf",
      "xlsx",
      "xls",
      "odt",
      "ods",
      "odp",
      "odg",
      "odf",
      "txt",
      "ps",
      "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
  };


function organizefn(dirPath)
{
    if(dirPath==undefined)
    {
        console.log('please Enter valid path')
        return;
    }

    let doesExist=fs.existsSync(dirPath)
    let destPath;
     if(doesExist==true)
     {
        destPath=path.join(dirPath,'Organize_File')

     // below line check weather given destpath folder is same ka folder to nhi he esa
          if(fs.existsSync(destPath)==false)
          {
               fs.mkdirSync(destPath)
               console.log('Successfully')
          }
          else{
              console.log('Folder Already Exists')
          }
     }
        organizeHelper(dirPath,destPath)
}

function organizeHelper(src,dest)
{
    let childName=fs.readdirSync(src)
   // console.log('childName');
   for(let i=0;i<childName.length;i++)
   {
       let childAddress=path.join(src,childName[i])

       let isFile=fs.lstatSync(childAddress).isFile()

       if(isFile==true)
       {
           //console.log()
        //    console.log(childAddress)
        let FileCategory=getCategory(childName[i])
        // console.log(childName[i] + ' belongs to ' + FileCategory)
        sendfiles(childAddress,dest,FileCategory)
       }
   }

}

function getCategory(filename)
{
    // we extract extension name 
    let ext=path.extname(filename).slice(1);

     // console.log(ext)

     // to find category type arrays
    for(let key in types)
    {
        let ctypeArr=types[key]
        // console.log(ctypeArr)

        for(let i=0;i<ctypeArr.length;i++)
          {
              if(ext==ctypeArr[i])
              {
                  return key;
              }    
          } 
    }

    return 'others';
}

// 
function sendfiles(srcpath,dest,FileCategory)
{
    // variable create 
    let catpath=path.join(dest,FileCategory)

    if(fs.existsSync(catpath)==false)
    {
        fs.mkdirSync(catpath)
    }

    let filename=path.basename(srcpath)

    let destfilepath=path.join(catpath,filename)

    fs.copyFileSync(srcpath,destfilepath)

    fs.unlinkSync(srcpath)    
}

// console.log('File Organized Succesfully ')
module.exports = {
    organizeFnKey: organizefn,
  };

