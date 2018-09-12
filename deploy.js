const github = require('@octokit/rest');
const gh = new github();
const async = require('async');
let folder='/reviewSite';
module.exports=function(accessToken,user){
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
      console.log('reading directory and uploading');
    }
  ],(err,result)=>{
    console.log(result);
  })
};
