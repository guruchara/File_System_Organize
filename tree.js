const fs=require("fs");

const path=require("path")

function treefn(dirPath)
{
    if(dirPath==undefined)
    {
        console.log('please Enter valid path')
        return;
    }
    else
    {
        let doesExist=fs.existsSync(dirPath)
        if(doesExist==true)
        {
            treehelper(dirPath,' ')
        }
    }        
}
function treehelper(targetPath,indent)
{
  let isFile=fs.lstatSync(targetPath).isFile()
  
  if(isFile==true)
  {
      let fileName=path.basename(targetPath)
      console.log(indent + "├──" + fileName)
  }
  else{
      let dirName=path.basename(targetPath)
          console.log(indent +"└──"+ dirName)

          let children=fs.readdirSync(targetPath)

           for(let i=0;i<children.length;i++)
           {
               let chilpath=path.join(targetPath,children[i])
               treehelper(chilpath,indent + "\t")
           }
        //   console.log(children)
  }
}
module.exports = {
    treeFnKey: treefn,
  };