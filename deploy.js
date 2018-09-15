const github = require('@octokit/rest');
const gh = new github();
const fs = require('fs');
const async = require('async');
let folder='./reviewSite';
let sha;
function readTheDirectory(){
  return new Promise((resolve,reject)=>{
    fs.readdir(folder,(err,result)=>{
      if(err){
        reject(err);
        return;
      }
      resolve(result);
    });
  })
}

function getTheContent(ele){
  return new Promise((resolve,reject)=>{
    let content = fs.readFileSync(folder+'/'+ele);
    resolve(Buffer(content).toString('base64'));
  })
}

function deploy(accessToken,user){
  gh.authenticate({type: 'oauth', token: accessToken});
  let repoName='reviewSite';
  async.series([
    (cb)=>{
      console.log('deleting repo');
      gh.repos.delete({owner: user, repo: repoName},(err,res)=>{
        cb(null,'delete');
      })
    },
    (cb)=>{
      console.log('creating repo');
      gh.repos.create({name: repoName, auto_init: 1},(err,res)=>{
        if(err){
          cb(err);
        }
        cb(null,'created repo');
      });
    },
    (cb)=>{
      console.log('getting reference');
      gh.gitdata.getReference({owner: user, repo: repoName, ref:'heads/master'})
        .then(result => {
          sha=result.data.object.sha;
          cb(null,'done')
        })
        .catch(err=>console.log('Error',err));
    },
    (cb)=>{
      console.log('create reference');
      gh.gitdata.createReference({owner: user, repo: repoName, ref: 'refs/heads/gh-pages', sha})
        .then(result => {
          cb(null,'done');
        })
        .catch(err=>console.log(err));
    },
    (cb)=>{
      console.log('reading directory and uploading');
      readTheDirectory().then((result)=>{
        // result.forEach((ele)=>{
        //   getTheContent(ele).then((content)=>{
        //       gh.repos.createFile({owner: user, repo: repoName, path: ele, message: 'commit by web app', content: content})
        //   }).then(result=>console.log(result))
        //     .catch((err)=>{
        //     console.log('here');
        //     cb(err);
        //   })
        // });
        // }
        let filecount=0;
        function readHelper(){
          if(filecount===result.length){
            return;
          }
          getTheContent(result[filecount]).then((content)=>{
            gh.repos.createFile({owner: user, repo: repoName, path: result[filecount], message: 'commit by web app', content: content,branch:'gh-pages'})
              .then(()=>{
                filecount++;
                readHelper();
              }).catch(err=>console.log(err));
          })
        }
        readHelper();
        cb(null,'almost done');
      }).catch((err)=>{
        console.log(err);
        cb(err);
      });
    }
  ],(err,result)=>{
    console.log(result);
  })
};

module.exports={
  deploy:deploy
};
